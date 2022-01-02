<template>
  <div>
    <el-form :rules="rules"
             v-loading = "loading"
             element-loading-text = "拼命加载中"
             element-loading-spinner = "el-icon-loading"
             element-loading-background = "rgba(0,0,0,0.8)"
             ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">书库登陆</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loginForm.username" aria-placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" v-model="loginForm.password" aria-placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item prop="checkCode">
        <el-input type="text" auto-complete="false" v-model="loginForm.checkCode" aria-placeholder="点击图片刷新验证码" style="width: 250px; margin-right: 5px"/>
        <img :src="captchaUrl" @click="updateCaptcha">
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住帐号</el-checkbox>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return{
        // todo 验证码请求路径暂空，后端补全后完成此处
        captchaUrl:'',
        loginForm:{
          username:'admin',
          password:'123',
          checkCode:''
        },
        loading:false,
        checked:true,
        rules:{
          username: [{required:true,message:'用户名不能为空',trigger:'blur'}],
          password: [{required:true,message:'密码不能为空',trigger:'blur'}],
          checkCode: [{required:true,message:'验证码不能为空',trigger:'blur'}]
        }
      }
    },
    methods:{
      updateCaptcha(){
        this.captchaUrl ='/captcha?time=' + new Date();
      },
      submitLogin(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.postRequest('/login',this.loginForm).then(resp=>{
              if (resp){
                this.loading = false;
                // 存储token用于后续验证登陆
                const tokenStr = resp.obj.tokenHead+resp.obj.token;
                window.sessionStorage.setItem('tokenStr',tokenStr);
                // 登陆成功后跳转主页
                this.$router.replace('/home');
              }
            })
          } else {
            this.$message.error('登陆失败！！')
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  .loginContainer{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: aliceblue;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginTitle{
    margin: 0 auto 40px auto;
    text-align: center;
  }
  .loginRemember{
    text-align: left;
    margin: 0 0 15px 0;
  }
  .el-alert__content{
    display: flex;
    align-items: center;
  }
</style>