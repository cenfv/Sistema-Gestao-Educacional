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
import StudentView from "@/views/StudentView.vue";
import QuestionRegisterView from "@/views/QuestionRegisterView.vue";
import SubjectRegisterView from "@/views/SubjectRegisterView.vue";
import TestRegisterView from "@/views/TestRegisterView.vue";
import StudentRegisterView from "@/views/StudentRegisterView.vue";


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
  },
  {
    path: "/student",
    name: "student",
    components: {
      default:StudentView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/question-register",
    name: "question-register",
    components: {
      default:QuestionRegisterView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/subject-register",
    name: "subject-register",
    components: {
      default:SubjectRegisterView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/test-register",
    name: "test-register",
    components: {
      default:TestRegisterView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/student-register",
    name: "student-register",
    components: {
      default:StudentRegisterView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/student/:id",
    name: "student-update",
    props: true,
    components: {
      default:StudentRegisterView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/question/:id",
    name: "question-update",
    components: {
      default:QuestionRegisterView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/subject/:id",
    name: "subject-update",
    components: {
      default:SubjectRegisterView,
      navbar: DashboardNavBar,
    }
  },
  {
    path: "/test/:id",
    name: "test-update",
    components: {
      default:TestRegisterView,
      navbar: DashboardNavBar,
    }
  },
  
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
