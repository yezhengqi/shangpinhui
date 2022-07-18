import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search/'
import Detail from '@/pages/Detail/'
import AddGoodCard from '@/pages/AddCartSuccess'
import ShopCar from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import Myorder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
import store from '@/store'

Vue.use(Router)
//解决路由多次点击报错问题
let originPush = Router.prototype.push;
let originReplace = Router.prototype.replace;
Router.prototype.push = function(location,resolve,reject){
  if(resolve,reject){originPush.call(this,location,resolve,reject)}
  else{originPush.call(this,location,()=>{},()=>{})}
}
Router.prototype.replace = function(location,resolve,reject){
  if(resolve,reject){originReplace.call(this,location,resolve,reject)}
  else{originReplace.call(this,location,()=>{},()=>{})}
}
let router = new  Router({
  routes:[
    {
      path:'/center',
      component: Center,
      redirect:'/center/myorder',
      meta:{
        show: true
      },
      children:[
        {
          path:'myorder',
          component: Myorder,
        },
        {
          path:'grouporder',
          component: GroupOrder,
        }
      ]
    },
    {
      path:'/paysuccess',
      component: PaySuccess,
      meta:{
        show: true
      }
    },
    {
      path:'/pay',
      component: Pay,
      meta:{
        show: true
      },
      beforeEnter:(to,from,next)=>{
        if(from.path == "/trade" || from.path == '/'){
          next()
        }else{
          next(false)
        }
      }
    },
    {
      path:'/trade',
      component: Trade,
      meta:{
        show: true
      },
      // 路由独享守卫
      beforeEnter:(to, from, next)=>{
        if(from.path == "/shopcar" || from.path == '/'){ //解决刷新的时候跳转到失效地址
          next()
        }else{
          next(false) //取消当前导航，重置到跳转之前的路由
        }
      }
    },
    {
      path:'/home',
      //路由懒加载
      component: ()=>import("@/pages/Home/Home.vue"), 
      meta:{
        show: true
      }
    },
    {
      path:'/login',
      component: Login,
      meta:{
        show: false
      }
    },
    {
      path:'/register',
      component: Register,
      meta:{
        show: false
      }
    },
    {
      path:'/search/:keyword?',
      // path:'/search',
      component: Search,
      name: 'search',
      meta:{
        show: true
      }
    },
    {
      path:'/detail/:goodid',
      component:Detail,
      meta:{
        show:true
      }
    },
    {
      name: "addgoodcard",
      path:'/addgoodCar',
      component: AddGoodCard,
      meta:{
        show:true
      }
    },
    {
      name: "shopcar",
      path:'/shopcar',
      component: ShopCar,
      meta:{
        show:true
      }
    },
    {
      path:'*',
      redirect: '/home'
    },
  ],
  //路由滚动行为
  scrollBehavior() {
    // 始终滚动到顶部
    return {y: 0}
  },
})

//全局前置导航守卫
router.beforeEach(async (to,before,next)=>{
  //获取token及用户信息
  let token = localStorage.getItem("TOKEN")
  let name = store.state.User.userinfo.name
  if(token){
    if(to.path == "/login"){
      next("/home")
    }else{
      //如果用户信息存在
      if(name){
        next()
      //如果用户不存在，尝试请求接口获取用户信息，获取失败则请求接口退出账号跳转到登录接口
      }else{
          try{
            await store.dispatch("userInfo")
            next()
          }catch(error){
            await store.dispatch("loginOut")
            next("/login")
        }   
      }
    }
  }else{
    //未登录时，不能去往支付相关页面
    let topath = to.path
    console.log(topath)
    //indexOf如果不存在字符返回-1，如果存在返回首字符出现的位置
    if(topath.indexOf('/center') !== -1 || topath.indexOf('/shopcar') !== -1 || topath.indexOf('/pay') !== -1){
      //如果没有token记录topath,登录成功后拿取topath跳转
      next('/login?redirect='+topath)
    }else{
      next()
    }
  }
})
export default router