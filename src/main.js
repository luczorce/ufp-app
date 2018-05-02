import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/variables.css'
import './assets/style/global.css'
import './assets/style/forms.css'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
