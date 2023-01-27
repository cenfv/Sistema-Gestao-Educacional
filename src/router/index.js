import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import HomeNavBar from "@/components/HomeNavBar.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import NewsView from "@/views/NewsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: HomeView,
      navbar: HomeNavBar,
    },
  },
  {
    path: "/about",
    name: "about",
    components: {
      default: AboutView,
      navbar: HomeNavBar,
    },
  },
  {
    path: "/contact",
    name: "contact",
    components: {
      default: ContactView,
      navbar: HomeNavBar,
    },
  },
  {
    path: "/news",
    name: "news",
    components: {
      default: NewsView,
      navbar: HomeNavBar,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
