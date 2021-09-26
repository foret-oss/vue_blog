<template>
  <div class="header">
    <div class="user">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div class="usename">{{ user.username }}</div>
    </div>
      <div class="block">
        <span @click="click3" :class="{page: page3}">首页</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="click2" :class="{page: page2}">编辑博客</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="click1" :class="{page: page1}">博客管理</span>
        <el-divider direction="vertical"></el-divider>
        <span v-show="! hasLogin" @click="login" :class="{page: page4}">登录</span>
        <span v-show="hasLogin" @click="GotoUser" :class="{page: page4}">个人中心</span>
      </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend ({
  name: "Header",
  data() {
    return {
      user: {
        username: '尚未登录',
        avatar: require("../assets/bear.jpg"),
      },
      hasLogin: false,
      page1: false,
      page2: false,
      page3: false,
      page4: false,
    };
  },
  methods :{
      click1(){
          this.$router.push("/blogs");
          this.page1 = true;
          this.page2 = false;
          this.page3 = false;
          console.log("page1",this.page1);
      },
      click2() {
          this.$router.push("/blogEdit");
          this.page2 = true;
          this.page1 = false;
          this.page3 = false;
          console.log("page2",this.page2);
      },
      click3() {
          this.$router.push("/blogDetail/"+ -1);
          this.page3 = true;
          this.page1 = false;
          this.page2 = false;
          console.log('page3,page1',this.page3,this.page1);
      },
      login(){
        this.$router.push("/login");
      },
      GotoUser(){
        this.$router.push("/myuser");
      },
      logout(){
          window.sessionStorage.clear();
          this.$router.push("/login");
      }
  },
  created() {
    if(window.sessionStorage.getItem('username')){
      this.user.username = window.sessionStorage.getItem('username');
      if(window.sessionStorage.getItem('avatar')) this.user.avatar = window.sessionStorage.getItem('avatar');
      this.hasLogin = true;
    }

    var path = this.$route.path;
    var id = this.$route.params.blogId;
    console.log("当前路径及ID",path, id);
    if(path == "/blogs" || id >= 0) {
      this.page1 = true;
      this.page2 = false;
      this.page3 = false;
    }
    else if(path == "/blogEdit" || id >= 0) {
      this.page2 = true;
      this.page1 = false;
      this.page3 = false;
    }
    else if(path == "/blogDetail/0" || id >= 0) {
      this.page3 = true;
      this.page1 = false;
      this.page2 = false;
    }
    else if(path == "/myuser" || id >= 0) {
      this.page4 = true;
      this.page1 = false;
      this.page2 = false;
    }
  }
});
</script>

<style scoped>
.block {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
  transform: translate(0,-55px);
}
.user{
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100px;
  padding-left: 20px;
}
.usename{
  display: flex;
  transform: translate(0px);
  text-align: left;
}
.page{
  font-weight: bolder;
}
</style>