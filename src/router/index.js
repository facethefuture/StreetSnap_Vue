import Vue from 'vue'
import Router from 'vue-router'
import publicPage from '@/components/publicPage'
// import home from './home/index'
import homePage from '@/views/home/index.vue'
import loginPage from '@/views/login/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: publicPage,
      children: [
        {
          name: 'home',
          path: 'home',
          component: homePage
        },
        {
          path: 'login',
          name: 'login',
          component: loginPage
        }
      ]
    }
  ]
})
