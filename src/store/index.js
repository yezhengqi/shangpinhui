import Vue from 'vue'
import vuex from 'vuex'
import Home from './Home'
import Search from './Search'
import Detail from './Detail'
import Shooplist from './Shooplist'
import User from './User'
import Trade from './Trade'

Vue.use(vuex)

export default new vuex.Store({
  modules:{
    Home,
    Search,
    Detail,
    Shooplist,
    User,
    Trade
  }
})