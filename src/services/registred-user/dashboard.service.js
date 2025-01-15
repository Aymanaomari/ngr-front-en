import ax from "../../utils/axios";

export const getUserDshboardInfo = async () => {
  return await ax.get("/registred-user/dashboard/infos");
};
