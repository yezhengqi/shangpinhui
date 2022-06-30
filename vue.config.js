const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // productionSourceMap: false,
  devServer: {  //代理解决跨域问题
    proxy: {  
      '/api':{  //当请求地址为api开头地址时，代理服务器向target发送请求并返回结果给本地服务器
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true
      },
    },
  },
  publicPath: './'
})