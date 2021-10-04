<template>
    <div>
        <div class="detail">
                <h3 class="title">{{ blog.title }}</h3>

                <div class="markdown-body" v-html="blog.content"></div>
        </div>
        <p class="btn">
          <el-button plain @click="GoToblogs">查看更多文章</el-button>
        </p>
    </div>
</template>


<script>
export default {
    name: "lastblog.vue",
    data(){
        return {
            blog:
            {
                id: "",
                title: "请选择要查看的博客",
                content: "请选择要查看的博客",
            },

        }
    },

    methods:{
        GoToblogs() {
      this.$router.push("/blogs");
    },
    },


    created() {
    const blogId = this.$route.params.blogId;
    console.log("首页的id:", blogId);
    //首次点击进来展示的文章
    if (blogId == -1) {
      this.activeName = "first";
      this.$axios
        .get("/details/" + 14)
        .then((res) => {
          if (res.status == 200) {
            console.log("请求该篇成功，返回数据", res);
            const getBlog = res.data.data.fields;
            console.log("获取到的文章：", getBlog);
            this.blog.id = getBlog.id;
            this.blog.title = getBlog.title;
            var markdownIt = require("markdown-it");
            var md = new markdownIt();
            var result = md.render(getBlog.content);
            this.blog.content = result;
          } else console.log("没有请求到文章。", res);
        })
        .catch(function (err) {
          console.log("请求该篇文章失败", err);
        });
    } 
    

    //查看文章
    else {
      this.$axios
        .get("/details/" + Number(blogId))
        .then((res) => {
          if (res.status == 200) {
            console.log("请求该篇成功，返回数据", res);
            const getBlog = res.data.data.fields;
            console.log("获取到的文章：", getBlog);
            this.blog.id = getBlog.id;
            this.blog.title = getBlog.title;
            var markdownIt = require("markdown-it");
            var md = new markdownIt();
            var result = md.render(getBlog.content);
            this.blog.content = result;
          } else console.log("没有请求到文章。", res);
        })
        .catch(function (err) {
          console.log("请求该篇文章失败", err);
        });
    }

  },
}
</script>

<style scoped>
.title{
  text-align: center;
}
.detail {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .12), 2px 2px 6px rgba(0, 0, 0, .04);
  min-height: 400px;
  max-width: 1060px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 10px;
  margin-top: 230px;
}
.btn{
  text-align: center;
}
</style>