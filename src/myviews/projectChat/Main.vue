<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Chat</h2>
  </div>
  <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
    <!-- BEGIN: Chat Side Menu -->
    <TabGroup class="col-span-12 lg:col-span-4 2xl:col-span-3 flex flex-col">
      <div class="intro-y pr-1">
        <div class="box p-2">
          <TabList class="nav-pills">
            <Tab class="w-full py-2" tag="button">Discussion</Tab>
            <Tab class="w-full py-2" tag="button">Groups</Tab>
          </TabList>
        </div>
      </div>
      <TabPanels>
        <TabPanel>
          <div
            class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
          >
            <template
              v-for="(Member, key) in projectData.groupMembers"
              :key="key"
            >
              <div
                v-if="Member.id != user"
                class="intro-x cursor-pointer box relative flex items-center p-5 dark:hover:bg-indigo-800 transition-colors"
                :class="{ 'mt-5': key }"
                @click="goToPersonal(Member.id)"
              >
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    class="rounded-full"
                    src="../../assets/myImages/images.jpeg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <p class="font-medium">
                      {{ Member.first_name + " " + Member.last_name }}
                    </p>
                    <!-- <div class="text-xs text-slate-400 ml-auto">
                    {{ faker.times[0] }}
                  </div> -->
                  </div>
                  <div class="w-full truncate text-slate-500 mt-0.5">
                    {{ lastMessage(Member.id) }}
                  </div>
                </div>
                <div
                  class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
                >
                  4
                </div>
              </div>
            </template>
          </div>
        </TabPanel>
        <TabPanel class="">
          <div
            class="chat__user-list overflow-y-auto scrollbar-hidden pr-1 pt-1 h-full group-tab"
          >
            <div
              class="cursor-pointer box relative flex items-center p-5 mt-5"
              @click="goToGlobal()"
            >
              <div class="ml-2 overflow-hidden">
                <div class="flex items-center">
                  <a @click.prevent="goToGlobal()" class="font-medium"
                    >Global</a
                  >
                </div>
              </div>
            </div>
            <template
              v-for="(subgGroup, key) in projectData.subGroups"
              :key="key"
            >
              <div
                v-if="checkIfUserIsInSubGroupmethod(subgGroup.name)"
                @click="goToSubChat(subgGroup.id)"
                class="cursor-pointer box relative flex items-center p-5 mt-5"
              >
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a class="font-medium">{{ subgGroup.name }}</a>
                  </div>
                </div>
              </div>
            </template>
            <div class="add-button-container flex justify-end" v-if="isAdmin">
              <button class="btn btn-primary w-12 h-12 rounded-full">
                <PlusIcon class="h-8 w-8" />
              </button>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import router from "../../router";
import { getUserStore } from "../../stores";
import Roles from "../../utils/roles";
import { getfakeUsersProjects } from "../../services/fake/projectMembers.service";
import RolesPerGroup from "../../utils/groupRoles";

export default {
  data() {
    return {
      chatBox: false,
      projectData: {}, // Reactive state
      user: null,
    };
  },
  methods: {
    showChatBox() {
      this.chatBox = !this.chatBox; // Toggle chatBox state
    },
    checkIfUserIsInSubGroupmethod(subgroupname) {
      for (let subgroup of this.projectData.subGroups) {
        if (subgroup.name == subgroupname) {
          console.log("looping on the subgroup members");
          for (let member of subgroup.members) {
            console.log(member.id);
            if (member.id == this.user) {
              console.log(
                `the user with the id ${this.user} have acces to the subgroup ${subgroup.name} `
              );
              return true; // User is part of the subgroup
            }
          }
        }
      }
      console.log(
        `the user with the id ${this.user} haven't acces to the subgroup ${subgroupname}`
      );
      return false;
    },
    goToSubChat(groupname) {
      this.$router.push({ name: "subgroupChat", params: { id: groupname } });
    },
    goToGlobal() {
      this.$router.push({ name: "ProjectChat" });
    },
    lastMessage(id) {
      let lastMessages = null;
      lastMessages = this.projectData.personalMessages.find(
        (discussion) => discussion.discussionBetween.includes(id) // Check if the user's ID is in the discussionBetween array
      );
      // Check if lastMessages is found and messages exist
      if (lastMessages) {
        // Get the last message from the discussion's messages array
        return lastMessages.messages[lastMessages.messages.length - 1].content;
      } else {
        return "No messages"; // If no messages found
      }
    },
    goToPersonal(id) {
      this.$router.push({ name: "personalChat", params: { userId: id } });
    },
  },

  computed: {
    isAdmin() {
      return getUserStore().user.hasRoleInGroup(
        this.$route.params.name,
        RolesPerGroup.GROUPADMIN
      );
    },
  },
  mounted() {
    this.projectData = getfakeUsersProjects();
    this.user = getUserStore().user.id;
  },
};
</script>

<style>
.group-tab {
  anchor-name: --group-tab;
}
.add-button-container {
  position-anchor: --group-tab;
  position: absolute;
  bottom: anchor(bottom);
  width: 100%;
  height: 10%;
}
</style>
