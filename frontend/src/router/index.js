import { createRouter, createWebHistory } from "vue-router";

import Forum from "../views/Forum.vue"
import Home from "../views/Home.vue"
import Profile from "../views/Profile.vue";

const routes = [
    {
      name: "Home",
      component: Home,
      path: "/"
    },
    {
      name: "Forum",
      component: Forum,
      path: "/forum"
    },
    {
      name: "Profile",
      component: Profile,
      path: "/profile"
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;