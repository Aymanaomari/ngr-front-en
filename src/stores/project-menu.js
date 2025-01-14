import { defineStore } from "pinia";
import RolesPerGroup from "../utils/groupRoles";
import { getUserStore } from ".";
import Roles from "../utils/roles";

export const useProjectMenuStore = defineStore("ProjectMenu", {
  state: () => ({
    menu: [],
  }),
  actions: {
    generateMenu(group) {
      const userStore = getUserStore();
      const user = userStore.user;

      // Define sections accessible based on roles
      const adminMenu = [
        {
          icon: "ServerIcon",
          pageName: "ProjectDepot",
          title: "Depot",
        },
        {
          icon: "MessageSquareIcon",
          pageName: "ProjectChat",
          title: "chat",
        },
        {
          icon: "UsersIcon",
          pageName: "ProjectUsersManagement",
          title: "Members",
        },
      ];
      const userMenu = [
        {
          icon: "ServerIcon",
          pageName: "ProjectDepot",
          title: "Depot",
        },
        {
          icon: "MessageSquareIcon",
          pageName: "ProjectChat",
          title: "chat",
        },
      ];

      if (user.hasAnyRole([Roles.ADMIN])) {
        this.menu = adminMenu;
      } else {
        // Build the final menu based on roles
        this.menu = [
          ...(user.hasRoleInGroup(group, RolesPerGroup.ADMIN) ? adminMenu : []),
          ...(user.hasRoleInGroup(group, RolesPerGroup.MEMBER) ? userMenu : []),
        ];
      }

      // Log the generated menu in a readable format
      console.log("The generated menu:", JSON.stringify(this.menu, null, 2));
    },
  },
});
