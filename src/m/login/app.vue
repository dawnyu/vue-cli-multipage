
<template lang="html">

<div class="">
    <header>
        <p>登录</p>
    </header>
    <section id="wrapper">
        <div class="content">
            <p>
                <input type="text" @focus="focus" v-model="login"  @keyup.13="onEnter" placeholder="用户名" value="" />
                <span class="icon-input-clear" v-show="clear" v-on:click="del"><i class="icon-cross"></i></span>
            <p>
                <input type="password" v-model="password" @keyup.13="onEnter" placeholder="密码" />
            </p>
            <input type="hidden" id="password" name="password" />
            <p class="login_sure">
                <input type="button" v-bind:class="{'submit-sure':isSure}" @keyup.13="onEnter" @click="submit" value="登录" />
            </p>
        </div>
    </section>
</div>

</template>

<script>
import merchantService from '../../services/service'
export default {
    data() {
      return {
        checked: false,
        login: '',
        password: '',
        clear: false,
        isSure: false
      }
    },
    created:function(){
      //跳转到登录页面，销毁登录信息
      sessionStorage.removeItem('token')

      this.login = localStorage.getItem('login')
      this.password = localStorage.getItem('password')
    },
    methods:{
      onEnter: function() {
        this.submit()
      },
      del: function() {
        this.login = null
      },
      submit: function() {
        if (!this.isSure) return false
        if (!this.login) alert('用户名不能为空！')
        if (!this.password) alert('密码不能为空')
        //登录
        merchantService
        .login({login:this.login,password:this.password})
        .then((data) => {
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
<style  type="text/css" scoped>
    @import './login.css';
</style>