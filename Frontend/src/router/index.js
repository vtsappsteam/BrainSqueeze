import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/questions",
    name: "Questions",
    component: () => import("@/views/Questions/QuestionsView.vue"),
  },
  {
    path: "/question",
    name: "Question",
    component: () => import("@/views/Question/QuestionView.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("@/views/Categories/CategoriesView.vue"),
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("@/views/Category/CategoryView.vue"),
  },
  {
    path: "/question-difficulties",
    name: "Question Difficulties",
    component: () =>
      import("@/views/QuestionDifficulties/QuestionDifficultiesView.vue"),
  },
  {
    path: "/question-difficulty",
    name: "Question Difficulty",
    component: () =>
      import("@/views/QuestionDifficulty/QuestionDifficultyView.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/Users/UsersView.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/User/UserView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register/RegisterView.vue"),
  },
  {
    path: "/changePassword",
    name: "Change passord",
    component: () => import("@/views/ChangePassword/ChangePasswordView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
