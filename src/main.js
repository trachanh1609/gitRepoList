// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.use(BootstrapVue)
Vue.config.productionTip = false

global.GITHUB_URL = 'https://api.github.com/orgs/'
global.ACCESS_TOKEN_OPTION = { params: {access_token: 'd7610917ef34de405d7b9c73a0be80b42d9ed205'}}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
