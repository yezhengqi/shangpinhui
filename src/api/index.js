import requests from '@/api/request'
import mockreqursts from '@/api/mockrequest'

//获取三级联动数据
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})

//获取轮播图数据
export const reqBanner = ()=>mockreqursts({url:"/banner",method:'get'})

//获取floor数据
export const reqFloor = ()=>mockreqursts({url:"/floor",method:'get'})

//获取Search数据
export const reqSearch = (params)=>requests({url:"/list",method:"post",data:params})

//获取商品详情detail数据
export const reqDetail = (goodid)=>requests({url:`/item/${goodid}`,method:"get"})

//添加购物车/api/cart/addToCart/{ skuId }/{ skuNum }
export const addShoopCar = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"})

//获取购物车数据
export const getShoopCar = ()=>requests({url:"/cart/cartList",method:"get"})

//输出购物车数据/cart/deleteCart/{skuId}
export const deleteShoopCar = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})

//切换购物车选择状态/cart/checkCart/{skuID}/{isChecked}
export const updaCheckState = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})

//注册-获取验证码
export const getCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:"get"})

//注册-完成注册
export const finishRegister= (userinfo)=>requests({url:"/user/passport/register",method:"post",data:userinfo})

//登录/user/passport/login
export const userLogin = (info)=>requests({url:"/user/passport/login",method:"post",data:info})

//登录-验证用户登录信息http://182.92.128.115/api/user/passport/auth/getUserInfo
export const userInfo = ()=>requests({url:"/user/passport/auth/getUserInfo",method:"get"})

//登录-退出登录
export const loginOut = ()=>requests({url:"/user/passport/logout",method:"get"})

//订单-获取用户信息
export const getTradeInfo = ()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:"get"})
//订单-获取购物车订单
export const getTradeGood = ()=>requests({url:"/order/auth/trade",method:"get"})

//提交订单
export const sumitTrade = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})
//获取订单支付信息/payment/weixin/createNative/{orderId}
export const getPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"})
//获取订单支付状态
export const getPayState = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})