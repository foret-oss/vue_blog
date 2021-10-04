<template>
  <div>
    <Header></Header>
    <el-container class="container">
      <el-aside width="100px">
        <el-menu
          class="el-menu-vertical-demo"
          router
          :default-active="$router.path"
        >
          <el-submenu index="1">
            <template slot="title" >
              <i class="el-icon-user"></i>
              <span>个人资料</span>
            </template>
              <el-menu-item  index="/message">基本信息</el-menu-item>
              <el-menu-item  index="/changeMessage">修改资料</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>账号设置</span>
            </template>
              <el-menu-item  index="/account">账号信息</el-menu-item>
              <el-menu-item @click="logout" index="2-2">退出登录</el-menu-item>
          </el-submenu>

          <el-menu-item index="4" @click="gotoBlogs">
            <i class="el-icon-star-off"></i>
            <span slot="title">博客管理</span>
          </el-menu-item>
        </el-menu>

      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>


  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "myuser.vue",
  components: { Header },
  methods : {
    message(){
      this.$router.push('/message');
    },
    changeMessage(){
      this.$router.push('/changeMessage');
    },
    logout(){
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    account(){
      this.$router.push('/account');
    },
    gotoBlogs(){
      this.$router.push('/blogs');
    }
  },
};
</script>

<style scoped>
.el-menu-vertical-demo{
  position: fixed;
  padding-top: 10px;
}
.container{
  padding-top: 300px;
}
.el-menu{
  position: fixed;
}
.el-aside{
  margin-right: 15px;
}
.el-submenu .el-menu-item {
    min-width: 80px;
}
</style>