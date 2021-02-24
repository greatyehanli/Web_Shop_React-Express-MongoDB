//dotenv是一个包, 帮忙把(根目录, 在哪文件夹运行哪里就根目录no)里的.env里的值加载到环境变量process.env里面
require('dotenv').config()
const express = require('express')
// const bodyParser = require('body-parser')
const connectDB = require('./config/db')
//const Mongoose = require('mongoose')
const productRouter = require('./routes/routerForProducts')

connectDB()
const app = express()
const port = process.env.PORT || 5001

//代替了body parser把在body里的json数据变成object, req.body, 其实它还是基于body-parser的
app.use(express.json())

//注意了:: 在use里面第一个param加上部分path的话,这个部分的path就会自动加在这个route所有相应的routes的path前面,不管是get还是post routes
//app在这里就是campGroundRountes, commentsRountes, indexRountes的父级路由, 他们在use里面的path被叫做其逗号后面子路由的根路径/root path
//express提供的router方法(逻辑性更好), 用中间件把router文件module.exports返回的对象里面挂载的路由给merge到app里面
app.use('/to/product', productRouter)


app.listen(port, ()=> console.log(`Running on ${port}`))