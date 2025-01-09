import User from "../model/user.js";
import { getAuthStore, getUserStore } from "../stores/index.js";
import Roles from "../utils/roles.js";
import ax from "../utils/axios";
import { useTopMenuStore } from "../stores/top-menu.js";
import { useSideMenuStore } from "../stores/side-menu.js";
import RolesPerGroup from "../utils/groupRoles.js";
import { useProjectMenuStore } from "../stores/project-menu.js";
import router from "../router/index.js";

export const login = async (email, password) => {
  try {
    const response = await ax.post("/auth/login", {
      email: email,
      password: password,
    });

    if (response.status === 202) {
      const token = response.headers["authorization"];
      console.log("Login successful:", response);

      sessionStorage.setItem("token", token);

      const user = new User();
      user.email = response.data.email;
      user.roles = response.data.role;
      user.first_name = response.data.user.firstName;
      user.last_name = response.data.user.lastName;
      user.username = user.first_name + " " + user.last_name;
      user.id = response.data.user.id;
      user.rolesPerProjects = response.data.groups;
      getUserStore().setMe(user);

      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        console.log("Redirecting to stored route:", redirectPath);
        router.push(redirectPath);
      } else {
        console.log("No stored route, redirecting to default route");
        router.push("/");
      }
    } else {
      console.error("Unexpected response status:", response.status);
    }
  } catch (error) {
    console.error("Login error:", error.message || error);
  }
};

export const isLogin = () => {
  return sessionStorage.getItem("token") !== null;
};

// export const me = async () => {
//   return await ax.get(`/me`);
// };

// export const onMountedData = async () => {
//   return await ax.get(`/onMountedData`);
// };

// export const resetPassword = async (email) => {
//   return await ax.get(`/auth/forgot_password/${email}`);
// };

// export const verifyEmail = async (token) => {
//   return await ax.get(`/auth/verify_email/${token}`);
// };

export const register = async (
  first_name,
  last_name,
  email,
  phone,
  password,
  password_confirmation
) => {
  if (password != password_confirmation) {
    return {
      error_message: "passwords not matched",
    };
  }
  return await ax.post(`/auth/register`, {
    user: {
      firstName: first_name,
      lastName: last_name,
      phone: phone,
      dob: "2003-03-21",
    },
    account: {
      email: email,
      password: password,
    },
  });
};

// export const updateProfile = async (first_name, last_name, phone) => {
//   return await ax.post(`/users/updateProfile`, {
//     first_name,
//     last_name,
//     phone,
//   });
// };

// export const changePassword = async (
//   old_password,
//   new_password,
//   new_password_confirmation
// ) => {
//   return await ax.post(`/users/changePassword`, {
//     old_password,
//     new_password,
//     new_password_confirmation,
//   });
// };

export const logout = async () => {
  // await getAxios()
  //   .get(`/auth/logout`)
  //   .finally(() => {
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("exp");
  //     getUserStore().$reset();
  //     getAuthStore().$reset();
  //     router.replace("/login");
  //   });
  getUserStore().clearUser();
  getAuthStore().clearToken();
  sessionStorage.removeItem("token");
  router.replace("/login");
};

export const autoRefreshToken = async () => {
  const userStore = getUserStore();
  const now = Date.now();
  const exp = parseInt(userStore.exp);
  if (exp - now <= 0) {
    await ax
      .post(`/auth/refresh`, {})
      .then((res) => {
        console.log(res);
        const authStore = getAuthStore();
        authStore.refreshToken(res.data.token);
      })
      .catch((err) => {});
  }
};
