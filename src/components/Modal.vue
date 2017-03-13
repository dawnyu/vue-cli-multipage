<template>

<div v-show="mode != 0" class='szhezhao'>
    <!-- 弹出框 -->
    <div v-if="mode == 'alert' || mode == 'confirm'" class='prompt_text'>
        <p><img src='../assets/images/list_box_prompt.png'></p>
        <h3 v-html="content"></h3>
        <div class='tjd_modal_footer' v-if="mode =='alert'">
            <p class='modal_confirm_btn modal_sure_btn' @click='onOK'>确定</p>
        </div>
        <div class='tjd_modal_footer' v-if="mode =='confirm'">
            <p class='modal_cancel_btn' @click='onCancel'> 取消</p>
            <p class='modal_confirm_btn' @click='onOK'>确定</p>
        </div>
    </div>
    <!-- loading加载 -->
    <div v-if="mode == 'loading'" class='loading'>
        <div class='loading_text'>
            <div class='spinner'>
                <div class='spinner-container container1'>
                    <div class='circle1'></div>
                    <div class='circle2'></div>
                    <div class='circle3'></div>
                    <div class='circle4'></div>
                </div>
                <div class='spinner-container container2'>
                    <div class='circle1'></div>
                    <div class='circle2'></div>
                    <div class='circle3'></div>
                    <div class='circle4'></div>
                </div>
                <div class='spinner-container container3'>
                    <div class='circle1'></div>
                    <div class='circle2'></div>
                    <div class='circle3'></div>
                    <div class='circle4'></div>
                </div>
            </div>
            <h1 v-text="content"></h1>
        </div>
    </div>
    <!-- 通知框 -->
		<div v-if="mode == 'notice'" class='prompt_text notice'>
  		<p><img src='../assets/images/list_remind_icon.png' >通知</p>
  		  <h3 v-html="content"></h3>
  		<button class='button close_btn' @click='onOK'>确定</button>
		</div>
</div>

</template>

<script>

export default {
    watch: {
      'mode': function(val, oldVal) {
        if (this.mode == 'loading') {
          this.onLoading()
        }
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      mode: {
        type: String,
        default: 'alert'
      },
      ok: {
        type: Function,
        require: false
      },
      cancel: {
        type: Function,
        require: false
      }
    },
    methods: {
      onOK() {
        this.close()
        this.ok && this.ok()
      },
      onLoading() {
        this.ok && this.ok()
      },
      onCancel() {
        this.close()
        this.cancel && this.cancel()
      },
      logout() {
        global.$fn.init()
        this.$emit('closemodal')
      },
      close() {
        this.$emit('closemodal')
      }
    }
}

</script>
<style scoped lang="css">
.dialog-content{
	position: fixed;
	width:500px;
	height: 370px;
	top:30%;
	left:calc(50% - 250px);
	z-index: 11;
	border-radius:10px;
	background: #fff;
}
.dialog-content p:first-child{
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 1.3em;
    color: #131212;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.45);
}
.dialog-content p:nth-child(2){
    margin-top: 20px;
}
.dialog-content p:nth-child(2),.dialog-content p:nth-child(3),.dialog-content p:nth-child(4){
    height: 60px;
    line-height: 60px;
}
.dialog-content p:nth-child(5){
	margin-top: 30px;
}
.dialog-content label{
    float: left;
    width: 30%;
    text-align: right;
}
.dialog-content input{
	height: 50px;
    font-size: 20px;
    width: 60%;
    border-radius: 5px;
	border: 1px solid #ccc;
}
.dialog-sure,.dialog-close{
    display: block;
    width: 40%;
    color: #fff;
    font-size: 1.3em;
    border-radius: 10px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #3293FA;
	cursor: pointer;
}
.dialog-close{
	float: left;
    margin-left: 5%;
}
.dialog-sure{
	float:right;
    margin-right: 5%;
}
.szhezhao {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
}
.notice{

}
.notice p{
    height: 80px;
    line-height: 80px;
}
.notice h3{
    margin-top: 10px;
    font-size: 22px;
    text-align: left;
    height: 200px!important;
    max-height: 200px!important;
    overflow: auto;
    width: 90%;
    margin-left: 5%;
    color: #4a4444;
}
.notice img{
    margin-top: 17px!important;
    position: absolute;
    left: 40px;
}
.button {
    width: 100%;
    height: 60px;
    font-size: 25px;
    background: #3293fa;
    color: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0 0 20px 20px;
    border: none;
    outline: none;
}
.prompt_text {
    position: absolute;
    left: calc(50% - 300px);
    top: 28%;
    width: 600px;
    height: 360px;
    background: #fff;
    background-size: 15%;
    border-radius: 20px;
}

.prompt_text p img {
    margin-top: 70px;
}

.prompt_text h3 {
    color: #050505;
    text-align: center;
    margin-top: 14px;
    font-size: 24px;
    max-height: 140px;
    overflow: auto;
    width: 80%;
    line-height: 41px;
    margin-left: 10%;
    font-weight: normal;
}

.prompt_text h3 span {
    font-size: 16px!important;
    color: #c0c0c0;
}

.prompt_text p {
    text-align: center;
    color: #050505;
    font-size: 24px;
}

.prompt_text p span {
    color: #fd5968;
}

.button {
    width: 100%;
    height: 60px;
    font-size: 25px;
    background: #3293fa;
    color: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0 0 20px 20px;
    border: none;
    outline: none;
}


/*
带取消确定两个按钮时弹出框样式*/

.tjd_modal_footer {
    width: 100%;
    height: 60px;
    font-size: 25px;
    background: #3293fa;
    position: absolute;
    left: 0;
    bottom: 0;
    border: none;
    outline: none;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
}

.modal_confirm_btn,
.modal_cancel_btn {
    width: 50%;
    float: left;
    text-align: center;
    box-sizing: border-box;
    letter-spacing: 0.1em;
    margin: 0;
    cursor: pointer;
    line-height: 60px;
    height: 60px;
    color: #fff!important;
}

.modal_sure_btn {
    width: 100%!important;
}

.modal_cancel_btn {
    border-right: 1px solid #fff;
}

.loading {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
}

.loading_text {
    position: absolute;
    left: calc(50% - 300px);
    top: 28%;
    width: 600px;
    height: 360px;
    background: #fff;
    background-size: 15%;
    border-radius: 20px;
}

.loading_text h1 {
    text-align: center;
    color: #050505;
    font-size: 20px;
    font-weight: normal;
}

@media screen and (min-width: 320px) and (max-width: 960px) {
.szhezhao{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
}
.prompt_text{
    position: absolute;
    top: 20%;
    width: 80%;
    left: 10%;
    height: 240px;
    background: #fff;
    background-size: 15%;
    border-radius:10px;
}
.prompt_text p img{
    margin-top: 30px;
    width: 3em;
}
.prompt_text h3 {
    color: #050505;
    text-align: center;
    margin-top: 21px;
    font-size: 17px;
    height: 75px;
    overflow: auto;
    width: 80%;
    line-height: 35px;
    margin-left: 10%;
    font-weight: normal;
}
.prompt_text h3 span{
    font-size: 16px!important;
   color: #c0c0c0;
}
.prompt_text p{
    text-align: center;
    color: #050505;
    font-size: 14px;
}
.prompt_text p span{
    color: #fd5968;
}
.notice{

}
.notice p{
    height: 50px;
    line-height: 50px;
    font-size:16px;
}
.notice h3{
    margin-top: 0px;
    font-size: 14px;
    text-align: left;
    width: 90%;
    height: 130px;
    overflow: auto;
    margin-left: 5%;
    color: #4a4444;
}
.notice img{
    margin-top: 10px!important;
    position: absolute;
    left: 40px;
    width: 35px!important;
}
.button {
    width: 100%;
    height: 45px;
    font-size: 18px;
    background: #3293fa;
    color: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    border: none;
    outline: none;
}
/*
带取消确定两个按钮时弹出框样式*/
.tjd_modal_footer{
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: #3293fa;
    position: absolute;
    left: 0;
    bottom: 0;
    border: none;
    outline: none;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
.yy_modal_footer{
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: #3293fa;
    border: none;
    outline: none;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
.modal_confirm_btn, .modal_cancel_btn {
    width: 50%;
    float: left;
    text-align: center;
    box-sizing: border-box;
    letter-spacing: 0.1em;
    margin: 0;
    cursor:pointer;
    line-height: 50px;
    height: 50px;
    color: #fff!important;
}
.modal_cancel_btn {
    border-right: 1px solid #fff;
}
/**预约弹出窗**/
.prompt_text_yy{
    position: absolute;
    left: calc(50% - 300px);
    top: 28%;
    width: 600px;
    /*height: 360px;*/
    background: #fff;
    background-size: 15%;
    border-radius: 20px;
}
.prompt_text_yy p img{
    margin-top: 27px;
    width: 9%;
}
.prompt_text_yy h3 {
    color: #050505;
    text-align: center;
    margin-top:30px;
    font-size: 24px;
    width: 80%;
    line-height: 41px;
    margin-left: 10%;
    font-weight: normal;
}
.prompt_text_yy h3 span{
    font-size: 16px!important;
   color: #c0c0c0;
}
.prompt_text_yy>p:first-child{
    text-align: center;
    color: #050505;
    font-size: 24px;
}
.prompt_text_yy>p:nth-child(2){
   text-align: center;
    font-size: 1.5em;
    width: 80%;
    margin: auto;
}
/**此处不能用n+3,文档未加载完全不晓得n是多少**/
.prompt_text_yy p:nth-child(3),
.prompt_text_yy p:nth-child(4),
.prompt_text_yy p:nth-child(5),
.prompt_text_yy p:nth-child(6){
    margin: 14px 0;
    margin-left: 30%;
    color: #AFAFAF;
    font-size: 1.1em;
}
.prompt_text_yy p:nth-child(6) em{
    color: red;
}
.prompt_text_yy p span{
    color: #fd5968;
}
.close{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 1em;
}

}

@media screen and (min-width: 960px) and (max-width: 1024px) {
    .szhezhao{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
}
.prompt_text{
    position: absolute;
    top: 35%;
    width: 40%;
    left: 30%;
    height: 240px;
    background: #fff;
    background-size: 15%;
    border-radius:10px;
}
.prompt_text p img{
    margin-top: 30px;
    width: 3em;
}
.prompt_text h3 {
    color: #050505;
    text-align: center;
    margin-top:20px;
    font-size: 18px;
    width: 80%;
    height: 95px;
    overflow: auto;
    line-height: 40px;
    margin-left: 10%;
    font-weight: normal;
}
.prompt_text h3 span{
    font-size: 16px!important;
   color: #c0c0c0;
}
.prompt_text p{
    text-align: center;
    color: #050505;
    font-size: 14px;
}
.prompt_text p span{
    color: #fd5968;
}
.notice{

}
.notice p{
    height: 50px;
    line-height: 50px;
    font-size:16px;
}
.notice h3{
    margin-top: 0px;
    font-size: 14px;
    text-align: left;
    width: 90%;
    height: 130px;
    overflow: auto;
    margin-left: 5%;
    color: #4a4444;
}
.notice img{
    margin-top: 10px!important;
    position: absolute;
    left: 40px;
    width: 35px!important;
}
.button {
    width: 100%;
    height: 50px;
    font-size: 1.5em;
    background: #3293fa;
    color: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    border: none;
    outline: none;
}
/*
带取消确定两个按钮时弹出框样式*/
.tjd_modal_footer{
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: #3293fa;
    position: absolute;
    left: 0;
    bottom: 0;
    border: none;
    outline: none;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
.yy_modal_footer{
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: #3293fa;
    border: none;
    outline: none;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
.modal_confirm_btn, .modal_cancel_btn {
    width: 50%;
    float: left;
    text-align: center;
    box-sizing: border-box;
    letter-spacing: 0.1em;
    margin: 0;
    cursor:pointer;
    line-height: 50px;
    height: 50px;
    color: #fff!important;
}
.modal_cancel_btn {
    border-right: 1px solid #fff;
}
/**预约弹出窗**/
.prompt_text_yy{
    position: absolute;
    left: calc(50% - 300px);
    top: 28%;
    width: 600px;
    /*height: 360px;*/
    background: #fff;
    background-size: 15%;
    border-radius: 20px;
}
.prompt_text_yy p img{
    margin-top: 27px;
    width: 9%;
}
.prompt_text_yy h3 {
    color: #050505;
    text-align: center;
    margin-top:30px;
    font-size: 24px;
    width: 80%;
    line-height: 41px;
    margin-left: 10%;
    font-weight: normal;
}
.prompt_text_yy h3 span{
    font-size: 16px!important;
   color: #c0c0c0;
}
.prompt_text_yy>p:first-child{
    text-align: center;
    color: #050505;
    font-size: 24px;
}
.prompt_text_yy>p:nth-child(2){
   text-align: center;
    font-size: 1.5em;
    width: 80%;
    margin: auto;
}
/**此处不能用n+3,文档未加载完全不晓得n是多少**/
.prompt_text_yy p:nth-child(3),
.prompt_text_yy p:nth-child(4),
.prompt_text_yy p:nth-child(5),
.prompt_text_yy p:nth-child(6){
    margin: 14px 0;
    margin-left: 30%;
    color: #AFAFAF;
    font-size: 1.1em;
}
.prompt_text_yy p:nth-child(6) em{
	color: red;
}
.prompt_text_yy p span{
    color: #fd5968;
}
.close{
	position: absolute;
    right: 10px;
    top: 10px;
    width: 1em;
}

}

</style>
