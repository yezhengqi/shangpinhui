import {getShoopCar,deleteShoopCar,updaCheckState} from "@/api/"

const state = {
  shoopCarList: []
}
const mutations = {
  SHOOPCARLIST(state,data){
    state.shoopCarList = data
  }
}
const actions = {
  //获取购物车数据例表
  async getshoopCarList({commit}){
    const result = await getShoopCar()
    if(result.code == 200){
      if(result.data.length!==0){
        commit('SHOOPCARLIST', result.data[0].cartInfoList)
      }else{
        commit('SHOOPCARLIST',[])
      }
      }
  },
  //删除购物车数据
  async deleteShoopCar({commit},skuId){
    const result = await deleteShoopCar(skuId)
    if(result.code == 200){
      return "ok"
    }else{
      return Promise.reject(new Error("failed"))
    }
  },
  //改变购物车选择状态
  async updateChecked({commit},{skuId,isChecked}){
    let result = await updaCheckState(skuId,isChecked)
    if(result.code == 200){
      return "ok"
    }else{
      return Promise.reject(new Error("failed"))
    }
  },
  //删除选中的商品
  deleSeleGood({state,dispatch}){
    let Promisearr = []
    state.shoopCarList.forEach(item =>{
      let promise = item.isChecked?dispatch("deleteShoopCar",item.skuId):''
      Promisearr.push(promise)
    })
    return Promise.all(Promisearr)
  },
  //全选状态的改变
  checkedAllGood({state,dispatch},isChecked){
    let stateArr = []
    state.shoopCarList.forEach(item=>{
      let promise = dispatch("updateChecked",{skuId:item.skuId,isChecked})
      stateArr.push(promise)
    })
    return Promise.all(stateArr)
  }

}
const getters = {}

export default{
  state,
  mutations,
  actions,
  getters
}
