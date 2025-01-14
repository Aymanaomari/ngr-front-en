<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Chat</h2>
  </div>
  <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import router from "../../router";
import { getProjectStore, getUserStore } from "../../stores";
import Roles from "../../utils/roles";
import { getfakeUsersProjects } from "../../services/fake/projectMembers.service";
import RolesPerGroup from "../../utils/groupRoles";
import { getProject as getProjectService } from "../../services/project/project.service";

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
    fetch() {
      getProjectService(this.$route.params.name).then((response) => {
        console.log(response);
      });
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
    this.fetch();
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
