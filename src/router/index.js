import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Blogs from '../view/Blogs.vue'
import BlogEdit from '../view/BlogEdit.vue'
import BlogDetail from '../view/BlogDetail.vue'
import Register from '../components/register.vue'
import Myuser from '../view/myuser.vue'
import changeMessage from '../view/changeMessage.vue'
import Account from '../view/account.vue'
import LastBlog from '../view/lastblog.vue'
import Drafts from '../view/drafts.vue'
import QandA from '../components/QandA.vue'
import Message from '../view/message.vue'

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
      { path: '/blogs', component: Blogs},
      {
        path: '/blogEdit',
        name: 'BlogEdit',
        component: BlogEdit
      },
      {
        path: '/blogDetail/:blogId',
        name: 'BlogDetail',
        component: BlogDetail,
        redirect:'/lastblog/-1',
        children: [
          { path: '/lastblog/:blogId', component: LastBlog},
          { path: '/drafts', component: Drafts},
          { path: '/QandA', component: QandA},
        ]
      },
        
      {
        path: '/myuser',
        name: 'Myuser',
        component: Myuser,
        redirect:'/changeMessage',
        children: [
          { path: '/changeMessage', component: changeMessage},
          { path: '/message', component: Message},
          { path: '/account', component: Account},
        ]
      },
]

const router = new VueRouter({
  routes
})

export default router
