<template>
  <div>
    <Header></Header>
    <div class="block">
      <el-timeline>
        <div v-for="(blog, index) in this.blogs" :key="index">
          <el-timeline-item
            :timestamp="blog.fields.created_time"
            placement="top"
          >
            <el-card>
              <h3 @click="details(index)" class="title">
                {{ blog.fields.title }}
              </h3>
              <p class="updateTime">
                {{ blog.fields.username }} 最近一次更新于
                {{ blog.fields.last_updated_time }}
              </p>
              <div class="icon">
                <el-link
                  icon="el-icon-edit el-icon--right"
                  v-show="hasLogin"
                  @click="update(index)"
                  >编辑
                </el-link>
                <el-link
                  icon="el-icon-view el-icon--right"
                  @click="details(index)"
                  >查看</el-link
                >
                <el-link
                  icon="el-icon-delete el-icon--right"
                  v-show="hasLogin"
                  @click="deleteBlog(index)"
                  >删除</el-link
                >
              </div>
            </el-card>
          </el-timeline-item>
        </div>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "Blogs.vue",
  components: { Header },
  data() {
    return {
      blogs: [],
      hasLogin: false,
    };
  },
  methods: {
    details(index) {
      //console.log("id",this.blogs[index].fields.id);
      const blogId = this.blogs[index].fields.id;
      this.$router.push("/blogDetail/" + blogId);
    },

    update(index) {
      const blogId = this.blogs[index].fields.id;
      this.$router.push({ path: "/blogEdit", query: { id: blogId } });
    },

    deleteBlog(index) {
      const blogId = this.blogs[index].fields.id;
      this.$axios.post("/remove", { id: blogId }).then((res) => {
        console.log("请求删除文章：",res);
        if (res.data.code == 451) 
        {
          this.$message.error("请重新登录！");
        } 
        if (res.data.code == 457) 
        {
          this.$message.error("文章不存在！");
        } 
        else if (res.data.code == 200) 
        {
          this.$msb.alert("删除成功！", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "info",
                })
              .then(() => {
      this.$axios
      .get("/all")
      .then((res) => {
        if (res.status == 200) {
          console.log("请求所有文章成功，返回数据", res);
          this.blogs = res.data.data;
          console.log("获取到的文章：", this.blogs);
          for (var i = 0; i < this.blogs.length; i++) {
            var createTime = this.blogs[i].fields.created_time;
            var lastUpdatedTime = this.blogs[i].fields.last_updated_time;
            var content = this.blogs[i].fields.content;
            createTime =
              createTime.substring(0, 10) + "  " + createTime.substring(11, 19);
            lastUpdatedTime =
              lastUpdatedTime.substring(0, 10) +
              " " +
              lastUpdatedTime.substring(11, 19);
            content = content.substring(0, 10);
            this.blogs[i].fields.created_time = createTime;
            this.blogs[i].fields.last_updated_time = lastUpdatedTime;
            this.blogs[i].content = content;
          }
        } else console.log("没有请求到文章。");
      })
      .catch(function (err) {
        console.log("请求所有文章失败", err);
      });
              })
              .catch(() => {})
        }
      }).catch(function (err) {
              this.$message.error("删除失败！");
              console.log("请求删除文章失败", err);
      });
  }
},
  created() {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      this.hasLogin = true;
    }
    this.$axios
      .get("/all")
      .then((res) => {
        if (res.status == 200) {
          console.log("请求所有文章成功，返回数据", res);
          this.blogs = res.data.data;
          console.log("获取到的文章：", this.blogs);
          for (var i = 0; i < this.blogs.length; i++) {
            var createTime = this.blogs[i].fields.created_time;
            var lastUpdatedTime = this.blogs[i].fields.last_updated_time;
            var content = this.blogs[i].fields.content;
            createTime =
              createTime.substring(0, 10) + "  " + createTime.substring(11, 19);
            lastUpdatedTime =
              lastUpdatedTime.substring(0, 10) +
              " " +
              lastUpdatedTime.substring(11, 19);
            content = content.substring(0, 10);
            this.blogs[i].fields.created_time = createTime;
            this.blogs[i].fields.last_updated_time = lastUpdatedTime;
            this.blogs[i].content = content;
          }
        } else console.log("没有请求到文章。");
      })
      .catch(function (err) {
        console.log("请求所有文章失败", err);
      })
  }
  }
</script>

<style scoped>
.block {
  padding-left: 10px;
  padding-right: 50px;
}
.el-card {
  background: rgb(241, 241, 243);
}

.title {
  font-size: 25px;
}
</style>