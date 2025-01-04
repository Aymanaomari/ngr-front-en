import { useFakeUsersStore } from "../../stores/fakeUser";
import ax from "../../utils/axios";

export const changeUserDetails = (userOnEdit) => {
  useFakeUsersStore.updateUserDetail(userOnEdit);
};

export const PaginateUsers = async (page, size) => {
  return await ax.get(`/admin/users`, {
    params: { page, size },
  });
};
