import ax from "../../utils/axios";

export const paginateProjects = async (page, size) => {
  return ax.get(`/admin/projects`, {
    params: { page, size },
  });
};
