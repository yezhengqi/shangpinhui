<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(good,index) in shoopCarList" :key="good.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="good.isChecked" @change="updateChecked($event,good.skuId)">
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl">
            <div class="item-msg">{{good.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{good.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="goodAmoutChange('sub',-1,good)">-</a>
            <input autocomplete="off" type="text" :value="good.skuNum" minnum="1" class="itxt" @change="goodAmoutChange('input',$event.target.value*1,good)">
            <a href="javascript:void(0)" class="plus" @click="goodAmoutChange('add',1,good)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{good.skuNum * good.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGood(good.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="checkAll" @change="checkAllGood">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteSelectGood">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{shoopCarList.length}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{goodSum}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank" @click="">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
  export default {
    name: 'ShopCart',
    data(){
      return{
        goodnumber: 8
      }
    },
    computed:{
      //购物车商品列表
      ...mapState({
        shoopCarList: (state) => state.Shooplist.shoopCarList
      }),
      //商品总价
      goodSum(){
        let sum = 0
        this.shoopCarList.forEach(item =>{
          sum+= item.cartPrice * item.skuNum
        })
        return sum
      },
      //全部勾选状态
      checkAll(){
        return this.shoopCarList.every(item => item.isChecked == 1)
      }
    },
    methods:{
      //商品数量改变
      //使用节流修复连续点击出现的请求bug
      goodAmoutChange:throttle(async function(type,num,item){
        switch(type){
          case "add":
            num = 1
            break
          case "sub":
            item.skuNum >1 ? num=-1:num=0
            break
          case "input":
            if(isNaN(num) || num < 1){
              num = 0
            }else{
              num = parseInt(num) - item.skuNum
            }
        }
        try{
          await this.$store.dispatch("addGoodCard",{skuID:item.skuId,skuNum:num})
          this.$store.dispatch("getshoopCarList")
        }catch(error){
          console.log(error)
        }
      },500),
      //商品删除
      async deleteGood(skuId){
        try{
          await this.$store.dispatch("deleteShoopCar",skuId)
          this.$store.dispatch("getshoopCarList")
        }catch(error){
          console.log(error)
        }
      },
      //商品选择状态
      async updateChecked(checked,skuId){
        checked = checked.target.checked?1:0
        try{
          await this.$store.dispatch("updateChecked",{skuId:skuId,isChecked:checked})
          this.$store.dispatch("getshoopCarList")
        }catch(error){
          console.log(error)
        }
      },
      // 删除选中的商品
      async deleteSelectGood(){
        //promiseAll返回值为true将会执行try里的请求
        try{
            await this.$store.dispatch("deleSeleGood")
            this.$store.dispatch("getshoopCarList")
          }catch(error){
            console.log(error)
          }
      },
      //全选状态改变
      async checkAllGood(event){
        try{
          let isChecked = event.target.checked?1:0
          await this.$store.dispatch("checkedAllGood",isChecked)
          this.$store.dispatch("getshoopCarList")
        }
        catch(error){console.log(error)}
      
      }
    },
    mounted(){
      this.$store.dispatch("getshoopCarList")
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;

          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>