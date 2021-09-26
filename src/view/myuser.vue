<template>
  <div>
    <Header></Header>
    <div>
      <el-col :span="10">
        <el-menu
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title" >
              <i class="el-icon-location"></i>
              <span>个人资料</span>
            </template>

              <el-menu-item  @click="message" index="1-1">基本信息</el-menu-item>
              <el-menu-item index="1-2">修改资料</el-menu-item>

          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>账号设置</span>
            </template>

              <el-menu-item @click="account" index="2-1">账号信息</el-menu-item>
              <el-menu-item @click="logout" index="2-2">退出登录</el-menu-item>

          </el-submenu>

          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">博客管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
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
    logout(){
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    account(){
      this.$router.push('/account');
    }
  },
};
</script>

<style scoped>
.el-menu-vertical-demo{
  position: fixed;
  padding-top: 10px;
}
</style>