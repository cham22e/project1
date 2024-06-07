import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import QuizPage from "../views/QuizPage.vue";
import CommunityPage from "../views/CommunityPage.vue";
import RegisterProblemPage from "../views/RegisterProblemPage.vue";
import SolutionPage from "../views/SolutionPage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import WritePage from "../views/WritePage.vue"; // .vue 확장자 추가
import MyPage from "../views/MyPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/quiz", name: "Quiz", component: QuizPage },
  { path: "/community", name: "Community", component: CommunityPage },
  {
    path: "/register-problem",
    name: "RegisterProblem",
    component: RegisterProblemPage,
  },
  { path: "/solution", name: "Solution", component: SolutionPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/register", name: "Register", component: RegisterPage },
  { path: "/write/:id?", name: "WritePage", component: WritePage }, // 중복 제거 및 .vue 확장자 확인
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
