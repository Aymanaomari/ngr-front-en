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
import globalChatConent from "../myviews/projectChat/globalChatContent/Main.vue";

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
        path: "/Admin",
        name: "dashboard1",
        component: adminDashboard,
        meta: {
          authorize: [Roles.ADMIN],
        },
      },
      {
        path: "/",
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
            name: "ProjectChat",
            component: projectChat,
            meta: {
              meta: { authorize: [Roles.REGISTREDUSER, Roles.ADMIN] },
            },
            children: [
              {
                path: "global",
                name: "ProjectChatGlobal",
                component: globalChatConent,
                meta: {
                  groupAuthorize: [RolesPerGroup.GROUPADMIN],
                },
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

  if (authRequired && !isLogin()) {
    console.log("is not login");
    return next();
  }
  if (!authRequired && isLogin()) {
    console.log("is logged");
    if ((getUserStore().user.roles = roles.ADMIN)) {
      return next({ path: "/Admin" });
    }
    return next({ path: "/" });
  }

  if (authorize) {
    if (authorize.length && getUserStore().user.hasAnyRole([Roles.ADMIN])) {
      useTopMenuStore().generateMenu();
      return next();
    }
  }

  if (authorize) {
    if (authorize.length && !getUserStore().user.hasAnyRole(authorize)) {
      useTopMenuStore().generateMenu();
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

export default router;
