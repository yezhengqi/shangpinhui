<template>
  <div class="pagination">
    
    <button :disabled="pageNo == 1" @click="$emit('totalPage',pageNo - 1)">上一页</button>
     
    <button v-if="pageStartEnd.start > 1" @click="$emit('totalPage',pageNo - 1)" :class="{'active':pageNo==1}">1</button>
    <button v-if="pageStartEnd.start > 2">···</button>
    
    <button v-for="(page,index) in pageStartEnd.end" :key="index"
     v-show="page >= pageStartEnd.start"
     @click="$emit('totalPage',page)"
     :class="{'active':pageNo==page}"
     >{{page}}</button>
    
    <button v-if="pageStartEnd.end < totalPage - 1">···</button>
    <button v-if="pageStartEnd.end < totalPage" @click="$emit('totalPage',totalPage)">{{totalPage}}</button>
     
    <button :disabled="pageNo == totalPage" @click="$emit('totalPage',pageNo + 1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:["pageNo","pageSize","total","continues"],
    computed:{
      //总页数
      totalPage(){
        return Math.ceil(this.total / 3)
      },
      //连续分页器start与end页
      pageStartEnd(){
        const {pageNo,totalPage,continues} = this
        let start = 1
        let end = 1
        if(continues > totalPage){
          start = 1
          end = totalPage
        }else{
          start = pageNo - parseInt(continues / 2)
          end = pageNo + parseInt(continues / 2)
          if(start < 1){
            start = 1
            end = continues
          }
          if(end > totalPage){
            end = totalPage
            start = totalPage - continues + 1
          }
        }
        return {start,end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .active{
    background: skyblue;
  }
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>