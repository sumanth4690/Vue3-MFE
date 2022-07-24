import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const remote = defineAsyncComponent(() =>
  import("remote/App")
);


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/remote',
      name:'remote',  
      component: remote
    }
  ]
})

export default router
