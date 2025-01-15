<template>
  <div class="grid grid-cols-12 gap-6 p-8 user-dashboard-container">
    <div class="col-span-12 2xl:col-span-7 flex flex-col gap-3">
      <div class="flex flex-col gap-2 border-b-2 pb-2 my-5">
        <p class="text-4xl font-medium leading-none capitalize">
          Hello, {{ User.first_name }}
        </p>
        <p class="text-xl text-gray-500">Welcome back to NGR</p>
      </div>
      <div class="h-[300px] grid grid-cols-12 gap-4 mb-5 border-b-2 pb-5">
        <div
          class="h-full col-span-4 bg-white border-2 border-gray-300 rounded-lg flex flex-col shadow-sm py-5 cards"
        >
          <div
            class="h-[50%] icon-container flex justify-center items-center p-3"
          >
            <span
              class="block h-[100%] aspect-square bg-gray-200 rounded-full flex justify-center items-center border-2 border-gray-300"
            >
              <UsersIcon class="h-[40%] w-[40%]" />
            </span>
          </div>
          <div
            class="text-2xl font-medium text-black capitalize text-center py-3"
          >
            Total Memberships
          </div>
          <div class="text-4xl font-medium text-success text-center">
            {{ dashboardInfo.projectsMemberOn }}
          </div>
        </div>
        <div
          class="h-full col-span-4 bg-white border-2 border-gray-300 rounded-lg flex flex-col shadow-sm py-5 cards"
        >
          <div
            class="h-[50%] icon-container flex justify-center items-center p-3"
          >
            <span
              class="block h-[100%] aspect-square bg-gray-200 rounded-full flex justify-center items-center border-2 border-gray-300"
            >
              <ThumbsUpIcon class="h-[40%] w-[40%]" />
            </span>
          </div>
          <div
            class="text-2xl font-medium text-black capitalize text-center py-3"
          >
            My groups
          </div>
          <div class="text-4xl font-medium text-success text-center">
            {{ dashboardInfo.projectsHeCreated }}
          </div>
        </div>
      </div>
      <div class="h-fit flex flex-col gap-4">
        <div class="flex items-end">
          <div class="text-2xl font-medium black">Current Tasks</div>
        </div>
      </div>
    </div>

    <!--personal card in the right side-->
    <div class="col-span-12 2xl:col-span-5 flex flex-col px-2">
      <div
        class="personal-card bg-white border-2 border-gray-300 shadow rounded-2xl h-[50%] flex items-center flex-col"
      >
        <div class="persona-card-header flex justify-end px-2 self-end">
          <Dropdown>
            <DropdownToggle class="btn border-none">
              <MoreHorizontalIcon />
            </DropdownToggle>
            <DropdownMenu class="w-40">
              <DropdownContent>
                <DropdownItem @click="visiteProfile()"
                  >Visite Profile</DropdownItem
                >
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="personal-photo h-[60%] flex justify-center items-end pb-5">
          <img
            src="../../assets/myImages/user.png"
            alt=""
            class="h-[80%] aspect-square rounded-full shadow-md border-8 p-2 border-gray-600"
          />
        </div>
        <div class="personal-info flex flex-col gap-4">
          <div class="text-4xl font-medium text-center capitalize text-black">
            {{ User.first_name + " " + User.last_name }}
          </div>
          <div class="text-2xl font-nomral text-center text-gray-400 userName">
            @{{ User.username }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ReportDonutChart from "@/components/report-donut-chart/Main.vue";
import ReportBarChart from "@/components/report-bar-chart/Main.vue";
import ReportMap from "@/components/report-map/Main.vue";
import { User } from "lucide-vue-next";
import { getUserStore } from "../../stores";
import router from "../../router";
import { getUserDshboardInfo } from "../../services/registred-user/dashboard.service";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

export default {
  components: {
    ReportDonutChart,
    ReportBarChart,
    ReportMap,
  },
  data() {
    return {
      User: getUserStore().user,
      importantNotesRef: null,
      dashboardInfo: {},
    };
  },
  methods: {
    bindImportantNotesRef(el) {
      this.importantNotesRef = el;
    },
    prevImportantNotes() {
      if (this.importantNotesRef) {
        this.importantNotesRef.tns.goTo("prev");
      }
    },
    nextImportantNotes() {
      if (this.importantNotesRef) {
        this.importantNotesRef.tns.goTo("next");
      }
    },
    visiteProfile() {
      this.$router.push({ path: "/profile" });
    },
  },

  mounted() {
    gsap.registerPlugin(TextPlugin);
    getUserDshboardInfo().then((response) => {
      if (response.status === 200) {
        this.dashboardInfo = response.data;
      }
    });
    gsap.fromTo(
      ".cards",
      { scaleX: 0, scaleY: 0, yPercent: 100 },
      { scaleX: 1, scaleY: 1, yPercent: 0 }
    );

    gsap.to(".userName", {
      text: "Welcome back",
      duration: 2,
      ease: "power1.in",
    });
  },
};
</script>

<style lang="css">
.user-dashboard-container {
  min-height: fit-content;
  height: clamp(800px, 100vh, 1400px);
}
</style>
