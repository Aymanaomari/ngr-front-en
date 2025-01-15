<!-- src/views/calendarView.vue -->
<template>
  <div class="calendar-container">
    <div class="calendar__header-container">
      <p class="text-lg font-medium mr-5">Calendar</p>
      <p class="text-base font-normal mt-2 text-gray-600">
        Stay organized and track your personalized Calendar
      </p>
    </div>
    <div class="calendar__content-container">
      <div class="h-14 w-full flex flex-row-reverse">
        <button
          class="btn btn-elevated-primary w-32 m-2"
          @click="ShowNewModal = true"
        >
          <Edit2Icon class="w-4 mr-2"></Edit2Icon> New
        </button>
        <button class="btn m-2 bg-white relative" @click="togglePopup">
          <MoreHorizontalIcon class="w-4"></MoreHorizontalIcon>
          <!-- Popup Menu -->
          <div
            v-show="showPopup"
            class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10"
          >
            <button
              class="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              @click="editTask"
            >
              Edit Task
            </button>
            <button
              class="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              @click="deleteTask"
            >
              Delete Task
            </button>
          </div>
        </button>
      </div>
      <div class="calendar is-light-mode dark:is-dark-mode">
        <calendar heightValue="80vh" ref="calendar" />
        <!--<CalendarComponent />-->
      </div>
    </div>

    <!-- Modal pour ajouter une nouvelle tâche -->
    <Modal size="modal-lg" :show="ShowNewModal" @hidden="ShowNewModal = false">
      <ModalHeader>
        <h2 class="font-medium text-base mr-auto">Add Task</h2>
      </ModalHeader>
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12">
          <label for="modal-form-1" class="form-label">Task Name</label>
          <input
            id="modal-form-1"
            type="text"
            class="form-control"
            v-model="newTask.title"
          />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label for="modal-form-2" class="form-label">From</label>
          <Litepicker
            v-model="startDate"
            :options="{
              autoApply: false,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true,
              },
            }"
            class="form-control block mx-auto"
          />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label for="modal-form-3" class="form-label">At</label>
          <input
            id="modal-form-3"
            type="time"
            class="form-control"
            v-model="startTime"
          />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label class="form-label">To</label>
          <Litepicker
            v-model="endDate"
            :options="{
              autoApply: false,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true,
              },
            }"
            class="form-control block mx-auto"
          />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <label class="form-label">At</label>
          <input
            id="modal-form-5"
            type="time"
            class="form-control"
            v-model="endTime"
          />
        </div>
        <div class="col-span-12">
          <label for="modal-form-6" class="form-label">Color</label>
          <select id="modal-form-6" class="form-select" v-model="newTask.color">
            <option value="blue">blue</option>
            <option value="yellow">yellow</option>
            <option value="green">green</option>
            <option value="red">red</option>
          </select>
        </div>
        <div class="col-span-12">
          <label for="" class="form-label">Description</label>
          <textarea
            class="form-control"
            v-model="newTask.description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          @click="ShowNewModal = false"
          class="btn btn-outline-secondary w-20 mr-1"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-primary w-20" @click="saveTask">
          Save
        </button>
      </ModalFooter>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePersonalCalendarStore } from "../../stores/personalCalenderStore";
import { transformDate } from "@/utils/date";

const showPopup = ref(false);
const selectedTask = ref(null); // Holds the currently selected task for edit/delete

const store = usePersonalCalendarStore();

const ShowNewModal = ref(false);
const newTask = ref({
  title: null,
  with: null,
  time: { start: null, end: null },
  color: null,
  isEditable: true,
  id: null,
  description: null,
});
const startDate = ref("");
const startTime = ref("");
const endDate = ref("");
const endTime = ref("");

const saveTask = async () => {
  const task = {
    title: newTask.value.title,
    time: {
      start: transformDate(startDate.value) + " " + startTime.value,
      end: transformDate(endDate.value) + " " + endTime.value,
    },
    color: newTask.value.color,
    isEditable: true,
    id: null,
    description: newTask.value.description,
  };

  console.log(task);

  await store.addTask(task); // Ajoute la tâche via le store
  ShowNewModal.value = false; // Ferme le modal
};

// New code for popup functionality
const togglePopup = () => {
  showPopup.value = !showPopup.value; // Toggle popup visibility
};

const editTask = () => {
  ShowNewModal.value = true; // Open the modal for editing
  showPopup.value = true; // Close the popup
};

const deleteTask = async () => {
  ShowNewModal.value = true;
  showPopup.value = true;
  // await store.deleteTask(selectedTask.value.id); // Delete the task via the store
};
</script>

<style lang="css">
@tailwind base;
@tailwind variants;
@tailwind components;

.calendar-container {
  @apply flex flex-col py-8;
}
.calendar__header-container {
  @apply flex w-full flex-col mb-4;
}
.calendar__content-container {
  @apply flex gap-3 overflow-hidden flex-col;
  height: max-content;
}
.calendar {
  @apply col-span-12 h-3/5;
}
.popup {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 0.5rem;
  width: 12rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
