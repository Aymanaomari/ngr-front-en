export default class Chatgroup {
  id = null;
  projectId = null;
  name = null;
  type = null;
  members = [];
  createdAt = null;
  messages = []; // Each message should have a unique `id`

  constructor() {}

  addmessage(content) {
    console.log(content);

    const data = JSON.parse(content.messageOutput.body);
    console.log(data);

    // Check if the message already exists by iterating from the last index
    let exists = false;
    for (let i = this.messages.length - 1; i >= 0; i--) {
      if (this.messages[i].id === data.id) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      // Add the message only if it doesn't already exist
      const message = {
        id: data.id, // Ensure the message includes a unique `id`
        content: data.content,
        senderFirstName: data.senderFirstName,
        senderLastName: data.senderLastName,
        senderId: data.senderId,
        timestamp: data.timestamp,
        type: "TEXT",
      };
      this.messages.push(message);
    } else {
      console.log(`Message with id ${data.id} already exists.`);
    }
  }
}
