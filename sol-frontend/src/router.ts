import Home from './views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: '404', path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
