import {reqSearch} from '@/api'
const state = {
  Searchlist: {}
}
const mutations = {
  GETSEARCHLIST(state,data){
    state.Searchlist = data
  }
}
const actions = {
  //获取搜索数据
  async getSearchlist({commit},params={}){
    const result = await reqSearch(params)
    if(result.code === 200)
    commit('GETSEARCHLIST',result.data)
  }
}
const getters = {
  //获取简化Searchlist对象中的数据
  goodlist(state){
    //如果数据没有请求成功，返回的将会是一个undefined页面报错。返回给页面一个空数组页面不会报错
    return state.Searchlist.goodsList || []
  },
  attrsList(state){
    return state.Searchlist.attrsList || []
  },
  trademarkList(state){
    return state.Searchlist.trademarkList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}