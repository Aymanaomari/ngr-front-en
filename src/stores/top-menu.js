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
          title: "Project Management",
        },
        {
          icon: "DatabaseIcon",
          pageName: "propositionManagement",
          title: "Proposition Management",
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
          icon: "UsersIcon",
          pageName: "myGroups",
          title: "My Groups",
        },
        {
          icon: "HomeIcon",
          pageName: "personalCalendar",
          title: "Calendar",
        },
      ];

      // Priority logic: Admin role takes precedence over User role
      if (userRoles.includes(Roles.ADMIN)) {
        this.menu = adminMenu;
      } else if (userRoles.includes(Roles.REGISTRED_USER)) {
        this.menu = userMenu;
      } else {
        this.menu = []; // Default to empty menu if no roles match
      }

      console.log("Generated Menu:", this.menu);
    },
  },
});
