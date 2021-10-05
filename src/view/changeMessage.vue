<template>
  <div>
    <div class="header"></div>
    <div class="userAvatar">
      <img src="../assets/bear.jpg" class="userImg" alt="小熊图案" />
    </div>
    <div class="username">
      <span class="name">{{ this.username }}</span>
      <p class="time">码龄：1年</p>
    </div>

    <div v-show="(hasLogin = true)" class="user_box">
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="用户昵称">
          <el-input v-model="form.nicheng"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="出生日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.birthday"
              style="width: 100%"
            ></el-date-picker>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.gender" size="medium">
            <el-radio border label="男"></el-radio>
            <el-radio border label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="个人简介">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "changeMessage.vue",
  data() {
    return {
      form: {
        nicheng: "暂时不支持更改",
        name: "未填写",
        birthday: "",
        gender: "未填写",
        desc: "未填写",
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

<style scoped>
.header {
  background: rgb(235, 237, 238);
  margin-left: 20px;
  margin-top: -20px;
  margin-right: 50px;
  border-radius: 5px;
  height: 100px;
  max-width: 1400px;
}
.userAvatar {
  width: 70px;
  height: 70px;
  transform: translate(35%, -110%);
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 5px #ddd;
  background-color: rgb(246, 246, 248);
}
.userAvatar > .userImg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.username {
  width: 150px;
  height: 70px;
  transform: translate(80%, -200%);
  padding: 5px;
}
.name {
  font-size: 25px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.time {
  font-size: 15px;
  line-height: 5px;
}
.el-form{
    margin-top: -150px;
    margin-left: 20px;
    margin-right: 50px;
    background:rgb(235, 237, 238) ;
    padding: 10px;
    border-radius: 5px;
}
</style>