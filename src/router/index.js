import Vue from 'vue'
import Router from 'vue-router'
import publicPage from '@/components/publicPage'
import home from './home'
// import homePage from '@/views/home/index.vue'
import login from './login'
import streetSnapManagement from './streetSnapManagement'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: publicPage,
      children: [
        home,
        login,
        streetSnapManagement
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  localStorage.setItem('activeIndex', to.meta.activeIndex)
  next()
})
export default router
