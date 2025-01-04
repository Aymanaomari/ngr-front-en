// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

// class WebSocketClient {
//   constructor(endpoint = "http://localhost:6541/ws") {
//     this.endpoint = endpoint; // WebSocket endpoint
//     this.socket = null;
//     this.stompClient = null;
//   }

//   // Initialize and connect to the WebSocket
//   connect(onConnectedCallback) {
//     this.socket = new SockJS(this.endpoint);
//     this.stompClient = Stomp.over(this.socket);

//     this.stompClient.connect({}, () => {
//       console.log("Connected to WebSocket!");
//       if (onConnectedCallback) {
//         onConnectedCallback(this.stompClient); // Pass the client instance to the callback
//       }
//     });
//   }

//   // Subscribe to a topic
//   subscribe(topic, messageCallback) {
//     if (this.stompClient) {
//       this.stompClient.subscribe(topic, (message) => {
//         const parsedMessage = JSON.parse(message.body);
//         messageCallback(parsedMessage);
//       });
//     } else {
//       console.error("Cannot subscribe. WebSocket is not connected.");
//     }
//   }

//   // Send a message
//   sendMessage(destination, message) {
//     if (this.stompClient) {
//       this.stompClient.send(destination, {}, JSON.stringify(message));
//     } else {
//       console.error("Cannot send message. WebSocket is not connected.");
//     }
//   }
// }

// export default WebSocketClient;
