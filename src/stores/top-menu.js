import { defineStore } from "pinia";
import { getUserStore } from ".";
import Roles from "../utils/roles";

export const useTopMenuStore = defineStore("topMenu", {
  state: () => ({
    menu: [],
  }),
  actions: {
    generateMenu() {
      const userStore = getUserStore();
      const userRoles = userStore.user.roles; // Assuming roles is an array of roles

      // Define sections accessible based on roles
      const adminMenu = [
        {
          icon: "HomeIcon",
          pageName: "dashboard1",
          title: "Dashboard",
        },
        {
          icon: "UsersIcon",
          pageName: "usersManagement",
          title: "Users Management",
        },
        {
          icon: "SettingsIcon",
          pageName: "projectManagement",
          title: "projectManagement",
        },
        {
          icon: "HomeIcon",
          pageName: "personalCalendar",
          title: "Calendar",
        },
      ];

      const userMenu = [
        {
          icon: "HomeIcon",
          pageName: "dashboard2",
          title: "Dashboard",
        },
        {
          icon: "HomeIcon",
          pageName: "personalCalendar",
          title: "Calendar",
        },
      ];

      // Build the final menu based on roles
      this.menu = [
        ...(userRoles.includes(Roles.ADMIN) ? adminMenu : []),
        ...(userRoles.includes(Roles.USER) ? userMenu : []),
      ];
    },
  },
});
