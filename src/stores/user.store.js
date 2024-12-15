import { defineStore } from "pinia";
import User from "../model/user.js";

export const useUserStore = defineStore({
  id: "users",
  state: () => {
    const userFromStorage = JSON.parse(sessionStorage.getItem("user"));

    if (userFromStorage) {
      const user = new User();
      user.first_name = userFromStorage.first_name;
      user.last_name = userFromStorage.last_name;
      user.email = userFromStorage.email;
      user.image = userFromStorage.image;
      user.username = userFromStorage.username;
      user.roles = userFromStorage.roles;
      user.rolesPergroups = userFromStorage.rolesPergroups;
      return { user };
    }

    return { user: new User() };
  },

  actions: {
    async setMe(user) {
      const me = new User();
      me.first_name = user.first_name;
      me.last_name = user.last_name;
      me.email = user.email;
      me.image = user.image;
      me.username = user.username;
      me.roles = user.roles;
      me.rolesPergroups = user.rolesPergroups;

      this.user = me;

      // Store the user data in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(me));
    },

    clearUser() {
      this.user = new User();
      sessionStorage.removeItem("user");
    },
  },
});
