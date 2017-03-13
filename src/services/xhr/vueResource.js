import Vue from 'vue'
import VueResource from 'vue-resource'
import { rootPath,local } from './config'
import {rootName} from '../../config'

Vue.use(VueResource)
Vue.http.options.root = rootPath
Vue.http.options.emulateJSON = true
Vue.http.options.xhr = { withCredentials: true }
const xhr = ( body, method = 'get',url) => {
    // Object.assign(body, {token:sessionStorage.getItem("tjd_token")});
  // 引入了 ES6 的 Promise 实现
  return new Promise((resolve, reject) => {
    Vue.http[method.toLowerCase()](rootPath + url, body)
      .then(({ data }) => {
        if (!data)
          return resolve(null)
        if(data.isSuccess == 0){
            resolve(data)
        }else if (data.isSuccess == 2){
            //登录超时，重新登录
            return errHandler(data.errorMSG,()=>{
              window.location.href='/'+rootName+'/login.html'
            })
        }else{
            //如果传入this对象，则统一拦截错误信息。否则返回错误
            resolve(data) 
        }

      }, errHandler)
  })
}
const errHandler = (e,callback) => {
    if(e.ok){
       alert("alert","",'网络异常，请检查网络',callback)
        return
    }
    if(!e.ok && e.status == 0){
       alert("alert","",'网络异常，请检查网络！')
        return
    }
    if(!e.ok && e.status == 400){
       alert("alert","",e.body.message)
        return
    }
    if(!e.ok && e.status == 404){
       alert("alert","",'接口地址不存在！')
        return
    }
    if(!e.ok && e.status == 405){
       alert("alert","",'接口地址有误！')
        return
    }
    if(!e.ok && e.status == 500){
       alert("alert","",'服务器通讯异常！')
        return
    }
    if(e =='登陆超时，请重新登陆'){
        callback()
    }else{
       alert("alert","",e)
        return
    }

}

export default xhr
