<template>
<div>
  <div class="avatarBackground">
    <div class="avatarbottom"></div>
        <div class="avatarBox" @click="login">
          <img src="../assets/bear.jpg" class="avatar">
       </div>
       <p class="username"> {{this.user.username}}</p>
  </div>
  
   
  <div class="header">
        <span @click="click3" :class="{page: page3}">首页</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="click2" :class="{page: page2}">编辑博客</span>
        <el-divider direction="vertical"></el-divider>
        <span @click="click1" :class="{page: page1}">博客管理</span>
        <el-divider direction="vertical"></el-divider>
        <span v-show="! hasLogin" @click="login" :class="{page: page4}">登录</span>
        <span v-show="hasLogin" @click="GotoUser" :class="{page: page4}">个人中心</span> 
  </div>
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
    console.log("当前路径及ID",path,id);
    //console.log("首页路径", "/lastblog/" + id );
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
    else if(path == "/lastblog/" + id  || path == "/drafts" || path == "/QandA") {
      console.log("首页路径",path);
      this.page3 = true;
      this.page1 = false;
      this.page2 = false;
    }
    else if(path == "/changeMessage" || path == "/message"|| path == "/account" || id >= 0) {
      this.page4 = true;
      this.page1 = false;
      this.page2 = false;
    }
  }
});
</script>

<style scoped>
.avatarBackground{
  position: fixed;
  display: flex;
  background:  rgb(31, 40, 49);
  min-height: 80px;
  min-width: 98%;
  text-align: center;
  justify-content: center;
}
.avatarBox {
  display: flex;
  width: 80px;
  height: 70px;
  transform: translate(0px, 40px);
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 5px #ddd;
  background-color: rgb(246, 246, 248);
  
}
.avatarBox > .avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.username{
  position: absolute;
  transform: translate(0px, 110px);
  font-size: 20px;
}

.header{
  display: flex;
  position: fixed;
  min-height: 50px;
  min-width: 98%;
  background: white;
  border-radius: 10px;
  padding-top: 18px;
  padding-left: 10px;
  padding-right: 10px;
  transform: translate(0px, 180px);
  font-size: 25px;
  font-family:'Times New Roman', Times, serif;
  text-align: center;
  justify-content: center;
}
.page{
  font-weight: bolder;
}
.avatarbottom{
  position: fixed;
  width: 100%;
  height: 110px;
  margin-top: 80px;
  background: #fff;
  top: 0;
}

</style>