import ax from "../../utils/axios";

export const getAdminDashboardInfo = async () => {
  return await ax.get("/admin/dashboardAdmin/infos");
};
