import { createRouter, createWebHistory } from "vue-router";

import TopMenu from "../layouts/top-menu/Main.vue";
import DashboardOverview2 from "../views/dashboard-overview-2/Main.vue";
import Login from "../myviews/login/Main.vue";
import Register from "../views/register/Main.vue";
import ErrorPage from "../views/error-page/Main.vue";

/*my views*/

import adminDashboard from "../myviews/adminDashboard/adminDashboard.vue";
import ProjectsManagement from "../myviews/projectManagement/projectsManagement.vue";
import usersManagemet from "../myviews/usermanagement/usersManagement.vue";
import profileView from "../myviews/profile/profileView.vue";
import personalInformation from "../myviews/profile/personalInformation.vue";
import calendarView from "../myviews/calendar/calendarView.vue";
/*services*/
import Roles from "../utils/roles";
import { isLogin } from "../services/auth.service";
import { getUserStore } from "../stores";

const routes = [
  {
    path: "/",
    component: TopMenu,
    children: [
      {
        path: "/admindashboard",
        name: "dashboard1",
        component: adminDashboard,
        meta: {
          authorize: [Roles.ADMIN],
        },
      },
      {
        path: "",
        name: "dashboard2",
        component: DashboardOverview2,
        meta: {
          authorize: [Roles.REGISTREDUSER],
        },
      },
      {
        path: "/allusers",
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
        path: "/projectsManagement",
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
  const { authorize } = to.meta;

  if (authRequired && !isLogin()) {
    console.log("is not login");
    return next({ path: "/login" });
  }
  if (!authRequired && isLogin()) {
    console.log("is logged");
    return next({ path: "/" });
  }

  if (authorize) {
    if (authorize.length && !getUserStore().user.hasAnyRole(authorize)) {
      // role not authorised so redirect to home page
      return next({ path: "/" });
    }
  }

  next();
});

export default router;
