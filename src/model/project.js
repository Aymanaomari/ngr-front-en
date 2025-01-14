import Chatgroup from "./chatgroup";

class Project {
  id = null;
  longname = null;
  shortName = null;
  type = null;
  category = null;
  visibility = null;
  licenseName = null;
  description = null;
  createdAt = null;
  projectGroup = null;
  adminGroup = null;
  ressrouceProject = null;
  generalChatGroup = new Chatgroup();
  adminChatGroup = new Chatgroup();
  constructor() {}
}

export default Project;
