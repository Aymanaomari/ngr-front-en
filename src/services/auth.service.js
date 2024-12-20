import User from "../model/user.js";
import router from "../router";
import { getAuthStore, getUserStore } from "../stores/index.js";
import Roles from "../utils/roles.js";
import ax, { getAxios } from "../utils/axios";
import { useTopMenuStore } from "../stores/top-menu.js";
import { useSideMenuStore } from "../stores/side-menu.js";
import RolesPerGroup from "../utils/groupRoles.js";
import { useProjectMenuStore } from "../stores/project-menu.js";

export const login = async (email, password) => {
  // Simulate login by creating a user object
  const user = new User();
  user.first_name = "ayman";
  user.last_name = "aomari";
  user.email = email;
  user.password = password;
  user.roles = [Roles.ADMIN];
  user.rolesPergroups = [
    { group: "teamA", roles: [RolesPerGroup.ADMIN, RolesPerGroup.MEMBER] },
    { group: "teamB", roles: [RolesPerGroup.MEMBER] },
  ];
  user.image = "";
  user.username = "ayman123";

  // Store user information in sessionStorage
  sessionStorage.setItem("user", JSON.stringify(user));

  // Store other session-related data if needed
  getUserStore().setMe(user);
  useTopMenuStore().generateMenu();
  useSideMenuStore().generateMenu();
  useProjectMenuStore().generateMenu();

  // Redirect based on user role
  // Redirect based on user role
  if (user.roles.includes(Roles.ADMIN)) {
    router.push("/admin");
  } else {
    router.push("/");
  }
};

export const me = async () => {
  return await ax.get(`/me`);
};

export const onMountedData = async () => {
  return await ax.get(`/onMountedData`);
};

export const resetPassword = async (email) => {
  return await ax.get(`/auth/forgot_password/${email}`);
};

export const verifyEmail = async (token) => {
  return await ax.get(`/auth/verify_email/${token}`);
};

export const register = async (
  first_name,
  last_name,
  email,
  phone,
  password,
  password_confirmation
) => {
  return await ax.post(`/auth/register`, {
    first_name,
    last_name,
    email,
    phone,
    password,
    password_confirmation,
  });
};

export const updateProfile = async (first_name, last_name, phone) => {
  return await ax.post(`/users/updateProfile`, {
    first_name,
    last_name,
    phone,
  });
};

export const changePassword = async (
  old_password,
  new_password,
  new_password_confirmation
) => {
  return await ax.post(`/users/changePassword`, {
    old_password,
    new_password,
    new_password_confirmation,
  });
};

export const isLogin = () => {
  if (getUserStore().user.email == "aymanaomaripro@gmail.com") {
    return true;
  } else {
    return false;
  }
};

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
