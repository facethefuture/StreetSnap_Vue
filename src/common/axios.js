import axios from 'axios'
import qs from 'qs'
// import router from 'vue-router'
// import host from './host'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization')
// axios.defaults.baseURL = host.host
axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization')

axios.interceptors.request.use(config => {
  // POST传参序列化
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(response => {
  console.log(response)

  return response
}, err => {
  console.log(err.response)
  if (err.response.status === 403) {
    window.location.href = '/login'
    // this.$router.push({
    //   path: '/login'
    //   // querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
    // })
  }
  return Promise.reject(err)
})
export default axios
