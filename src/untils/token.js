//将token值储存在本地服务器中
export const getToken = (token)=>{
  localStorage.setItem("TOKEN",token)
}

//获取token
export const setToken = ()=>{
  return localStorage.getItem("TOKEN")
}

//删除token
export const deleToken = ()=>{
  localStorage.removeItem("TOKEN")
}
