import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import AOS from "../node_modules/aos/dist/aos.js"
import "../node_modules/aos/dist/aos.css"
Vue.use(AOS)
AOS.init();

Vue.prototype.$axios = axios
axios.defaults.baseURL = "http://159.75.69.199:8080"  
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.withCredentials = false
axios.defaults.timeout = '5000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


axios.interceptors.request.use(config => {
  console.log("请求头中加token",config);

  if(window.sessionStorage.getItem('token')){
    config.headers.Authorization = window.sessionStorage.getItem('token');
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
