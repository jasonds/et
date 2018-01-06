using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace et.bridge.Services
{
    public class BridgeService
    {
        private readonly IConfiguration _configuration;
        private readonly RequestDelegate _requestDelegate;

        ConcurrentDictionary<string, WebSocket> sockets = new ConcurrentDictionary<string, WebSocket>();

        public BridgeService(
            IConfiguration configuration,
            RequestDelegate requestDelegate)
        {
            if (configuration == null) throw new ArgumentNullException(nameof(configuration));
            if (requestDelegate == null) throw new ArgumentNullException(nameof(requestDelegate));

            this._configuration = configuration;
            this._requestDelegate = requestDelegate;
        }

        public async Task Invoke(HttpContext context)
        {
            // Handle non-WebSocket requests
            if (!context.WebSockets.IsWebSocketRequest)
            {
                await _requestDelegate.Invoke(context);
                return;
            }

            // Add the socket
            var token = context.RequestAborted;
            var socket = await context.WebSockets.AcceptWebSocketAsync();
            var guid = Guid.NewGuid().ToString();
            sockets.TryAdd(guid, socket);

            // Listen for messages and broadcast them to all open sockets
            while (true)
            {
                if (token.IsCancellationRequested)
                {
                    break;
                }

                // Get the message
                var message = await GetMessageAsync(socket, token);
                Console.WriteLine($"Received message - {message} at {DateTime.UtcNow}");

                if (string.IsNullOrEmpty(message))
                {
                    if (socket.State != WebSocketState.Open)
                    {
                        break;
                    }

                    continue;
                }

                // Broadcast to all open sockets
                foreach (var s in sockets.Where(p => p.Value.State == WebSocketState.Open))
                {
                    await SendMessageAsync(s.Value, message, token);
                }
            }

            // Remove the socket
            sockets.TryRemove(guid, out WebSocket redundantSocket);

            await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Session ended", token);
            socket.Dispose();
        }

        private async Task<string> GetMessageAsync(WebSocket socket, CancellationToken token)
        {
            WebSocketReceiveResult result;
            var message = new ArraySegment<byte>(new byte[4096]);
            string receivedMessage;

            do
            {
                token.ThrowIfCancellationRequested();

                result = await socket.ReceiveAsync(message, token);
                var messageBytes = message.Skip(message.Offset).Take(result.Count).ToArray();
                receivedMessage = Encoding.UTF8.GetString(messageBytes);

            } while (!result.EndOfMessage);

            if (result.MessageType != WebSocketMessageType.Text)
            {
                return null;
            }

            return receivedMessage;
        }

        private Task SendMessageAsync(WebSocket socket, string message, CancellationToken token)
        {
            var byteMessage = Encoding.UTF8.GetBytes(message);
            var segmnet = new ArraySegment<byte>(byteMessage);

            return socket.SendAsync(segmnet, WebSocketMessageType.Text, true, token);
        }
    }
}
