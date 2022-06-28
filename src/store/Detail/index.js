import {reqDetail,addShoopCar} from '@/api'
import {getUUID} from '@/untils/uuid_token.js'

const state ={
  goodDeetail:{},
  uuid_token:getUUID()
}
const mutations ={
  GETDETAIL(state,data){
    state.goodDeetail = data
  }
}

const actions ={
  //请求商品详情数据
  async getDetail({commit},id){
    const result = await reqDetail(id)
    if(result.code == 200){
      commit("GETDETAIL",result.data)
    }
  },
  //添加购物车/api/cart/addToCart/{ skuId }/{ skuNum }
  async addGoodCard({commit},{skuID,skuNum}){
    const goodCar = await addShoopCar(skuID,skuNum)
    if(goodCar.code == 200){
      return "success"
    }else{
      return Promise.reject(new Error('faile'))
    }
  }

}

const getters ={
  categoryView(state){
    //获取数据时因为goodDeetail初始值为空对象，如果使用空对象.子级.子级将会报错，所以要至少赋值给一个对象
    return state.goodDeetail.categoryView || {}
  },
  skuInfo(state){
    return state.goodDeetail.skuInfo || {}
  },
  //商品属性颜色型号数据
  spuSaleAttrList(state){
    return state.goodDeetail.spuSaleAttrList || []
  }
}

export default{
  state,
  mutations,
  actions,
  getters
}