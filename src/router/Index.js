import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/exam/:categoryId/:id",
    name: "Questionaire",
    component: () =>
      import(
        /* webpackChunkName: "QuestionairePage" */ "../view/Questionaire.vue"
      ),
    props: true,
  },
  {
    path: "/exam/:categoryId/:userId",
    name: "Result",
    component: () =>
      import(
        /* webpackChunkName: "ResultDetails" */ "../components/ResultDetails.vue"
      ),
    props: true,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "PageNotFound" */ "../view/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
