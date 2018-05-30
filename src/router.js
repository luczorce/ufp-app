import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Welcome from './views/Welcome.vue'
import DataImport from './views/DataImport.vue'
import SharingReport from './views/SharingReport.vue'

import LocalStorage from '@/services/local-storage';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: checkForStorage
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/import',
      name: 'dataImport',
      component: DataImport,
      beforeEnter: checkForStorage
    },
    {
      path: '/history',
      name: 'sharingReport',
      component: SharingReport,
      beforeEnter: checkForStorage
    },
  ]
});

function checkForStorage(to, from, next) {
  if (LocalStorage.exists()) {
    next();
  } else {
    next('/signup');
  }
}
