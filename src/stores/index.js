import { useAuthStore } from "./auth.store";
import { useUserStore } from "./user.store";

export const getAuthStore = () => useAuthStore();
export const getUserStore = () => useUserStore();
