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
  let token = localStorage.getItem("TOKEN")
  let name = store.state.User.userinfo.name
  if(token){
    if(to.path == "/login"){
      next("/home")
    }else{
      if(name){
        next()
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
    if(topath.indexOf('/center') !== -1 || topath.indexOf('/shopcar') !== -1 || topath.indexOf('/pay') !== -1){
      next('/login?redirect='+topath)
    }else{
      next()
    }
  }
})
export default router