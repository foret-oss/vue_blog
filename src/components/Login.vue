<template>
  <div class="login_container">
    <div data-aos="zoom-in-up" data-aos-duration="3000">it's me</div>
    <!--登录表单-->
    <div
      class="loginBox"
      :class="{ hasClick: hasClick, hasClickOff: !hasClick && goBack }"
    >
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginformRules"
        label-width="80px"
        class="login_form"
      >
        <div class="loginAvatar">
          <img src="../assets/bear.jpg" class="loginImg" alt="小熊图案" />
        </div>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="手机号码或邮箱或昵称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            show-password
            type="password"
            placeholder="请输入密码"
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
    <div
      class="authen"
      :class="{ appear: hasClick, appearOff: !hasClick && goBack }"
    >
      <div class="circle">
        <div class="bg"></div>
      </div>
      <p class="zi">努力前进中...</p>
    </div>
  </div>
</template>

<script>
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

    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      hasClick: false,
      goBack: false,

      //表单验证规则
      loginformRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 2 到 5 个字符", trigger: "blur" },
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
      },
    };
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.hasClick = true;
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) {
          setTimeout(() => {
            this.$msb
              .alert("请输入用户名和密码！", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                showCancelButton: false,
                type: "warning",
              })
              .then(() => {
                this.hasClick = false;
                this.goBack = true;
              });
          }, 1500);
          return;
        }

        this.$axios
          .post("/login", this.loginForm)
          .then((res) => {
            console.log("请求登录成功，返回数据", res);
            if (res.data.code == 455) {
              console.log("用户不存在", res.data.message);
              
            setTimeout(() => {
            this.$msb
                .alert("用户不存在, 是否注册?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "info",
                })
              .then(() => {
                this.hasClick = false;
                this.goBack = true;
                this.$router.push("/register");
              }).catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消注册",
                  });
                  this.hasClick = false;
                  this.goBack = true;
                });
          }, 1500);

          return;
          } else if (res.data.code === 456)
              return this.$message.error("密码不正确！");

            setTimeout(() => {
                this.hasClick = false;
                this.goBack = true;
            }, 22500);

            this.$message.success("登录成功！");
            window.sessionStorage.setItem("token", res.data.token);
            window.sessionStorage.setItem("username", this.loginForm.username);
            this.$router.push("/blogs");
          })
          .catch(function (err) {
            console.log("请求登录失败", err);
          });

        console.log(
          console.log("setSession", window.sessionStorage.getItem("userName"))
        );
      });
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login_container {
  width: 100%;
  color: rgb(212, 145, 57);
  background: url("../assets/star.png");
  background-size: cover;
  height: 44rem;
  font-size: 40px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  text-align: center;
  padding-top: 3%;
  perspective: 500;
  -webkit-perspective: 500;
}
.login_form {
  width: 330px;
  height: 239px;
  background: linear-gradient(
    230deg,
    rgb(145, 143, 143) 0,
    rgb(19, 18, 18) 100%
  );
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -33%);
}
.btns {
  opacity: 1;
  display: flex;
  width: 100%;
  justify-content: flex-start;
}
.el-form-item {
  transform: translate(-38px, -23px);
}
.loginAvatar {
  width: 80px;
  height: 70px;
  transform: translate(120px, -30px);
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 5px #ddd;
  background-color: rgb(246, 246, 248);
}
.loginAvatar > .loginImg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.hasClick {
  animation: animal1 1s linear 1 forwards;
  pointer-events: none;
}
.hasClickOff {
  animation: animal11 1s linear 1 forwards;
  pointer-events: auto;
}
@keyframes animal1 {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(50deg);
    transform-origin: center bottom;
  }
  100% {
    transform: rotateX(50deg) translate(0px, 300px) scale(0.5);
    transform-origin: center bottom;
  }
}
@keyframes animal11 {
  0% {
    transform: rotateX(50deg) translate(0px, 300px) scale(0.5);
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
.authen {
  width: 240px;
  height: 120px;
  position: absolute;
  z-index: inherit;
  top: 55%;
  left: 50%;
  margin-left: -100px;
  background: linear-gradient(
    230deg,
    rgba(233, 234, 238, 0) 0%,
    rgb(0, 0, 0) 100%
  );
  box-shadow: -15px 15px 15px rgb(6 17 47 / 70%);
  transition: all 1s;
  transform: scale(0);
}
.appear {
  animation: animal2 2s linear 1 forwards;
}
.appearOff {
  animation: animal22 2s linear 1 forwards;
}
.circle {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.bg {
  width: 50px;
  height: 50px;
  background:powderblue;
  background-size: 100% 100%;
  animation: animal 1s infinite linear;
}
.zi {
  font-size: 15px;
  color: #fff;
  text-align: center;
  line-height: 20px;
}
@keyframes animal2 {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1) translateX(100px);
  }
}
@keyframes animal22 {
  0% {
    transform: scale(1) translateX(100px);
  }
  50% {
    transform: scale(1) translateX(0);
  }
  100% {
    transform: scale(0) translateX(0);
  }
}
</style>
