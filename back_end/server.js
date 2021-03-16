//dotenv是一个包, 帮忙把(根目录, 在哪文件夹运行哪里就根目录no)里的.env里的值加载到环境变量process.env里面
require('dotenv').config({path: './.env'})
const express = require('express')
// const bodyParser = require('body-parser')
const connectDB = require('./config/db')
//const Mongoose = require('mongoose')
const productRouter = require('./routes/routerForProducts')
const authRouter = require('./routes/routerForAuth')
const protectedRouter = require('./routes/routerForProtected')
const sellerRouter = require('./routes/routerSeller')
const errorHandler = require('./middlewares/error')

//connect to db
connectDB()
const app = express()
const port = process.env.PORT || 5001

//代替了body parser把在body里的json数据变成object, req.body, 其实它还是基于body-parser的
app.use(express.json())

//注意了:: 在use里面第一个param加上部分path的话,这个部分的path就会自动加在这个route所有相应的routes的path前面,不管是get还是post routes
//app在这里就是campGroundRountes, commentsRountes, indexRountes的父级路由, 他们在use里面的path被叫做其逗号后面子路由的根路径/root path
//express提供的router方法(逻辑性更好), 用中间件把router文件module.exports返回的对象里面挂载的路由给merge到app里面
app.use('/to/product', productRouter)
app.use('/to/auth', authRouter)
app.use('/to/protected', protectedRouter)
app.use(sellerRouter)
// errorHandler should be put at the very end of all middlewares, 
//不然request在进入相应的route之前, 没错也会被返回个500就很伤
app.use(errorHandler)

const server = app.listen(port, ()=> console.log(`Running on ${port}`))

//terminate server precess when unhandledRejection occurs, 比如Mongo_URI不对,server没连上
process.on('unhandledRejection', (err, promise)=>{
    console.log(`unhandledRejection Error: ${err}`);
    server.close(()=> process.exit(1))
})