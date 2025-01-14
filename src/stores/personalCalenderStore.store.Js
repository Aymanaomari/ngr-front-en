// import { defineStore } from "pinia";

// export const usePersonalCalendarStore = defineStore("personalCalendar", {
//   state: () => ({
//     events: [
//       {
//         title: "Advanced algebra",
//         with: "Chandler Bing",
//         time: { start: "2024-01-12 12:05", end: "2024-01-12 13:35" },
//         color: "yellow",
//         isEditable: true,
//         id: "753944708f0f",
//         description:
//           "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
//       },
//     ],
//   }),
//   getters: {
//     formattedCalendarEvents(state) {
//       return state.events.map((event) => ({
//         id: event.id,
//         title: event.title,
//         description: event.description,
//         start: new Date(event.time.start).toISOString(),
//         end: new Date(event.time.end).toISOString(),
//         color: event.color || "blue",
//         editable: event.isEditable ?? true,
//       }));
//     },
//   },
  
//   actions: {
//     setEvents(events) {
//       this.events = events.map((event) => ({
//         ...event,
//         time: {
//           start: event.time?.start,
//           end: event.time?.end,
//         },
//       }));
//     },
//     addEvent(event) {
//       this.events.push({
//         ...event,
//         time: {
//           start: event.time?.start,
//           end: event.time?.end,
//         },
//       });
//     },
//   },
// });


// src/stores/personalCalendarStore.store.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CalendarService } from '@/services/registred-user/calendar.service.js';

export const usePersonalCalendarStore = defineStore('personalCalendar', () => {
  // Liste des tâches
  const tasks = ref([]);

  // Charge les tâches depuis l'API
  const loadTasks = async () => {
    try {
      console.log('Fetching tasks from API...');
      const tasksFromApi = await CalendarService.fetchTasks();
      console.log('Tasks fetched:', tasksFromApi);
      tasks.value = tasksFromApi;
      console.log('Tasks QQQQQQQQQQQQQQQQQ:', tasks.tache);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  // Ajoute une nouvelle tâche
  const addTask = async (task) => {
    await CalendarService.addTask(task);
    const existedTask = await CalendarService.fetchTasks();
    tasks.value = existedTask;
  };

  return {
    tasks,
    loadTasks,
    addTask,
  };
});