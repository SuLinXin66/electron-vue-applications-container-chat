import Vue from 'vue'
import VueRouter from 'vue-router'
import Peoples from "@/views/chat/routes/Peoples.vue";
import Message from "@/views/chat/routes/Messages.vue";
import PeopleGroups from "@/views/chat/routes/PeopleGroups.vue";
import PushMsg from "@/views/chat/routes/PushMsg.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/chat/peoples'
  },
  {
    path: '/chat/peoples',
    name: 'peoples',
    component: Peoples
  },
  {
    path: '/chat/peopleGroup',
    name: 'peopleGroup',
    component: PeopleGroups
  },
  {
    path: '/chat/peopleMsg',
    name: 'messages',
    component: Message
  },
  {
    path: '/chat/pushMsg',
    name: 'pushMsg',
    component: PushMsg
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   route level code-splitting
  //   this generates a separate chunk (about.[hash].js) for this route
  //   which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  routes
});

export default router
