import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import HomeNavBar from "@/components/HomeNavBar.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import NewsView from "@/views/NewsView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";


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
    component: LoginView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
