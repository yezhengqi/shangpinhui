<template>
  <div class="spec-preview">
    <img :src="skuImageListArr.imgUrl" />
    <div class="event" @mousemove="handle"></div>
    <div class="big">
      <img :src="skuImageListArr.imgUrl" ref="imgBig"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>
skuImageListArr
<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data(){
      return{
        imgCurrent: 0
      }
    },
    computed:{
      skuImageListArr(){
        return this.skuImageList[this.imgCurrent] || {}
      }
    },
    methods:{
      //放大镜效果
      handle(event){
        //盒子为400px，蒙版为200px，蒙版触碰到右边盒子距离为鼠标移动300px
        let mask = this.$refs.mask
        let imgBig = this.$refs.imgBig
        let maskx = event.offsetX - (mask.offsetWidth / 2)
        let masky = event.offsetY - (mask.offsetHeight / 2)
        if(maskx < 0) maskx  = 0
        if(masky < 0) masky  = 0
        
        if(maskx >= mask.offsetWidth) maskx  = mask.offsetWidth
        if(masky >= mask.offsetHeight) masky  = mask.offsetHeight
       
        mask.style.left = maskx + "px"
        mask.style.top = masky + "px"
        imgBig.style.left = - (maskx * 2) + 'px'
        imgBig.style.top = - (masky * 2) + 'px'
      }
    },
    mounted(){
      this.$bus.$on('imgCurrent',(index)=>{
        this.imgCurrent = index
      })
    }
  }
</script>
<style scoped lang="less">


  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>