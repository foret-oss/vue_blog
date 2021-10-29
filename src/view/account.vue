<template>
  <div>
      <div class="accountSafe">
          <img src="../assets/accountSafe.png" class="userImg" alt="小熊图案" />
      </div>
    

    <div v-show="(hasLogin = true)" class="user_box">
        <p class="setting">账号设置</p>
        <el-row>
        <el-col>
            <div class="grid-content bg-purple-light">
                密码：{{this.form.password}}
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <div class="grid-content bg-purple-light">
                手机：{{this.form.phoneNumber}}
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <div class="grid-content bg-purple-light">
                邮箱：{{this.form.email}}
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <div class="grid-content bg-purple-light">
                三方账号：{{this.form.otherAccount}}
            </div>
        </el-col>
    </el-row>

    </div>
  </div>
</template>

<script>
export default {
  name: "changeMessage.vue",
  data() {
    return {
      form: {
        password: "111111",
        phoneNumber: "13398822784",
        email:"3313696160@qq.com",
        otherAccount: "未填写",
      },
      username: "尚未登陆",
      hasLogin: false,
    };
  },
  methods: {
    onSubmit() {
      window.sessionStorage.setItem('user', JSON.stringify(this.form))
      this.$message.success("保存成功!");
      this.$router.push("/message");
    },
  },
  created() {
    if (window.sessionStorage.getItem("username")) {
      this.username = window.sessionStorage.getItem("username");
      if (window.sessionStorage.getItem("avatar"))
        this.user.avatar = window.sessionStorage.getItem("avatar");
      this.hasLogin = true;
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  background: rgb(235, 237, 238);
  margin-left: 20px;
  margin-top: -10px;
  border-radius: 5px;
  height: 100px;
  max-width: 1400px;
}

.accountSafe {
  max-width: 1070px;
  min-height: 100px;
  margin-left: 20px;
}
.accountSafe > .userImg {
  width: 100%;
  height: 100%;
}
.setting{
    font-size: 20px;
    padding-left: 20px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
}
.el-row {
    margin-bottom: 10px;
    margin-top: -5px;
    margin-left: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
   .bg-purple-light {
    background:  #f2f2f2;
    padding-left: 10px;
    padding-top: 10px;
  }
   .grid-content {
    border-radius: 4px;
    min-height: 36px;
    font-size: 15px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
</style>