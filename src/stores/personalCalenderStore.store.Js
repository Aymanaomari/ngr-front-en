import { defineStore } from "pinia";

export const usePersonalCalendarStore = defineStore("personalCalendar", {
  state: () => ({
    events: [
      {
        title: "Advanced algebra",
        with: "Chandler Bing",
        time: { start: "2024-05-16 12:05", end: "2024-05-16 13:35" },
        color: "yellow",
        isEditable: true,
        id: "753944708f0f",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!",
      },
    ],
  }),
  getters: {
    getEvents(state) {
      return state.events;
    },
  },
  actions: {
    setEvents(events) {
      this.events = events;
    },
    addEvent(event) {
      this.events.push(event);
    },
  },
});
