<template>
  <div>
    <Header></Header>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <mavon-editor v-model="ruleForm.content"></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">发布博客</el-button>
        <el-button @click="saveDrafts">保存草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
export default {
  name: "BlogEdit.vue",
  components: { Header },
  data() {
    return {
      ruleForm: {
        title: "",
        content: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入博客标题", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      DraftsNum: 0,
    };
  },
  methods: {
    submitForm() {
      const blogId = this.$route.query.id;
      //若当前页面有ID，表示编辑更新文章
      if(blogId) {
        this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post("/update", {
              id: blogId,
              title: this.ruleForm.title,
              content: this.ruleForm.content,
            })
            .then((res) => {
              if(res.data.code == 200) {
                console.log("修改文章成功",res);
                this.$message.success("修改成功！");
                this.$router.push("/blogs");
              }
              else if(res.data.code == 451){
                this.$message.error("请重新登录！");
              }
            })
            .catch(function (err) {
              this.$message.error("修改失败！");
              console.log("请求修改文章失败", err);
          });
        } 
        else {
          this.$msb.alert("格式不正确！", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          });
          return false;
        }
      });
      }
      //若当前页面无id,表示正常发表文章
      else {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post("/publish", {
              title: this.ruleForm.title,
              content: this.ruleForm.content,
              username: window.sessionStorage.getItem("username"),
            })
            .then((res) => {
              if(res.data.code == 200) {
                console.log("发布文章成功",res);
                this.$message.success("发表成功！");
                this.$router.push("/blogs");
              }
              else if(res.data.code == 451){
                this.$message.error("请重新登录！");
              }
            })
            .catch(function (err) {
              this.$message.error("发布失败！");
              console.log("请求发布文章失败", err);
          });
        } 
        else {
          this.$message.error("格式不正确！");
        }
      });
      }
    },
    saveDrafts(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.DraftsNum ++ ;
          if(this.DraftsNum == 10) {
            this.$msb.alert("草稿箱已满，是否前去清理？","提示",{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
            }).then(() => {
              this.$router.push('/blogDetail' + 0)
              });
            }
            
            window.sessionStorage.setItem('Drafts',JSON.stringify(this.ruleForm));
            this.$message.success("保存成功！");
            this.$router.push('/blogDetail/'+0);
          }

          else {
            this.$message.error("格式不正确！");
          }

      })
    }
  },
  created() {
    const blogId = this.$route.query.id;
    console.log("编辑页面的id",blogId);
    if(blogId) {
      this.$axios
          .get("/details/"+ Number(blogId))
          .then((res) => {
            if(res.status == 200){
              console.log("请求该篇成功，返回数据", res);
              const getBlog = res.data.data.fields;
              console.log("获取到的文章：",getBlog);
              this.ruleForm.title = getBlog.title;
              this.ruleForm.content = getBlog.content;
            }
            else console.log("没有请求到文章。",res);
          })
          .catch(function (err) {
            console.log("请求该篇文章失败", err);
          });
    }
  }
};
</script>

<style scoped>
</style>