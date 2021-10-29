import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import AOS from "../node_modules/aos/dist/aos.js"
import "../node_modules/aos/dist/aos.css"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Vue_Particles from 'vue-particles'
Vue.use(mavonEditor)
Vue.use(AOS)
Vue.use(Vue_Particles)
AOS.init();

Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://159.75.69.199:8080"
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = false
axios.defaults.timeout = '5000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


axios.interceptors.request.use(config => {
  console.log("请求头中加token");

  if(window.sessionStorage.getItem('token')){
    config.headers.Authorization ="JWT" + " " + window.sessionStorage.getItem('token');
  }
  return config;
},
error => {
  return Promise.reject(error);
}
)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}