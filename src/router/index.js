import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import {getStorage} from '@/api/sessionStorage'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    meta: { // 是否需要登录访问
      requireAuth: true
    },
    component: Home
  }
]

const router = new Router({
  routes
})
//
// if (getStorage('userInfo')) {
//   router.replace('/');
// }

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (getStorage('userInfo')) { // 能够获取session
      next();
    } else {
      // 无session，返回登录页面
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})

export default router;
