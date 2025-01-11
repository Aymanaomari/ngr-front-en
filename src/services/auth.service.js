import User from "../model/user.js";
import { getUserStore } from "../stores/index.js";
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
      user.username = `${user.first_name} ${user.last_name}`;
      user.id = response.data.user.id;
      user.rolesPerProjects = response.data.groups;
      user.dateOfBirthday = response.data.user.dob;
      user.profession = response.data.user.proffession;
      user.phoneNumber = response.data.user.phone;
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
      if (response.status == 401)
        throw new Error("Email or password incorrect");
    }
  } catch (error) {
    console.error("Login error:", error.message || error);
    return {
      success: false,
      message: "Login failed, Email or password incorrect",
      error,
    };
  }
};

export const isLogin = () => {
  return sessionStorage.getItem("token") !== null;
};

export const register = async (
  first_name,
  last_name,
  email,
  phone,
  password,
  password_confirmation,
  proffession
) => {
  // Vérification si les mots de passe sont identiques
  if (password !== password_confirmation) {
    return {
      error_message: "Passwords do not match",
    };
  }
  // Vérification si le prénom et le nom sont non nuls
  if (!first_name || !last_name) {
    return {
      error_message: "First name and last name are required",
    };
  }
  // Vérification de la validité de l'email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return {
      error_message: "Invalid email format",
    };
  }
  // Vérification de la complexité du mot de passe (minimum 8 caractères, incluant chiffres, lettres et caractères spéciaux)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      error_message:
        "Password must be at least 8 characters, include letters, numbers",
    };
  }
  // Envoi des données à l'API si toutes les validations sont passées
  try {
    const response = await ax.post(`/auth/register`, {
      user: {
        firstName: first_name,
        lastName: last_name,
        phone: phone,
        dob: "2003-03-21",
        proffession, // La date de naissance peut être dynamique si nécessaire
      },
      account: {
        email: email,
        password: password,
      },
    });
    // Retour de la réponse de l'API si l'inscription est réussie
    return response;
  } catch (error) {
    console.error("Registration error:", error.message || error);
    return {
      error_message:
        error.message || "Registration failed due to an unknown error",
    };
  }
};

export const logout = async () => {
  getUserStore().clearUser();
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
