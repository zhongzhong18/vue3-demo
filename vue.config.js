module.exports = {
    publicPath: '/vue-demo',
    devServer:{
        overlay: {
            warnings: true,
            errors: true
          },
        open:true, //自动开启浏览器
        port:8000, //随便改端口号
        proxy: {
            '/api': {
              target: '<url>',
              ws: true,
              changeOrigin: true
            },
          }
    },
    lintOnSave:false,

}