import { defineStore } from "pinia";
import router from "../router";
import { useUserStore } from "./user.store";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    token: localStorage.getItem("token"),
    exp: localStorage.getItem("exp"),
  }),
  actions: {
    async login(token, user) {
      const userStore = useUserStore();
      userStore.setMe(user);
      const expToken = Date.now() + 604800000;
      localStorage.setItem("token", token);
      localStorage.setItem("exp", expToken.toString());
      this.token = token;
      this.exp = expToken;
      router.replace("/");
    },
    async loginUser(user) {
      const userStore = useUserStore();
      userStore.setMe(user);
    },
    async refreshToken(token) {
      const expToken = Date.now() + 604800000;
      localStorage.setItem("token", token);
      localStorage.setItem("exp", expToken.toString());
      this.exp = expToken;
    },
    async clearToken(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("exp");
    },
  },
});
