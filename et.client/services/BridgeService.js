const signalR = require("@aspnet/signalr");
import * as ET from "../core";

export function getConnectionInfo() {
  let route = new ET.API.FunctionRoute("signalrinfo");

  return ET.API.get(route)
    .then(resp => resp.data);
}

let connection = null;
export function connect() {
    return getConnectionInfo()
      .then(info => { 
        console.log(info);
        const options = {
          accessTokenFactory: () => info.accessToken
        };

        connection = new signalR.HubConnectionBuilder()
          .withUrl(info.url, options)
          .configureLogging(signalR.LogLevel.Information)
          .build();

        connection.onclose(() => console.log('disconnected'));

        console.log('connecting...');
        connection.start()
          .then(() => console.log('connected!'))
          .catch(console.error);

      })
      .catch(console.error);
}

export function on(topic, cb) {
  if (connection) {
    connection.on(topic, cb);
  }
}

export function off(topic) {
  if (connection) {
    connection.off(topic);
  }
}

export function sendUpdate(payload) {
  let route = new ET.API.FunctionRoute("sendupdate");

  ET.API.post(route)
    .then(resp => resp.data);
}
