const signalR = require("@aspnet/signalr");
import * as ET from "../core";

export function getConnectionInfo() {
  let route = new ET.API.FunctionRoute("signalrinfo");

  return ET.API.get(route)
    .then(resp => resp.data);
}

export function connect(funcForMessages) {
    getConnectionInfo().then(info => { 
      console.log(info);
      const options = {
        accessTokenFactory: () => info.accessToken
      };
      
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(info.url, options)
        .configureLogging(signalR.LogLevel.Information)
        .build();
        
      connection.on('newMessage', newMessage);
      connection.onclose(() => console.log('disconnected'));
      console.log('connecting...');
      connection.start()
        .then(() => console.log('connected!'))
        .catch(console.error);

    }).catch(console.error);
}

function newMessage(message) {
  alert(message);
}
