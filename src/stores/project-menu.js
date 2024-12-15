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
      ];
      const userMenu = [
        {
          icon: "ServerIcon",
          pageName: "ProjectDepot",
          title: "Depot",
        },
      ];
      if (user.hasAnyRole([Roles.ADMIN])) {
        this.menu = adminMenu;
      } else {
        // Build the final menu based on roles
        this.menu = [
          ...(user.hasRoleInGroup(group, RolesPerGroup.GROUPADMIN)
            ? adminMenu
            : []),
          ...(user.hasRoleInGroup(group, RolesPerGroup.MEMBER) ? userMenu : []),
        ];
      }
    },
  },
});
