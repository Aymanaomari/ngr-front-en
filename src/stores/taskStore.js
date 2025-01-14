import { reactive } from "vue";
import Task from "../model/task";

const state = reactive({
  tasks: [], // Tableau des tâches
});

export const tasksStore = {
  getTasks() {
    return state.tasks;
  },
  addTask(taskData) {
    const newTask = new Task({
      id: state.tasks.length + 1, // Génération d'un ID unique
      ...taskData,
    });
    state.tasks.push(newTask);
  },
  updateTask(id, updatedData) {
    const taskIndex = state.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      const existingTask = state.tasks[taskIndex];
      state.tasks[taskIndex] = new Task({ ...existingTask, ...updatedData });
    }
  },
  deleteTask(id) {
    state.tasks = state.tasks.filter((task) => task.id !== id);
  },
  getCalendarEvents() {
    return state.tasks.map((task) => task.toCalendarEvent());
  },
};

export default tasksStore;
