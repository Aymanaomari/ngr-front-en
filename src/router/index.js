import { createRouter, createWebHistory } from "vue-router";

import TopMenu from "../layouts/top-menu/Main.vue";
import DashboardOverview2 from "../views/dashboard-overview-2/Main.vue";
import Login from "../myviews/login/Main.vue";
import Register from "../myviews/register/Main.vue";
import SimpleMenu from "../layouts/simple-menu/Main.vue";
/*my views*/

import adminDashboard from "../myviews/adminDashboard/adminDashboard.vue";
import ProjectsManagement from "../myviews/projectManagement/projectsManagement.vue";
import usersManagemet from "../myviews/usermanagement/usersManagement.vue";
import profileView from "../myviews/profile/profileView.vue";
import personalInformation from "../myviews/profile/personalInformation.vue";
import calendarView from "../myviews/calendar/calendarView.vue";
import projectMenu from "../layouts/projectMenu/Main.vue";
import profjectFileManager from "../myviews/project-file-manager/Main.vue";
import projectChat from "../myviews/projectChat/Main.vue";
import globalChatContent from "../myviews/projectChat/globalChatContent/Main.vue";
import userDashboard from "../myviews/userDashboard/Main.vue";
import myGroups from "../myviews/myGroups/Main.vue";
import ErrorPage from "../myviews/error-page/Main.vue";
import ProjectUserManagement from "../myviews/projectUserManagement/Main.vue";
import propositionManagement from "../myviews/propositionManagment/Main.vue";
import ForgotPassword from "../myviews/forgotPassword/Main.vue";
/*services*/
import Roles from "../utils/roles";
import RolesPerGroup from "../utils/groupRoles";
import { isLogin } from "../services/auth.service";
import { getUserStore } from "../stores";
import { useTopMenuStore } from "../stores/top-menu";
import { useProjectMenuStore } from "../stores/project-menu";
import ax from "../utils/axios";
import User from "../model/user";

const routes = [
  {
    path: "/",
    component: TopMenu,
    children: [
      {
        path: "/Admin/dashboard",
        name: "dashboard1",
        component: adminDashboard,
        meta: {
          authorize: [Roles.ADMIN],
        },
      },
      {
        path: "/dashboard",
        name: "dashboard2",
        component: userDashboard,
        meta: {
          authorize: [Roles.REGISTRED_USER],
        },
      },
      {
        path: "/mygroups",
        name: "myGroups",
        component: myGroups,
        meta: {
          authorize: [Roles.REGISTRED_USER, Roles.ADMIN],
        },
      },

      {
        path: "/Admin/usersManagement",
        name: "usersManagement",
        component: usersManagemet,
        meta: {
          authorize: [Roles.ADMIN],
        },
      },
      {
        path: "/calendar",
        name: "personalCalendar",
        component: calendarView,
        meta: {
          authorize: [Roles.ADMIN, Roles.REGISTRED_USER],
        },
      },
      {
        path: "/Admin/projectsManagement",
        name: "projectManagement",
        component: ProjectsManagement,
        meta: {
          authorize: [Roles.ADMIN],
        },
      },

      {
        path: "/profile",
        name: "profile",
        component: profileView,
        meta: {
          authorize: [Roles.ADMIN, Roles.REGISTRED_USER],
        },
        children: [
          {
            path: "",
            name: "personalInformation",
            component: personalInformation,
          },
        ],
      },
      {
        path: "/project/:name",
        name: "SimpleMenu",
        component: projectMenu,
        children: [
          {
            path: "",
            meta: {
              meta: { authorize: [Roles.REGISTRED_USER, Roles.ADMIN] },
              groupAuthorize: [RolesPerGroup.ADMIN, RolesPerGroup.MEMBER],
            },
          },
          {
            path: "Depot",
            name: "ProjectDepot",
            component: profjectFileManager,
            meta: {
              meta: { authorize: [Roles.REGISTRED_USER, Roles.ADMIN] },
              groupAuthorize: [RolesPerGroup.ADMIN, RolesPerGroup.MEMBER],
            },
          },
          {
            path: "Chat",
            component: projectChat,
            meta: {
              meta: { authorize: [Roles.REGISTRED_USER, Roles.ADMIN] },
              groupAuthorize: [RolesPerGroup.ADMIN, RolesPerGroup.MEMBER],
            },
            children: [
              {
                path: "",
                name: "ProjectChat",
                component: globalChatContent,
              },
            ],
          },
          {
            path: "UsersManagement",
            name: "ProjectUsersManagement",
            component: ProjectUserManagement,
            meta: {
              meta: { authorize: [Roles.REGISTRED_USER, Roles.ADMIN] },
              groupAuthorize: [RolesPerGroup.ADMIN],
            },
          },
        ],
      },
      {
        path: "/Admin/proposition-management",
        name: "propositionManagement",
        component: propositionManagement,
        meta: { authorize: [Roles.ADMIN] },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "/Forgotpassword",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ["/login", "/register", "/Forgotpassword"];
  const authRequired = !publicPages.includes(to.path);
  const defaultPages = ["/"];
  const { authorize, groupAuthorize } = to.meta;

  const isAuthenticated = isLogin();
  const userStore = getUserStore();

  // Save the target route before redirecting to login
  if (authRequired && !isAuthenticated) {
    console.log("User is not logged in");
    localStorage.setItem("redirectAfterLogin", to.fullPath);
    return next({ path: "/login" });
  }

  // Fetch user data if authenticated and store is empty
  if (isAuthenticated && !userStore.user.id) {
    try {
      console.log("Fetching user data...");
      const response = await ax.get("/registred-user/me");
      const user = new User();
      user.email = response.data.email;
      user.roles = response.data.role;
      user.first_name = response.data.user.firstName;
      user.last_name = response.data.user.lastName;
      user.username = user.first_name + " " + user.last_name;
      user.id = response.data.user.id;
      user.rolesPerProjects = response.data.groups;
      user.dateOfBirthday = response.data.user.dob;
      user.phoneNumber = response.data.user.phone;
      user.profession = response.data.user.proffession;
      userStore.setMe(user);
      console.log("User data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      return next({ path: "/login" });
    }
  }

  // Redirect to stored route after login
  if (isAuthenticated && to.path === "/login") {
    const redirectPath = localStorage.getItem("redirectAfterLogin");
    localStorage.removeItem("redirectAfterLogin"); // Clear the stored route
    if (redirectPath) {
      console.log("Redirecting to previously intended route:", redirectPath);
      return next({ path: redirectPath });
    }
    return next({ path: "/dashboard" }); // Default route after login
  }

  // Handle default pages based on roles
  if (isAuthenticated && defaultPages.includes(to.path)) {
    const userRole = userStore.user.roles;

    if (userRole === Roles.ADMIN) {
      return next({ path: "/Admin/dashboard" });
    }
    return next({ path: "/dashboard" });
  }

  // Authorization checks
  if (authorize) {
    const userRoles = userStore.user.roles;
    if (!userRoles || !authorize.includes(userRoles)) {
      return next({ path: "/" });
    }
    useTopMenuStore().generateMenu();
  }

  if (groupAuthorize) {
    const groupName = to.params.name;
    const userHasAccess =
      userStore.user.hasAnyRole([Roles.ADMIN]) ||
      userStore.user.hasRoleInGroup(groupName, groupAuthorize);

    if (!userHasAccess) {
      console.log("User does not have access to this group:", groupName);
      return next({ path: "/" });
    }
    console.log("User has access to this group:", groupName);
    useProjectMenuStore().generateMenu(groupName);
    useTopMenuStore().menu = [];
  }

  // Allow navigation
  next();
});

router.afterEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/"];
  const authRequired = !publicPages.includes(to.path);
  const { authorize, groupAuthorize } = to.meta;

  if (!authRequired && !groupAuthorize) {
    useTopMenuStore().generateMenu();
  }
});

export default router;
