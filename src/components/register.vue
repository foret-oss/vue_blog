<template>
  <div class="{login_container : !videoCanPlay}">

     <div class="video-container">
    <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay">
      <source src="../assets/video/womanBackground.mp4" type="video/mp4"/>
    </video>
  </div>


    <div class="login_box" :class="{isClick: isClick, isClickOver: !isClick}">
      <!--登录表单-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginformRules"
        label-width="80px"
        class="login_form"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            prefix-icon="el-icon-user"
            placeholder="用户名或昵称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phonenumber">
          <el-input
            v-model="loginForm.phonenumber"
            prefix-icon="el-icon-phone-outline"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            v-model="loginForm.checkPass"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" :plain="true" @click="login"
            >登录</el-button
          >
          <el-button type="primary" :plain="true" @click="register"
            >注册</el-button
          >
          <el-button type="primary" :plain="true" @click="resetLoginForm"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//import { component } from 'vuepes/umd';
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginFormRef.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        userName: "",
        password: "",
        checkPass: "",
        phonenumber: "",
      },
      fixStyle:'',
      videoCanPlay: false,
      isClick: false,
      //表单验证规则
      loginformRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        phonenumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "手机号码格式不正确！",
            trigger: "blur",
          },
        ],
        password: [
          {
            min: 5,
            max: 15,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {

    canplay(){
      this.videoCanPlay = true;
    },


    //点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    register() {
      this.isClick = true;
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          setTimeout(() => {
            this.$msb
              .alert("输入格式不正确！", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                showCancelButton: false,
                type: "warning",
              })
              .then(() => {
                this.isClick = false;
              })
              .catch(() => { this.click = false;});
          }, 1500);
          return;}

        this.$axios
          .post("/register", {
            username: this.loginForm.userName,
            password: this.loginForm.password,
          })
          .then((res) => {
            console.log("请求注册成功，返回数据", res);
            if (res.data.code == 454)
              return this.$message.error("用户已存在，注册失败！");
            this.$message.success("注册成功！");
            this.$router.push("/login");
          })
          .catch(function (err) {
            console.log("注册失败", err);
          });
      });
    },
    login() {
      this.$router.push("/login");
    },
  },

  mounted: function() {
    window.onresize = () => {
  const windowWidth = document.body.clientWidth
  const windowHeight = document.body.clientHeight
  const windowAspectRatio = windowHeight / windowWidth
  let videoWidth
  let videoHeight
  if (windowAspectRatio < 0.5625) {
   videoWidth = windowWidth
   videoHeight = windowHeight
   this.fixStyle = {
   height: windowWidth * 0.5625 + 'px',
   width: windowWidth + 'px',
   'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
   'margin-left': 'initial'
   }
  } 
  else {
   videoHeight = windowHeight
   videoWidth = windowWidth
   this.fixStyle = {
   height: windowHeight + 'px',
   width: windowHeight / 0.5625 + 'px',
   'margin-left': (windowWidth - videoWidth) / 2 + 'px',
   'margin-bottom': 'initial'
   }
  }
  }
  window.onresize()
  }

};
</script>

<style scoped>
.login_container {
  background: url("../assets/star.png");
  background-size: cover;
  height: 44rem;
  perspective: 500;
  -webkit-perspective: 500;
}

.video-container {
  height: 100%;
  overflow: hidden;
 }
 .fillWidth {
   height: 100%;
   width: 100%;
 }

.login_box {
  width: 400px;
  height: 330px;
  background: rgba(0,0,0,.5);
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  opacity: 1;
  top: 20px;
  right: 30px;
  bottom: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
.btns {
  opacity: 1;
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

.isClick{
  animation: animal3 1s linear 1 forwards;
  pointer-events: none;
}
.isClickOver{
  animation: animal33 1s linear 1 forwards;
  pointer-events: auto;
}
@keyframes animal3 {
  0% {
    transform: rotateX(0deg);

  }
  50% {
    transform: rotateX(50deg);
    transform-origin: center bottom;
  }
  100% {
    transform: rotateX(70deg) translate(-190px, -400px) scale(1.2);
    transform-origin: center bottom;
  }
}
@keyframes animal33 {
  0% {
    transform: rotateX(70deg) translate(-190px, -400px) scale(1.2);
    transform-origin: center bottom;
  }
  50% {
    transform: rotateX(0deg);
    transform-origin: center bottom;
  }
  100% {
    transform: rotateX(0deg) translateX(0, 100px) scale(1);
    transform-origin: center bottom;
  }
}
</style>
