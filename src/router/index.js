import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/Home.vue";
import dashboard from "../views/Dashboard.vue";
import project from "../views/Project.vue";
import cookies from "vue-cookies";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: dashboard,
  },
  {
    path: "/project/:id",
    name: "project",
    component: project,
    props: true,
    meta: { title: "Project" },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (!cookies.get("session")) {
    if (to.name != "Home") {
      next({
        name: "Home",
      });
    } else {
      next();
    }
  } else {
    if (to.name == "Home") {
      next({
        name: "Dashboard",
      });
    } else {
      next();
    }
  }
});
export default router;
