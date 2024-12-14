import { useAuthStore } from "./auth.store";
import { useUserStore } from "./user.store";
import { usePersonalCalendarStore } from "./personalCalenderStore.store.Js";

export const getPersonalCalendarStore = () => usePersonalCalendarStore();
export const getAuthStore = () => useAuthStore();
export const getUserStore = () => useUserStore();
