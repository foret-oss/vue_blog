<template>
  <div>
    <Header></Header>
    <el-container>
      <el-aside width="150px">
        <el-menu router :default-active="$router.path" class="el-menu-vertical-demo">
          <el-menu-item index="/lastblog/-1" >
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>最近文章</span>
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
      Drafts: JSON.parse(window.sessionStorage.getItem("Drafts")),
      blogs: [],
      activeName: "first",
      hasLogin: false,
      id: '-1',
    };
  },

  methods: {
    details(index) {
      const blogId = this.blogs[index].fields.id;
      this.$router.push("/blogDetail/" + blogId);
    },
    
    lastblog(){
      const blogId = this.$route.params.blogId;
      this.$router.push('/lastblog/'+ blogId);
    },
    drafs(){
      const blogId = this.$route.params.blogId;
      this.$router.push('/drafts/'+blogId);
    }
  },

  created() {
    const blogId = this.$route.params.blogId;
    this.id = blogId;

    console.log("详情页的blogId:", blogId);
    // if (blogId == -1) {
    //   //this.activeName = 'second';
    //   this.activeName = "first";
    //   this.$axios
    //     .get("/details/" + 14)
    //     .then((res) => {
    //       if (res.status == 200) {
    //         console.log("请求该篇成功，返回数据", res);
    //         const getBlog = res.data.data.fields;
    //         console.log("获取到的文章：", getBlog);
    //         this.blog.id = getBlog.id;
    //         this.blog.title = getBlog.title;
    //         var markdownIt = require("markdown-it");
    //         var md = new markdownIt();
    //         var result = md.render(getBlog.content);
    //         this.blog.content = result;
    //       } else console.log("没有请求到文章。", res);
    //     })
    //     .catch(function (err) {
    //       console.log("请求该篇文章失败", err);
    //     });
    // } 


    // //草稿箱
    // else if (blogId == 0) {
    //   this.$axios
    //     .get("/details/" + 14)
    //     .then((res) => {
    //       if (res.status == 200) {
    //         console.log("请求该篇成功，返回数据", res);
    //         const getBlog = res.data.data.fields;
    //         console.log("获取到的文章：", getBlog);
    //         this.blog.id = getBlog.id;
    //         this.blog.title = getBlog.title;
    //         var markdownIt = require("markdown-it");
    //         var md = new markdownIt();
    //         var result = md.render(getBlog.content);
    //         this.blog.content = result;
    //       } else console.log("没有请求到文章。", res);
    //     })
    //     .catch(function (err) {
    //       console.log("请求该篇文章失败", err);
    //     });
    // } 
    
    
    // else {

    //   this.$axios
    //     .get("/details/" + Number(blogId))
    //     .then((res) => {
    //       if (res.status == 200) {
    //         console.log("请求该篇成功，返回数据", res);
    //         const getBlog = res.data.data.fields;
    //         console.log("获取到的文章：", getBlog);
    //         this.blog.id = getBlog.id;
    //         this.blog.title = getBlog.title;
    //         var markdownIt = require("markdown-it");
    //         var md = new markdownIt();
    //         var result = md.render(getBlog.content);
    //         this.blog.content = result;
    //       } else console.log("没有请求到文章。", res);
    //     })
    //     .catch(function (err) {
    //       console.log("请求该篇文章失败", err);
    //     });
    // }

    // var markdown_It = require("markdown-it");
    // var md = new markdown_It();
    // var result = md.render(this.Drafts.content);
    // this.Drafts.content = result;

    // this.$axios
    //   .get("/all")
    //   .then((res) => {
    //     if (res.status == 200) {
    //       console.log("请求所有文章成功，返回数据", res);
    //       this.blogs = res.data.data;
    //       console.log("获取到的文章：", this.blogs);
    //       for (var i = 0; i < this.blogs.length; i++) {
    //         var createTime = this.blogs[i].fields.created_time;
    //         var lastUpdatedTime = this.blogs[i].fields.last_updated_time;
    //         var content = this.blogs[i].fields.content;
    //         createTime =
    //           createTime.substring(0, 10) + "  " + createTime.substring(11, 19);
    //         lastUpdatedTime =
    //           lastUpdatedTime.substring(0, 10) +
    //           " " +
    //           lastUpdatedTime.substring(11, 19);
    //         content = content.substring(0, 10);
    //         this.blogs[i].fields.created_time = createTime;
    //         this.blogs[i].fields.last_updated_time = lastUpdatedTime;
    //         this.blogs[i].content = content;
    //       }
    //     } else console.log("没有请求到文章。");
    //   })
    //   .catch(function (err) {
    //     console.log("请求所有文章失败", err);
    //   });
  },
};
</script>

<style scoped>
.el-tabs {
  padding-left: 100px;
  width: 90%;
}
.main{
  padding-top: 60px;
}
.el-menu{
  position: fixed;
 
}
.el-aside{
   margin-top: 300px;
}
</style>