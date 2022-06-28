import {getTradeInfo,getTradeGood} from "@/api"

const state = {
  tradeInfo: [],
  tradeList: {}
}
const mutations = {
  GETUSERINFO(state,data){
    state.tradeInfo = data
  },
  GETTRADEGOOD(state,data){
    state.tradeList = data
  }
}
const actions = {
  //获取用户地址信息
  async getUserInfo({commit}){
    let result = await getTradeInfo()
    if(result.code == 200){
      commit('GETUSERINFO',result.data)
    }
  },
  //获取订单商品
  async getTradeGood({commit}){
    let result = await getTradeGood()
    if(result.code == 200){
      commit('GETTRADEGOOD',result.data)
    }
  }
}
const getters = {}

export default{
  state,
  mutations,
  actions,
  getters
}