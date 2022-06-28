import { v4 as uuidv4 } from 'uuid'
//生成一个uuid字符串，且每次执行不能发生改变
export const getUUID = ()=>{
  let uuid_token = localStorage.getItem("UUIDTOKEN")
  if(!uuid_token){
    uuid_token = uuidv4()
    localStorage.setItem("UUIDTOKEN",uuid_token)
  }
  return uuid_token
}