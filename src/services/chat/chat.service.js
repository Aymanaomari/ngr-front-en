import { io } from "socket.io-client";

class Socket {
  constructor() {
    this.socket = io("https://localhost:6543/ws");
  }

  connect() {
    this.socket.on("connect", () => {
      console.log("Connected to WebSocket!");

      // Listen for group messages
      this.socket.on("groupMessage", (message) => {
        this.displayMessage("Group: " + message.content);
      });

      // Listen for private messages
      this.socket.on("privateMessage", (message) => {
        this.displayMessage("Private: " + message.content);
      });
    });
  }

  // Send a message
  sendMessage() {
    const messageContent = document.getElementById("messageInput").value;
    if (messageContent) {
      this.socket.emit("sendMessage", {
        content: messageContent,
        sender: { nom: "Doe" },
      });
      document.getElementById("messageInput").value = ""; // Clear input
    }
  }

  // Display messages
  displayMessage(message) {
    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
  }
}

export default Socket;
