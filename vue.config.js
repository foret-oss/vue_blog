module.exports = {
    publicPath:'./',


    //chainWebpack:采用链式编程的形式，来修改默认的webpack配置
    //configWebpack：通过操作对象的形式，来修改默认的webPack配置

    chainWebpack: config => {
        //发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')

            config.plugin('html').tap (args => {
                args[0].isProd = true;
                return args;
            })

            config.set('externals', {
            vue: 'vue',
            'vue-router': "VueRouter",
            axios: 'axios',
            }) 


        })

       
    
        //开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js') 

            config.plugin('html').tap (args => {
                args[0].isProd = false;
                return args;
            })

        })


    }
}