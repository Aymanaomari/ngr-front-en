import ax from "../../utils/axios";

export const createProposition = async (porposition) => {
  const response = await ax.post("/registred-user/proposition", porposition);
  if (response.status === 400) {
    console.error("the proposition form not completed");
    return false;
  }
  console.log("the proposition has been created");
  return true;
};
