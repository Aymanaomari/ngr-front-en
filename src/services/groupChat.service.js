const socket = io("http://localhost:3000");
const userId = prompt("Enter your user ID:");

let groupName = "";

// Join a group
function joinGroup() {
  groupName = document.getElementById("groupName").value;
  socket.emit("join_group", { groupName, userId });
}

// Send a message to the group
function sendMessage() {
  const message = document.getElementById("message").value;
  socket.emit("group_message", { groupName, userId, message });
}

// Receive a group message
socket.on("receive_group_message", (data) => {
  const messages = document.getElementById("messages");
  const listItem = document.createElement("li");
  listItem.textContent = `${data.userId}: ${data.message} (at ${data.sentAt})`;
  messages.appendChild(listItem);
});

// Notify when a user joins
socket.on("user_joined", (data) => {
  const messages = document.getElementById("messages");
  const listItem = document.createElement("li");
  listItem.textContent = data.message;
  messages.appendChild(listItem);
});
