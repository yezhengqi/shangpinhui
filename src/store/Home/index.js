import {reqCategoryList,reqBanner, reqFloor} from '@/api'
const state = {
  CategoryList: [],
  Banner:[],
  Floor: []
}
const mutations = {
  CATEGORYLIST(state,CategoryList){
    state.CategoryList = CategoryList
  },
  GETBANNER(state,data){
    state.Banner = data
  },
  GETFLOOR(state,data){
    state.Floor = data
  }
}
const actions = {
  //获取三级分类数据
  async getCategoryList({commit}){
    const request = await reqCategoryList();
    commit('CATEGORYLIST',request.data)
  },
  //获取banner轮播图
  async getBanner({commit}){
    const result = await reqBanner()
    if(result.code === 200)
    commit('GETBANNER',result.data)
  },
  //获取floor数据
  async getFloor({commit}){
  const result = await reqFloor()
  if(result.code === 200)
  commit('GETFLOOR',result.data)
}

}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}