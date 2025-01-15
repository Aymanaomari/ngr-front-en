<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-12">
      <div class="grid grid-cols-12 gap-6">
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
          <div class="intro-y flex items-center h-10">
            <h2 class="text-lg font-medium truncate mr-5">General Report</h2>
            <a href="" class="ml-auto flex items-center text-primary">
              <RefreshCcwIcon class="w-4 h-4 mr-3" /> Reload Data
            </a>
          </div>
          <div class="grid grid-cols-12 gap-6 mt-5">
            <div
              class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y"
              @click="gotoUsersPage()"
            >
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <UserIcon class="report-box__icon text-blue-600" />
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">
                    {{ dashboardInfo.nbAccounts }}
                  </div>
                  <div class="text-base text-slate-500 mt-1">
                    Registred Users
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y"
              @click="gotoProjectsPage()"
            >
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <TrelloIcon class="report-box__icon text-green-500" />
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">
                    {{ dashboardInfo.nbProjects }}
                  </div>
                  <div class="text-base text-slate-500 mt-1">
                    Created Project
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y"
              @click="gotoPropositionPage()"
            >
              <div class="report-box zoom-in">
                <div class="box p-5">
                  <div class="flex">
                    <ActivityIcon class="report-box__icon text-" />
                  </div>
                  <div class="text-3xl font-medium leading-8 mt-6">
                    {{ dashboardInfo.nbPendingPeopositions }}
                  </div>
                  <div class="text-base text-slate-500 mt-1">
                    Pending Propositions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- END: General Report -->
      </div>
    </div>
  </div>
</template>

<script>
import { getAdminDashboardInfo } from "../../services/admin/dashboard.service";

export default {
  data() {
    return {
      dashboardInfo: "",
    };
  },
  methods: {
    prevImportantNotes() {
      const el = this.importantNotesRef;
      el.tns.goTo("prev");
    },
    nextImportantNotes() {
      const el = this.importantNotesRef;
      el.tns.goTo("next");
    },
    gotoUsersPage() {
      this.$router.push("/Admin/usersManagement");
    },
    gotoPropositionPage() {
      this.$router.push("/Admin/proposition-management");
    },
    gotoProjectsPage() {
      this.$router.push("/Admin/projectsManagement");
    },
  },
  provide() {
    return {
      "bind[importantNotesRef]": (el) => {
        this.importantNotesRef = el;
      },
    };
  },
  mounted() {
    getAdminDashboardInfo().then((response) => {
      this.dashboardInfo = response.data;
    });
  },
};
</script>
