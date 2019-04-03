import commomComponent from './photographyComponent'
import photographyManagementPage from '@/views/photography/management'
import photographyPostPage from '@/views/photography/post'
const photographyManagement = {
  path: '/photography',
  name: 'photography',
  component: commomComponent,
  meta: {
    title: '摄影模块管理',
    activeIndex: '2-2'
  },
  children: [
    {
      path: 'management',
      name: 'photographyManagement',
      component: photographyManagementPage,
      meta: {
        title: '摄影模块管理',
        activeIndex: '2-2'
      }
    },
    {
      path: 'post',
      name: 'photographyPost',
      component: photographyPostPage,
      meta: {
        title: '发布摄影',
        activeIndex: '2-2'
      }
    }
  ]
}
export default photographyManagement
