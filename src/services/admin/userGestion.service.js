import { useFakeUsersStore } from "../../stores/fakeUser";

export const changeUserDetails = (userOnEdit) => {
  useFakeUsersStore.updateUserDetail(userOnEdit);
};
