<template>
  <div>
    <el-row>
        <el-col>
            <div class="grid-content bg-purple-light">
                昵称：{{this.username}}
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <div class="grid-content bg-purple-light">
                真实姓名：{{this.user.name}}
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <div class="grid-content bg-purple-light">
                出生日期：{{this.user.birthday}}
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <div class="grid-content bg-purple-light">
                性别：{{this.user.gender}}
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col>
            <div class="grid-content bg-purple-light">
                个人简介：{{this.user.desc}}
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: "message.vue",
    data(){
        return {
            username:'',
            user:{
            }
        }
    },
    created(){
     if (window.sessionStorage.getItem("username")) 
     {
      this.username = window.sessionStorage.getItem("username");
      if(window.sessionStorage.getItem('user'))
      {
          this.user = JSON.parse(window.sessionStorage.getItem('user'));
          var date = this.user.birthday.substring(0, 10);
          this.user.birthday = date;
      }
    }
    }


}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 20px;
    margin-left: 20px;
    margin-top: -5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
   .bg-purple-light {
    background: rgb(235, 237, 238);
    padding-left: 10px;
    padding-top: 10px;
  }
   .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>