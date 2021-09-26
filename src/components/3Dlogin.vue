<template>
  <div class="entrance">
    <div class="content">
      <div
        class="box"
        :class="{ hasClick: hasClick, hasClickOff: !hasClick && goBack }"
      >
          <div class="shuru">
            <div>
              <input
                v-model="formData.name"
                type="text"
                placeholder="请输入姓名"
              />
            </div>
            <div>
              <input
                v-model="formData.password"
                type="text"
                placeholder="请输入密码"
              />
            </div>
          </div>
        <div class="foot">
          <p class="goin" @click="goIn()">登录</p>
        </div>
      </div>
      <div
        class="authen"
        :class="{ appear: hasClick, appearOff: !hasClick && goBack }"
      >
        <div class="circle">
          <div class="bg"></div>
        </div>
        <p class="zi">认证中...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "entrance",
  data() {
    return {
      hasClick: false,
      goBack: false,
      formData: {
        name: "",
        password: "",
      },
    };
  },
  components: {},
  methods: {
    goIn() {
      this.hasClick = true;
      if (this.formData.name != "" && this.formData.password != "") {
        this.$router.push("/blogs");
      } else {
        setTimeout(() => {
          this.$msb
            .alert("请输入用户名和密码！", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              showCancelButton: false,
              type: "warning",
            })
            .then(() => {
              this.hasClick = false;
              this.goBack = true;
            });
        }, 1500);
      }
    },
  },
};
</script>

<style scoped>
.entrance {
  width: 100%;
  height: 100%;
  background: url('../assets/star.png');
  background-size: 100% 100%;
  overflow: hidden;
}
.content {
  width: calc(100% - 30px);
  height: 300px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 800;
  -webkit-perspective: 800;
  position: relative;
  box-shadow: -15px 15px 15px rgb(6 17 47 / 70%);
  transition: all 1s;
}
.hasClick {
  animation: animal1 1s linear 1 forwards;
  pointer-events: none;
}
.hasClickOff {
  animation: animal11 1s linear 1 forwards;
  pointer-events: auto;
}
input {
  width: 80px;
  height: r(35);
  margin-top: -2px;
  background: rgba(57, 61, 82, 0);
  left: 0;
  padding: 2px 5px;
  border-top: 2px solid rgba(57, 61, 82, 0);
  border-bottom: 2px solid rgba(57, 61, 82, 0);
  border-right: none;
  border-left: none;
  outline: none;
  font-family: "Microsoft Yahei", sans-serif;
  box-shadow: none;
  color: #61bfff !important;
}
.icon img {
  width: r(26);
  height: r(26);
}
.goin {
  width: r(200);
  height: r(40);
  margin-top: r(50);
  line-height: r(40);
  border-radius: r(25);
  background: transparent;
  border: 2px solid #4fa1d9;
  color: #4fa1d9;
  text-align: center;
  font-size: r(20);
  cursor: pointer;
}

.shuru {
  width: 300px;
  height: r(75);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  color: #fff;
}
.foot {
  width: 100%;
  height: r(50);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: r(10);
}
.box {
  width: r(360);
  height: 140px;
  background: linear-gradient(
    230deg,
   rgb(66, 66, 66) 30%,
    rgb(19, 18, 18) 100%
  );
}
.authen {
  width: 240px;
  height: 120px;
  position: absolute;
  z-index: inherit;
  top: 55%;
  left: 50%;
  margin-left: -100px;
  background: linear-gradient(
    230deg,
    rgba(233, 234, 238, 0) 0%,
    rgb(0, 0, 0) 100%
  );
  box-shadow: -15px 15px 15px rgb(6 17 47 / 70%);
  transition: all 1s;
  transform: scale(0);
}
.appear {
  animation: animal2 1s linear 1 forwards;
}
.appearOff {
  animation: animal22 1s linear 1 forwards;
}
.circle {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.bg {
  width: 50px;
  height: 50px;
  background:rgb(6, 68, 77);
  background-size: 100% 100%;
  animation: animal 1s infinite linear;
}
.zi {
  font-size: r(20);
  color: #fff;
  text-align: center;
  line-height: 40px;
}
@keyframes animal {
  0% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  100% {
    transform: rotate(-270deg);
    -ms-transform: rotate(-270deg);
    -webkit-transform: rotate(-270deg);
  }
}
@keyframes animal1 {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(70deg);
    transform-origin: center bottom;
  }
  100% {
    transform: rotateX(70deg) translateX(-200px) scale(0.8);
    transform-origin: center bottom;
  }
}
@keyframes animal11 {
  0% {
    transform: rotateX(70deg) translateX(-200px) scale(0.8);
    transform-origin: center bottom;
  }
  50% {
    transform: rotateX(0deg);
    transform-origin: center bottom;
  }
  100% {
    transform: rotateX(0deg) translateX(0) scale(1);
    transform-origin: center bottom;
  }
}
@keyframes animal2 {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1) translateX(100px);
  }
}
@keyframes animal22 {
  0% {
    transform: scale(1) translateX(100px);
  }
  50% {
    transform: scale(1) translateX(0);
  }
  100% {
    transform: scale(0) translateX(0);
  }
}
</style>