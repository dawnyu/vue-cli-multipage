<template>

<div id="login">
    <header v-text="headerTitle"></header>
    <div class="wrapper">
        <div class="login">
            <form id="loginForm" action="/login" method="post">
                <p>
                    <label for="login">用户名</label>
                    <input type="text" @focus="focus" v-model="login" @keyup.13="onEnter" placeholder="请输入用户名">
                    <span class="icon-input-clear" v-show="clear" @click="del"><i class="icon-cross"></i></span>
                </p>
                <p>
                    <label for="password_cookie">密&nbsp;&nbsp;码</label>
                    <input type="password" v-model="password" @keyup.13="onEnter" placeholder="请输入密码" />
                </p>
                <input type="hidden" name="password" />
                <p class="chose">
                    <label for="rmb"><b>记住密码</b></label>
                    <span>
					   <input id="rmb" type="checkbox" v-model="checked">
			           <label for="rmb" class="twentyPercent"></label>
		            </span>
                </p>
                <p class="login_sure">
                    <input type="button" :class="{'submit-sure':isSure}" @click="submit" value="登录">
                </p>
            </form>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import merchantService from '../../services/service'
import { getUrlName } from '../../assets/util'
export default {
    data() {
      return {
        checked: false,
        login: '',
        password: '',
        clear: false,
        isSure: false,
        headerTitle:'',
        logoSrc:''
      }
    },
    created:function(){
      let vm = getUrlName()
      this.init()
      //跳转到登录页面，销毁登录信息
      sessionStorage.removeItem("token")

      if (localStorage.rm) {
        this.checked = true
        this.login = localStorage.getItem("login")
        this.password = localStorage.getItem("password")
      }
    },
    methods: {
      onEnter: function() {
        this.submit()
      },
      del: function() {
        this.login = null
      },
      submit: function() {
        if (!this.isSure) return false
        //登录
        merchantService
        .login({login:this.login,password:this.password},this.$parent)
        .then((data) => {
          window.location.href = 'www.baidu.com'
        })
      },
      //获取焦点，如果有值，则按钮变色
      focus(){
        if(this.login){
          this.isSure = true
        }
      }
    },
    watch: {
        //监听输入框的值变化
        'login': {
            handler: function(val, oldVal) {
                if (val) {
                    this.$data.clear = true
                    if (this.$data.password) {
                        this.$data.isSure = true
                    } else {
                        this.$data.isSure = false
                    }
                } else {
                    this.$data.clear = false
                    this.$data.isSure = false
                }
            },
            deep: true
        },
        'password': {
            handler: function(val, oldVal) {
                if (val) {
                    if (this.$data.login) {
                        this.$data.isSure = true
                    } else {
                        this.$data.isSure = false
                    }
                } else {
                    this.$data.isSure = false
                }
            }
        }
    }
}

</script>
<style type="text/css" scoped src="./login.css"></style>
