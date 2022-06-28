import Vue from 'vue'
import zh_CN from "vee-validate/dist/locale/zh_CN"
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

//表单校验
VeeValidate.Validator.localize("zh_CN",{
  messages:{
    ...zh_CN.messages,
    is:(field) => `${field}必须与密码相同`, //修改内置规则message
  },
  attributes:{
    phone:"手机号",
    code:"验证码",
    password:"密码",
    passwordagin:"确认密码",
    agree:"协议"
  },
})

//自定义协议校验规则
VeeValidate.Validator.extend("tongyi",{
  validate:(value) =>{
    return value
  },
  getMessage: (field) => field + "必须同意"
})
