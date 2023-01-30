import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import HomeNavBar from "@/components/HomeNavBar.vue";
import AdminNavBar from "@/components/AdminNavBar.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import NewsView from "@/views/NewsView.vue";
import LoginView from "@/views/LoginView.vue";
import AdminDashboardView from "@/views/AdminDashboardView.vue";
import QuestionView from "@/views/QuestionView.vue";
import SubjectView from "@/views/SubjectView.vue";
import TestView from "@/views/TestView.vue";
import StudentView from "@/views/StudentView.vue";
import QuestionRegisterView from "@/views/QuestionRegisterView.vue";
import SubjectRegisterView from "@/views/SubjectRegisterView.vue";
import TestRegisterView from "@/views/TestRegisterView.vue";
import StudentRegisterView from "@/views/StudentRegisterView.vue";
import AnswerTestView from "@/views/AnswerTestView.vue";
import AnswerQuestionView from "@/views/AnswerQuestionView.vue";
import StudentNavBar from "@/components/StudentNavBar.vue";
import StudentDashboardView from "@/views/StudentDashboardView.vue";
import StudentSubjectsView from "@/views/StudentSubjectsView.vue";
import SubjectTestsView from "@/views/SubjectTestsView.vue";

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
      default: AdminDashboardView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/question",
    name: "question",
    components: {
      default: QuestionView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/subject",
    name: "subject",
    components: {
      default: SubjectView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/test",
    name: "test",
    components: {
      default: TestView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/student",
    name: "student",
    components: {
      default: StudentView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/question-register",
    name: "question-register",
    components: {
      default: QuestionRegisterView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/subject-register",
    name: "subject-register",
    components: {
      default: SubjectRegisterView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/test-register",
    name: "test-register",
    components: {
      default: TestRegisterView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/student-register",
    name: "student-register",
    components: {
      default: StudentRegisterView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/student/:id",
    name: "student-update",
    props: true,
    components: {
      default: StudentRegisterView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/question/:id",
    name: "question-update",
    components: {
      default: QuestionRegisterView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/subject/:id",
    name: "subject-update",
    components: {
      default: SubjectRegisterView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/test/:id",
    name: "test-update",
    components: {
      default: TestRegisterView,
      navbar: AdminNavBar,
    },
  },
  {
    path: "/test/answer/:id",
    name: "answer-test",
    components: {
      default: AnswerTestView,
      navbar: StudentNavBar,
    },
  },
  {
    path: "/test/answer/question",
    name: "answer-question",
    components: {
      default: AnswerQuestionView,
      navbar: StudentNavBar,
    },
  },
  {
    path: "/student-dashboard",
    name: "student-dashboard",
    components: {
      default: StudentDashboardView,
      navbar: StudentNavBar,
    },
  },
  {
    path: "/student-subjects",
    name: "student-subjects",
    components: {
      default: StudentSubjectsView,
      navbar: StudentNavBar,
    },
  },
  {
    path: "/subject/:id/tests",
    name: "subject-tests",
    components: {
      default: SubjectTestsView,
      navbar: StudentNavBar,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
