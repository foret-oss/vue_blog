<template>
    <div>
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

        <div class="detail">
                <h1 class="title">{{ blog.title }}</h1>
                <el-link type="primary" class="edit" icon="el-icon-edit" @click="gotoEdit">
                  编辑
                </el-link>
                <div class="markdown-body" v-html="blog.content"></div>
                <p class="btn">
                  <el-button plain @click="GoToblogs">查看更多文章</el-button>
                </p>
        </div>
        
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
            lastBlog:'',
            lastId: '',
        }
    },

    methods:{
        GoToblogs() {
      this.$router.push("/blogs");
    },
    gotoEdit(){
      const blogId = this.blog.id;
      this.$router.push({ path: "/blogEdit", query: { id: blogId } });
    }
    },


    created() {
    const blogId = this.$route.params.blogId;
    console.log("首页的id:", blogId);

    

    //首次点击进来展示的文章
    if (blogId == -1) {

      this.$axios
      .get("/all")
      .then((res) => {
        if (res.status == 200) {
          console.log("获取到的所有文章：", res.data.data);
          var len = res.data.data.length;
          this.blog.id = res.data.data[Number(len) - 1].pk;
          this.blog.title = res.data.data[Number(len) - 1].fields.title;
          var markdownIt = require("markdown-it");
          var md = new markdownIt();
          var result = md.render(res.data.data[Number(len) - 1].fields.content);
          this.blog.content = result;
          
        } 
        
        else console.log("没有请求到所有文章。");
      })
      .catch(function (err) {
        console.log("请求所有文章失败", err);
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

<style lang="less" scoped>
.background{
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  margin-top: 250px;
}
.title{
  text-align: left;
  padding-bottom: 40px;
  box-shadow: 20px 20px 80px rgba(0, 0, 0, .12), 10px 20px 20px rgba(0, 0, 0, .04);
}
.detail {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, .12), 2px 2px 6px rgba(0, 0, 0, .04);
  min-height: 400px;
  max-width: 980px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 10px;
  margin-top: 230px;
}
.btn{
  text-align: center;
}
.edit{
  transform: translate(20px,-50px);
  
}
.el-icon-edit{
    padding-right: 10px;
  }
</style>