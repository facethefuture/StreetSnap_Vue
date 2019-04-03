import Vue from 'vue'
import Router from 'vue-router'
import publicPage from '@/components/publicPage'
import home from './home'
// import homePage from '@/views/home/index.vue'
import login from './login'
import streetSnap from './streetSnap'
import photography from './photography'
import post from './post'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: publicPage,
      redirect: {name: 'home'},
      children: [
        home,
        streetSnap,
        photography,
        post
      ],
      beforeEnter (to, from, next) {
        if (localStorage.getItem('Authorization') && localStorage.getItem('jwtDate')) {
          let jwtDate = localStorage.getItem('jwtDate')
          let now = new Date().getTime()
          let outOfDate = now - jwtDate > 1000 * 60 * 60 * 10
          if (outOfDate) {
            console.log('jwt过期了')
            next({ path: '/login' })
          } else {
            console.log('jwt未过期')
          }
          next()
        } else {
          console.log('没有登陆')
          next({ path: '/login' })
        }
      }
    },
    login
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  localStorage.setItem('activeIndex', to.meta.activeIndex)
  next()
})
export default router
