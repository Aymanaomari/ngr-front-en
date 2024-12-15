<template>
  <Qalendar
    :events="events"
    :config="config"
    :style="{ height: heightValue }"
    class="bg-white dark:bg-[#1b253B] rounded-2xl"
    v-if="renderComponent"
  />
</template>

<script>
import { Qalendar } from "qalendar";
import { getPersonalCalendarStore } from "../../stores";

export default {
  components: {
    Qalendar,
  },

  data() {
    return {
      renderComponent: true,
      config: {
        week: {
          startsOn: "monday",
          nDays: 7,
          scrollToHour: 5,
        },
        month: {
          showTrailingAndLeadingDates: false,
        },
        locale: "en-US",
        style: {
          colorSchemes: {
            meetings: {
              color: "#fff",
              backgroundColor: "#ffffff",
            },
            sports: {
              color: "#fff",
              backgroundColor: "#ff4081",
            },
          },
        },
        isSilent: true,
        showCurrentTime: true,
      },
      calendarStore: getPersonalCalendarStore().events,
    };
  },

  computed: {
    events() {
      return this.calendarStore;
    },
  },

  watch: {
    events(newEvents, oldEvents) {
      console.log("Events changed, re-rendering...");
      this.forceRerender();
    },
  },

  props: {
    heightValue: String,
  },

  methods: {
    async forceRerender() {
      this.renderComponent = false;
      await this.$nextTick(); // Ensure the DOM updates before re-rendering
      this.renderComponent = true;
      console.log("Component re-rendered");
    },
  },
};
</script>

<style>
@import "qalendar/dist/style.css";
</style>
