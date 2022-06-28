import {
  getCode,
  finishRegister,
  userLogin,
  userInfo,
  loginOut
} from "@/api"
import {getToken,setToken,deleToken} from "@/untils/token"

const state = {
  code: null,
  token: setToken(),
  userinfo: {}
}
const mutations = {
  GETCODE(state, data) {
    state.code = data
  },
  USERLOGIN(state,data){  //获取登录token
    state.token = data.token
  },
  USERINFO(state,data){  //获取登录信息
    state.userinfo = data
  },
  LOGINOUT(state){  //退出登录
    deleToken()
    state.userinfo = ''
  }
}
const actions = {
  //获取验证码
  async getCode({
    commit
  }, phone) {
    let result = await getCode(phone)
    if (result.code == 200) {
      commit("GETCODE", result.data)
      return "ok"
    }else{
      return Promise.reject(new Error("failed"))
    }
  },
  //完成注册
  async finishRegister({commit},userinfo){
    let result = await finishRegister(userinfo)
    if(result.code == 200)
      return "ok"
    else
      return Promise.reject(new Error("failed"))
  },

  //登录得到token值
  async userLogin({commit},info){
    let result = await userLogin(info)
    if(result.code == 200){
      getToken(result.data.token)
      commit("USERLOGIN",result.data)
      return "ok"
    }else{
      return Promise.reject(new Error("failed"))
    }
  },
  //验证登录信息
  async userInfo({commit}){
    let result = await userInfo()
    if(result.code == 200){
      commit("USERINFO",result.data)
      return "ok"
    }else{
      return Promise.reject(new Error("failed"))
    }
  },
  //退出登录
  async loginOut({commit}){
    let result = await loginOut()
    if(result.code == 200){
      commit("LOGINOUT")
      return "ok"
    }else{
      return Promise.reject(new Error("failed"))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}