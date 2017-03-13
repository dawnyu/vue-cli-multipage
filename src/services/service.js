import xhr from './xhr/'
/**
 * 对应后端的 /api/* 所有 API
 */
 class Service{
     //登录
   login(params,_this){
     this.isLoading()
     return xhr(params,_this,'post','/center/login')
   }
 }

 export default new MerchantService()
