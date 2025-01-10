import { useUserStore } from "./user.store";
import { usePersonalCalendarStore } from "./personalCalenderStore.store.Js";
import { userProjectStore } from "./project";

export const getPersonalCalendarStore = () => usePersonalCalendarStore();
export const getUserStore = () => useUserStore();
export const getProjectStore = () => userProjectStore();
