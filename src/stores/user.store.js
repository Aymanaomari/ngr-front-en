import { defineStore } from "pinia";
import User from "../model/user.js";

export const useUserStore = defineStore({
  id: "users",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: new User(),
  }),

  actions: {
    async setMe(user) {
      const me = new User();
      me.first_name = user.first_name;
      me.last_name = user.last_name;
      me.email = user.email;
      me.image = user.image;
      me.username = user.username;
      me.email = user.email;
      me.roles = user.roles;
      this.user = me;
    },
  },
});
