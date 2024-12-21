// Subgroup model class
class SubGroup {
  constructor({ name, members = [], tasks = [] }) {
    this.name = name;
    this.members = members; // Array of User objects
    this.tasks = tasks; // Array of Task objects
  }
}

export default SubGroup;
