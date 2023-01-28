import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import HomeNavBar from "@/components/HomeNavBar.vue";
import DashboardNavBar from "@/components/DashboardNavBar.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import NewsView from "@/views/NewsView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import QuestionView from "@/views/QuestionView.vue";
import SubjectView from "@/views/SubjectView.vue";
import TestView from "@/views/TestView.vue";

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
    components: {
      default:DashboardView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/question",
    name: "question",
    components: {
      default:QuestionView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/subject",
    name: "subject",
    components: {
      default:SubjectView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/test",
    name: "test",
    components: {
      default:TestView,
      navbar: DashboardNavBar,
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
