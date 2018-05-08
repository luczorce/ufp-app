import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'

import LocalStorage from '@/services/local-storage';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (LocalStorage.exists()) {
          next();
        } else {
          next('/signup');
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
