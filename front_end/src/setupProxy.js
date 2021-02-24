const {createProxyMiddleware} = require('http-proxy-middleware')

//此文件是脚手架自动运行的, 不能改名

/*
 * 方法2:
 * 
 * 使用proxy中间件
 *
 * 所有发出去的请求都要经过这个中间件来处理, 如果域名后的url后面带有/toDomain1 or /toDomain2
 * 那么就往target 发送requests
 * 
 * changeOrigin: true说的是把request里面的头里的host属性改成服务器的domain, 
 * 这样可以避免万一服务器有相应的配置的话会拒绝我们的request
 * 
 * pathRewrite 是用正则表达式来匹配toDomain1/2, 然后在真正发送请求的时候可以把toDomain1/2替换成'', 要不服务器不认
 *  
 */

 /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000, 骗server说这个请求是你自己的域内发的
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
 */

 module.exports = function(app){

    //前端的发请求的中间件, 也用app做应用代指
    //这严格意义上就是中间件帮忙转发request欺骗Ajax引擎说没跨域, 中间件代理
    app.use(
        createProxyMiddleware('/toBackendServer', {
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: {'^/toBackendServer': ''}
        })

    )

 }