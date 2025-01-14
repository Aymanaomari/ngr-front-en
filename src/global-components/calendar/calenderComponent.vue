<script setup>
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { usePersonalCalendarStore } from '@/stores/personalCalenderStore.store.js';
import { watch, onMounted } from 'vue';
import { forEach } from 'lodash'
 
// Do not use a ref here, as the calendar instance is not reactive, and doing so might cause issues
// For updating events, use the events service plugin
const eventsServicePlugin = createEventsServicePlugin();
const eventModal = createEventModalPlugin();

const store = usePersonalCalendarStore();
var eventss = [];

const calendar = createCalendar({
  selectedDate:new Date().toISOString().split('T')[0],
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
    createViewMonthAgenda(),
  ],
  events: eventss,
  //plugins: [eventModal],
},
[eventModal,eventsServicePlugin]);


onMounted(async () => {
  try {
    // Load tasks from the store
    await store.loadTasks();
    const eventss = store.tasks.tache.map((task) => ({
      id: task.id,
      title: task.title,
      description : task.description,//
      start: task.start,
      end: task.end,
    }));

    // Update the calendar with the events
    console.log(eventsServicePlugin.set(eventss));
    console.log('Calendar updated with events.');
  } catch (error) {
    console.error('Error while populating events:', error);
  }
});

watch(
  () => store.tasks, // Reactive property to watch
  (newTasks) => {
    try {
      console.log('Tasks updated:', newTasks);

      // Map the new tasks to the required event format
      const eventss = newTasks.tache.map((task) => ({
        id: task.id,
        title: task.title,
        description : task.description,//
        start: task.start,
        end: task.end,
      }));
        forEach(eventss, function(value, key) {
          console.log(value);
        });
      // Update the calendar with the new events
      eventsServicePlugin.set(eventss);
      console.log('Calendar dynamically updated with new events.');
    } catch (error) {
      console.error('Error while updating events dynamically:', error);
    }
  },
  { deep: true } // Ensure the watcher observes nested changes
);


</script>
 
<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendar" />
  </div>
</template>