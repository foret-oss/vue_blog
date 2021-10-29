<template>
  <div id="app">
    <!--路由占位符-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',


   mounted() {
        setTimeout(() => {
            window.L2Dwidget.init({
                pluginRootPath: 'live2dw/',
                pluginJsPath: 'lib/',
               
                pluginModelPath: 'live2d-widget-model-z16/assets/',
                tagMode: false,
                debug: false,
                model: { jsonPath: '../live2dw/live2d-widget-model-z16/assets/z16.model.json' },
                display: { position: 'right', width: 220, height: 320 },
                mobile: { show: true },
                log: false,

                dialog: {
                  enable: true,
                  script: {
                    //每20s，显示一言（调用一言Api返回的句子）
                    'every idle 20s': '$hitokoto$',
			              //触摸到class='star'对象
			               'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
			              //触摸到身体
			               'tap body': '害羞⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
			              //触摸到头部
			               'tap face': '~~'
              }
	}
            })
        }, 1000)
    },



}
</script>

<style>
#app{
  max-height: 960px;
  margin: 0 auto;
}
</style>
