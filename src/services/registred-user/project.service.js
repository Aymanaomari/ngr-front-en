import ax from "../../utils/axios";

export const getMyProjects = async (ids) => {
  try {
    const response = await ax.post("/registred-user/projects/by-ids", ids);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
