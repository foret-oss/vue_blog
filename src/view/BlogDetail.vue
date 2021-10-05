<template>
  <div>
    <Header></Header>

    <vue-particles
      class="background"
      color="#B7AACB"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="star"
      :particleSize="8"
      linesColor="#077ABD"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.5"
      :linesDistance="100"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="repulse"
    >
</vue-particles>

    <el-container>
      <div class="totolBlogs">
        <img class="totalImg" src="../assets/alltotal.png" width="35px" height="35px">
        文章总数-  {{this.allBlogs}}
      </div>
      <el-aside width="330px">
        <el-menu router :default-active="$router.path" class="el-menu-vertical-demo">
          <el-menu-item index="/lastblog/-1" >
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>最近文章</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/blogs" >
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>文章列表</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/drafts" >
            <template slot="title">
              <i class="el-icon-takeaway-box"></i>
              <span>草稿箱</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/QandA">
            <i class="el-icon-setting"></i>
            <span slot="title">问答</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
   </el-container>

  </div>
</template>

<script>
import Header from "../components/Header.vue";
import "github-markdown-css";
export default {
  name: "BlogDetail.vue",
  components: { Header },
  data() {
    return {
      blog: {
        id: "",
        title: "请选择要查看的博客",
        content: "请选择要查看的博客",
      },
      blogs: [],
      activeName: "first",
      hasLogin: false,
      id: '-1',
      allBlogs: '',
    };
  },

  methods: {
    details(index) {
      const blogId = this.blogs[index].fields.id;
      this.$router.push("/blogDetail/" + blogId);
    },

  },

  created() {
    const blogId = this.$route.params.blogId;
    this.id = blogId;

    console.log("详情页的blogId:", blogId);


    this.$axios
      .get("/all")
      .then((res) => {
        if (res.status == 200) {
          this.blogs = res.data.data;
          console.log("获取到的所有文章：", this.blogs);
          for (var i = 0; i < this.blogs.length; i++) {
            var createTime = this.blogs[i].fields.created_time;
            var lastUpdatedTime = this.blogs[i].fields.last_updated_time;
            var content = this.blogs[i].fields.content;
            createTime = createTime.substring(0, 10) + "  " + createTime.substring(11, 19);
            lastUpdatedTime =
              lastUpdatedTime.substring(0, 10) +
              " " +
              lastUpdatedTime.substring(11, 19);
            content = content.substring(0, 10);
            this.blogs[i].fields.created_time = createTime;
            this.blogs[i].fields.last_updated_time = lastUpdatedTime;
            this.blogs[i].content = content;
            this.allBlogs = this.blogs.length;
          }
        } else console.log("没有请求到文章。");
      })
      .catch(function (err) {
        console.log("请求所有文章失败", err);
      });


  },
};
</script>

<style scoped>
.background{
  width: 100%;
  height: 100%;
  position: absolute;
  margin-top: 260px;
}
.totolBlogs{
  display: flex;
  position: fixed;
  margin-top: 330px;
  margin-left: 10px;
  border: 1px black;
  font-size: 20px;
  font-family:Arial, Helvetica, sans-serif;
  width: 290px;
  height: 80px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .12), 2px 2px 6px rgba(0, 0, 0, .04);
}
.totalImg{
  padding-right: 5px;
  transform: translate(0,-2px);
}
.el-tabs {
  padding-left: 100px;
  width: 90%;
}
.main{
  padding-top: 60px;
}
.el-menu{
  position: fixed;
  width: 300px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .12), 2px 2px 6px rgba(0, 0, 0, .04);
}
.el-aside{
   margin-top: 450px;
}
</style>