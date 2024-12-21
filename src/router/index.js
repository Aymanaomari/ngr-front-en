import { createRouter, createWebHistory } from "vue-router";

import TopMenu from "../layouts/top-menu/Main.vue";
import DashboardOverview2 from "../views/dashboard-overview-2/Main.vue";
import Login from "../myviews/login/Main.vue";
import Register from "../views/register/Main.vue";
import ErrorPage from "../views/error-page/Main.vue";
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
import personalChatContent from "../myviews/projectChat/personalChatContent/Main.vue";
import globalChatContent from "../myviews/projectChat/globalChatContent/Main.vue";
import subGroupChatContent from "../myviews/projectChat/subGroupChatContent/Main.vue";
/*services*/
import Roles from "../utils/roles";
import RolesPerGroup from "../utils/groupRoles";
import { isLogin } from "../services/auth.service";
import { getUserStore } from "../stores";
import { useTopMenuStore } from "../stores/top-menu";
import { useProjectMenuStore } from "../stores/project-menu";

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
        component: DashboardOverview2,
        meta: {
          authorize: [Roles.REGISTREDUSER],
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
          authorize: [Roles.ADMIN, Roles.REGISTREDUSER],
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
          authorize: [Roles.ADMIN, Roles.REGISTREDUSER],
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
              meta: { authorize: [Roles.REGISTREDUSER, Roles.ADMIN] },
              groupAuthorize: [RolesPerGroup.GROUPADMIN, RolesPerGroup.MEMBER],
            },
          },
          {
            path: "Depot",
            name: "ProjectDepot",
            component: profjectFileManager,
            meta: {
              meta: { authorize: [Roles.REGISTREDUSER, Roles.ADMIN] },
              groupAuthorize: [RolesPerGroup.GROUPADMIN, RolesPerGroup.MEMBER],
            },
          },
          {
            path: "Chat",
            component: projectChat,
            meta: {
              meta: { authorize: [Roles.REGISTREDUSER, Roles.ADMIN] },
              groupAuthorize: [RolesPerGroup.GROUPADMIN, RolesPerGroup.MEMBER],
            },
            children: [
              {
                path: "",
                name: "ProjectChat",
                component: globalChatContent,
              },
              {
                path: "subgroup/:id",
                name: "subgroupChat",
                component: subGroupChatContent,
              },
              {
                path: "personal/:userId",
                name: "personalChat",
                component: personalChatContent,
                props: (route) => ({
                  groupName: route.params.name,
                  userId: route.params.userId,
                }),
              },
            ],
          },
        ],
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
  {},
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
  // clear alert on route change
  // const alertStore = useAlertStore();
  // alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page

  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const { authorize, groupAuthorize } = to.meta;

  console.log("hello 1");

  if (authRequired && !isLogin()) {
    return next({ path: "/login" });
  }

  if (!authRequired && !isLogin()) {
    return next();
  }

  if ((!authRequired && isLogin()) || (to.path == "/" && isLogin())) {
    console.log("is logged");
    if (getUserStore().user.roles == Roles.ADMIN) {
      return next({ path: "/Admin/dashboard" });
    }
    return next({ path: "/dashboard" });
  }

  console.log("hello 4");
  if (authorize) {
    if (authorize.length && getUserStore().user.hasAnyRole([Roles.ADMIN])) {
      useTopMenuStore().generateMenu();
      return next();
    }
  }

  if (authorize) {
    if (authorize.length && !getUserStore().user.hasAnyRole(authorize)) {
      return next({ path: "/" });
    }
  }

  if (groupAuthorize) {
    const group = to.params.name;
    console.log("Group name:", group);
    console.log("Group Authorize roles:", groupAuthorize);
    useProjectMenuStore().generateMenu(group);
    useTopMenuStore().menu = [];
    if (getUserStore().user.hasAnyRole([Roles.ADMIN])) {
      return next();
    }
    if (!getUserStore().user.hasRoleInGroup(group, groupAuthorize)) {
      console.log(`User is not authorized for group: ${group}`);
      return next({ path: "/" });
    }
  }

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
