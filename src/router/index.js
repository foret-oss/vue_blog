import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Blogs from '../view/Blogs.vue'
import BlogEdit from '../view/BlogEdit.vue'
import BlogDetail from '../view/BlogDetail.vue'
import Register from '../components/register.vue'
import ThreeDlogin from '../components/3Dlogin.vue'
import Myuser from '../view/myuser.vue'
import Message from '../view/message.vue'
import Account from '../view/account.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/blogs'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/ThreeDlogin',
    name: 'ThreeDlogin',
    component: ThreeDlogin
  },
      { path: '/blogs', component: Blogs},
      {
        path: '/blogEdit',
        name: 'BlogEdit',
        component: BlogEdit
      },
      {
        path: '/blogDetail/:blogId',
        name: 'BlogDetail',
        component: BlogDetail
      },
      {
        path: '/myuser',
        name: 'Myuser',
        component: Myuser,
        children: [
          { path: '/message', component: Message},
          { path: '/account', component: Account},
        ]
      },
]

const router = new VueRouter({
  routes
})

export default router
