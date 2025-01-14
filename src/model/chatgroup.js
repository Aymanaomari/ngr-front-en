export default class Chatgroup {
  id = null;
  projectId = null;
  name = null;
  type = null;
  members = [];
  createdAt = null;
  messages = [];
  constructor() {}
  addmessage(content) {
    console.log(content);

    const data = JSON.parse(content.messageOutput.body);
    console.log(data);
    const message = {
      content: "",
    };
  }
}
