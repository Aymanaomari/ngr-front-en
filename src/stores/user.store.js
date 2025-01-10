import { defineStore } from "pinia";
import User from "../model/user.js";
import ax from "../utils/axios.js";

export const useUserStore = defineStore({
  id: "users",
  state: () => ({
    user: new User(), // Placeholder for the user object
    isLoading: true, // Flag to track loading state
    error: null, // Error message (if any)
  }),

  actions: {
    async fetchUser() {
      try {
        const response = await ax.get("/registred-user/me"); // Adjust the endpoint to match your API
        const userData = response.data;

        const me = new User();
        me.id = userData.id;
        me.first_name = userData.first_name;
        me.last_name = userData.last_name;
        me.email = userData.email;
        me.image = userData.image;
        me.username = userData.username;
        me.roles = userData.roles;
        me.rolesPerProjects = userData.groups;

        this.user = me;
        this.isLoading = false; // Set loading to false after fetching
      } catch (error) {
        console.error("Failed to fetch user information:", error);
        this.error = error.message || "Failed to fetch user data";
        this.isLoading = false; // Stop loading on error
      }
    },
    async setMe(user) {
      const me = new User();
      me.id = user.id;
      me.first_name = user.first_name;
      me.last_name = user.last_name;
      me.email = user.email;
      me.image = user.image;
      me.username = user.username;
      me.roles = user.roles;
      me.rolesPerProjects = user.rolesPerProjects;

      this.user = me;

      // Store the user data in sessionStorage
    },
    async clearUser() {
      // Clear the user data from the store
      this.user = new User();
      // Clear the user data from the sessionStorage
      // Redirect the user to the login page
    },
  },
});
