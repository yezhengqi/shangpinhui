import store from '@/store';
import axios from 'axios'
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
//获取数据
requests.interceptors.request.use((config)=>{
  //uuid请求头识别添加商品购物车信息
  if(store.state.Detail.uuid_token){
    config.headers.userTempId = store.state.Detail.uuid_token
  }
  //token登录请求头
  if(store.state.User.token){
    config.headers.token = store.state.User.token
  }
  nprogress.start()
  return config
})
//发送数据
requests.interceptors.response.use((res)=>{
  nprogress.done()
  return res.data;
},(error)=>{
  return Promise.reject(new Error('faile'+ error))
})

export default requests