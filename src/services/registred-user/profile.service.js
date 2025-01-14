import ax from "../../utils/axios";

import dayjs from "dayjs"; // A lightweight library for date manipulation

export const updateProfile = async (user) => {
  const id = user.id;

  // Format date if it exists
  const formattedDob = user.dateOfBirthday
    ? dayjs(user.dateOfBirthday).format("YYYY-MM-DD") // Format as "2025-01-11"
    : null;

  const body = {
    firstName: user.first_name || "",
    lastName: user.last_name || "",
    dob: formattedDob, // Ensure dob is in the correct format
    phone: user.phone || "",
    profession: user.profession || "",
  };

  return await ax.put(`/registred-user/profile/update/${id}`, body);
};
