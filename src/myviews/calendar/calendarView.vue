<template>
  <div class="calendar-container">
    <div class="calendar__header-container">
      <p class="text-lg font-medium mr-5">Calendar</p>
      <p class="text-base font-normal mt-2 text-gray-600">
        Stay organized and your track with your personlized Calendar
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
        <button class="btn m-2 bg-white">
          <MoreHorizontalIcon class="w-4"></MoreHorizontalIcon>
        </button>
      </div>
      <div class="calendar is-light-mode dark:is-dark-mode">
        <calendar :eventData="events" heightValue="80vh" ref="calendar" />
      </div>
    </div>

    <!-- BEGIN: Modal Content -->
    <Modal
      size="modal-lg"
      :show="ShowNewModal"
      @hidden="ShowNewModal = false"
      class
    >
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
        <button type="button" class="btn btn-primary w-20" @click="saveTask()">
          save
        </button>
      </ModalFooter>
    </Modal>
    <!-- END: Modal Content -->
  </div>
</template>

<script>
import { getPersonalCalendarStore } from "../../stores";
import { transformDate } from "../../utils/date";
export default {
  data() {
    return {
      ShowNewModal: false,
      newTask: {
        title: null,
        with: null,
        time: { start: null, end: null },
        color: null,
        isEditable: true,
        id: null,
        description: null,
      },
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    };
  },
  methods: {
    saveTask() {
      let title = this.newTask.title;
      let time = {
        start: transformDate(this.startDate) + " " + this.startTime,
        end: transformDate(this.endDate) + " " + this.endTime,
      };
      let color = this.newTask.color;
      let isEditable = true;
      let id = "";
      let description = this.newTask.description;
      let task = {
        title,
        with: null,
        time,
        color,
        isEditable,
        id,
        description,
      };
      getPersonalCalendarStore().addEvent(task);
    },
  },
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
  @apply flex gap-3  overflow-hidden flex-col;
  height: max-content;
}
.calendar {
  @apply col-span-12 h-3/5;
}
</style>
