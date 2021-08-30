<template>
  <div class="login_container">
    <div data-aos="zoom-in-up" data-aos-duration="3000">Welcome To MyBlog~</div>
    <!--登录表单-->
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
        <el-button type="primary" :plain="true" @click="login">登录</el-button>
        <el-button type="primary" :plain="true" @click="register"
          >注册</el-button
        >
        <el-button type="primary" :plain="true" @click="resetLoginForm"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
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
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        //this.$message.success("登录成功！");

        this.$axios
          .post("/login", this.loginForm)
          .then((res) => {
            console.log("请求登录成功，返回数据", res);
            if (res.data.code == 455) {
              console.log("用户不存在", res.data.message);
              this.$msb
                .alert("用户不存在, 是否注册?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "info",
                })
                .then(() => {
                  this.$router.push("/register");
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消注册",
                  });
                });
              return;
            }
            else if(res.data.code === 456) return this.$message.error("密码不正确！");
            this.$message.success("登录成功！");
            window.sessionStorage.setItem("token", res.data.token);
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
  background: url("../assets/background2.png");
  background-size: cover;
  height: 44rem;
  font-size: 40px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  text-align: center;
  padding-top: 3%;
}
.login_form {
  width: 330px;
  height: 239px;
  background-color: rgb(246, 246, 248);
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
</style>
