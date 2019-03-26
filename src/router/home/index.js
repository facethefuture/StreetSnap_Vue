import homePage from '@/views/home/index'
import view from './view'
const home = {
  path: 'home',
  name: 'home',
  component: view,
  children: [
    {
      path: 'item',
      name: 'itemPage',
      component: homePage
    }
  ]

}
export default home
