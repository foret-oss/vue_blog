import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Blogs from '../components/Blogs.vue'
import BlogEdit from '../components/BlogEdit.vue'
import BlogDetail from '../components/BlogDetail.vue'
import Register from '../components/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/login'
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
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
    path: '/blog/add',
    name: 'BlogEdit',
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit
  }
]

const router = new VueRouter({
  routes
})

export default router
