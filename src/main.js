import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import Typenav from '@/components/Typenav/TypeNav.vue'
import Banner from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import '@/untils/reset.css'
import store from '@/store'
import { MessageBox} from 'element-ui';
import * as API from '@/api'

import '@/mock/serve'
import 'swiper/css/swiper.css';
import Lazyload from 'vue-lazyload'
import loadimg from '@/assets/imglazy.gif'
//引入表单校验插件
import '@/plugin/validate'
Vue.component(Typenav.name,Typenav)
Vue.component(Banner.name,Banner)
Vue.component(Pagination.name,Pagination)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//图片懒加载
Vue.use(Lazyload,{
  loading: loadimg
})

new Vue({
  render: h => h(App),
  router,
  store,
  //全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
