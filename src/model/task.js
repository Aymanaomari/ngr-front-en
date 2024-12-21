// Task model class
class Task {
  constructor({
    title,
    description = "",
    assignedMembers = [],
    status = "pending",
    createdDate = new Date(),
    dueDate = null,
  }) {
    this.title = title;
    this.description = description;
    this.assignedMembers = assignedMembers; // Array of User objects
    this.status = status; // e.g., pending, in-progress, completed
    this.createdDate = new Date(createdDate);
    this.dueDate = dueDate ? new Date(dueDate) : null;
  }
}

export default Task;
