import "./stomp.js";
import "./sockjs.js";
import "./modernizr-3.3.1.min.js";

import { socketUrl } from "@/common/config";
import { getToken } from "@/common/utils";

let mapClient = {};

const DisSocket = clientKey => {
  let client = mapClient[clientKey];
  if (client) {
    client.disconnect("", getToken());
    client = null;
    delete mapClient[clientKey];
  }
};

const SubSocket = (subUrl, topic, point, commandId, callback) => {
  let clientKey = `${subUrl}${topic}`;
  if (mapClient[clientKey]) return;
  let stompClient = null;
  if (!Array.isArray(commandId)) commandId = [commandId];
  stompClient = Stomp.over(new SockJS(`${socketUrl}${subUrl}`));
  mapClient[clientKey] = stompClient;
  stompClient.connect({}, () => {
    commandId.forEach(item => {
      let destination = `${topic}/${point}`;
      if (item) {
        destination = `${destination}/${item}`;
      }
      stompClient.subscribe(destination, greeting => {
        let obj = JSON.parse(greeting.body);
        callback(obj);
      });
    });
  });
};

export { SubSocket, DisSocket };
