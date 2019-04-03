import commonComponent from './streetSnapComponent'
import streetSnapManagementPage from '@/views/streetSnap/management'
import streetSnapPostPage from '@/views/streetSnap/post'
const streetSnapManagement = {
  path: '/streetsnap',
  name: 'streetSnapManagement',
  component: commonComponent,
  meta: {
    title: '街拍模块',
    activeIndex: '2-1'
  },
  children: [{
    path: 'management',
    name: 'streetSnapManagement',
    component: streetSnapManagementPage,
    meta: {
      title: '街拍模块',
      activeIndex: '2-1'
    }
  },
  {
    path: 'post',
    name: 'streetSnapPost',
    component: streetSnapPostPage,
    meta: {
      title: '街拍发布',
      activeIndex: '2-1'
    }
  }
  ]
}
export default streetSnapManagement
