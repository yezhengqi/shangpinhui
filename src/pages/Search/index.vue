<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
           
            <li class="with-x" v-if="good.categoryName">{{good.categoryName}}<i @click="rmBreadQuery">×</i></li>
            <li class="with-x" v-if="good.keyword">{{good.keyword}}<i @click="rmBreadParams">×</i></li>
            <li class="with-x" v-if="good.trademark">{{good.trademark.split(":")[1]}}<i @click="rmBreadTrademark">×</i></li>
            <li class="with-x" v-for="(props,index) in good.props" :key="index">{{props.split(":")[1]}}<i @click="rmBreadProps(index)">×</i></li>

          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trandemarkInfo="trandemarkInfo" @saleValue="saleValue"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="orderChange(1)">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-shengxu':isAsc,'icon-jiangxu':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="orderChange(2)">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-shengxu':isAsc,'icon-jiangxu':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="goodlist in goodlist"
                :key="goodlist.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`detail/${goodlist.id}`">
                      <img v-lazy="goodlist.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goodlist.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goodlist.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <!-- 当前点击页数，一页展示数据数量，数据总量，连续分页数量 -->
          <Pagination :pageNo="good.pageNo" :pageSize="good.pageSize" :total="total" :continues="5" @totalPage="getTotalPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      good: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "手机",
        keyword: "",
        order: "1:desc",  //价格排序 1为综合 2为价格，desc为降序,asc为升序
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: "",
      },
    };
  },
  computed: {
    ...mapGetters(["goodlist"]),
    ...mapState({total:(state) => state.Search.Searchlist.total}),
    //排序类名背景颜色切换
    isOne(){
      return this.good.order.indexOf(1) !== -1
    },
    isTwo(){
      return this.good.order.indexOf(2) !== -1
    },
    //排序升降序切换
    isAsc(){
      return this.good.order.indexOf('asc') !== -1
    },
    isDesc(){
      return this.good.order.indexOf('desc') !== -1
    }
    
  },
  methods: {
    getGoodlist() {
      this.$store.dispatch("getSearchlist", this.good);
    },
    rmBreadQuery(){
      //面包屑删除三级联动请求数据
      this.good.categoryName = undefined
      this.good.category1Id = undefined
      this.good.category2Id = undefined
      this.good.category3Id = undefined
      this.getGoodlist()
      //请求数据后数据刷新地址栏并不会重置，需要修改地址栏
      if(this.$route.params)
      this.$router.push({name:'search',params:this.$route.params})
    },
    rmBreadParams(){
      //面包屑删除搜索请求数据
      this.good.keyword = undefined
      this.getGoodlist()
      //通知Header搜索框清除内容
      this.$bus.$emit("clear")
      if(this.$route.query)
      this.$router.push({name:'search',query:this.$route.query})
    },
    rmBreadTrademark(){
      //面包屑处理商标请求
      this.good.trademark = undefined
      this.getGoodlist()
    },
    //面包屑删除售卖属性
    rmBreadProps(index){
      this.good.props.splice(index,1)
      this.getGoodlist()
    },
    trandemarkInfo(even){
      // 商标trandemark数据获取
      this.good.trademark = `${even.tmId}:${even.tmName}`
      this.getGoodlist()
    },
    //售卖属性数据请求
    saleValue(attrlist,attrname){
      // props请求格式 id:value:name
      let props = `${attrlist.attrId}:${attrname}:${attrlist.attrName}`
      //重复点击同一售卖属性时不会添加 =-1表明数组中不存在attrname数据
      if(this.good.props.indexOf(props) == -1)
      this.good.props.push(props)
      this.getGoodlist()
    },
    //排序数据请求
    orderChange(flag){
      //通过flag判断点击的是综合还是价格
      let order = ""
      let initflag = this.good.order.split(':')[0]
      let initsc = this.good.order.split(':')[1]
      //如果点击的flag等于初始值（相当于两次点击了同一选项），那么改变desc
      if(flag == initflag){
        order = `${flag}:${initsc== 'desc'?'asc':'desc'}`
      }else{
        order = `${flag}:${'desc'}`
      }
      this.good.order = order
      this.getGoodlist()
    },
    //分页器请求
    getTotalPage(index){
      this.good.pageNo = index
      this.getGoodlist()
    }
    
  },
  beforeMount(){
    //在goodlist数据请求之前合并params-query数据
    Object.assign(this.good,this.$route.params,this.$route.query)
  },
  mounted() {
    this.getGoodlist()
  },
  watch:{
    $route(){     
      //请求之前需要把三级列表数据删除，否则再次请求不同级数数据合并将会多出
      this.good.category1Id = ''
      this.good.category2Id = ''
      this.good.category3Id = ''
      //每次路由发生变化，都要合并一下请求参数，重新发送请求
      Object.assign(this.good,this.$route.params,this.$route.query)
      this.getGoodlist()
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>