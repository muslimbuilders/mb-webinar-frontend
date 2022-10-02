import Vue from "vue";
import VueRouter from "vue-router";
import TaskManager from "@/views/TaskManager"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Task-Manager",
    component: TaskManager,
  },
  
 

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
