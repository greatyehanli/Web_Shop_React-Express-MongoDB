//dotenv是一个包, 帮忙把(根目录, 在哪文件夹运行哪里就根目录no)里的.env里的值加载到环境变量process.env里面
require('dotenv').config({path: './.env'})
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
// const bodyParser = require('body-parser')
const connectDB = require('./config/db')
//const Mongoose = require('mongoose')
const productRouter = require('./routes/routerForProducts')
const authRouter = require('./routes/routerForAuth')
const protectedRouter = require('./routes/routerForProtected')
const sellerRouter = require('./routes/routerSeller')
const chatRouter = require('./routes/routerForChatting.js')
const orderRouter = require('./routes/routerForOrder')
const errorHandler = require('./middlewares/error')

const {addUser, removeUser, getUsersInRoom, getUser} = require('./utils/userForChatting')

//connect to db
connectDB()
const app = express()
const port = process.env.PORT || 5001
//wrap express server in http server to use socket.io
const expressInHttpServer = http.createServer(app)

//代替了body parser把在body里的json数据变成object, req.body, 其实它还是基于body-parser的
app.use(express.json())

//注意了:: 在use里面第一个param加上部分path的话,这个部分的path就会自动加在这个route所有相应的routes的path前面,不管是get还是post routes
//app在这里就是campGroundRountes, commentsRountes, indexRountes的父级路由, 他们在use里面的path被叫做其逗号后面子路由的根路径/root path
//express提供的router方法(逻辑性更好), 用中间件把router文件module.exports返回的对象里面挂载的路由给merge到app里面
app.use('/to/product', productRouter)
app.use('/to/chat', chatRouter)
app.use('/to/auth', authRouter)
app.use('/to/protected', protectedRouter)
app.use(sellerRouter)
app.use(orderRouter)
// errorHandler should be put at the very end of all middlewares, 
//不然request在进入相应的route之前, 没错也会被返回个500就很伤
app.use(errorHandler)

const io = socketIo(expressInHttpServer)
io.on('connection', (socket)=>{
    //callback to handle error, if error happens, 这个callback函数是我们在前端emit的函数里面定义的, 
    //我们在这个on join里面给我们前端定义的函数传递参数, 从而达到error处理的状态
    socket.on('join', ({name, room}, callback)=>{

        const {error, user} = addUser({id: socket.id, name, room})

        if(error) return callback(error)
        socket.emit('message', {user:'admin', text:`${user.name}, Welcom to join the chatting room, ${user.room}`})
        //往user.room这个代号的房间里面发送广播信息, 里面所有的user都能看到.写在join前说明, 在这个user join之前给别人看
        //这个user本身并看不到, 因为还没有join
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text:`${user.name}, has joined`})
        socket.join(user.room)

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        //好像是callback必须得写, 这边写上去, 没错的话也无事发生
        callback()
    })

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user:user.name, text: message})
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback()
    })

    // 这里面的监听值也是固定的, 必须是disconnect, 不能是disconnection
    socket.on('disconnect', ()=>{
        //我们其实只是让socket的id分给了user当id而已
        const deletedUser = removeUser(socket.id) //splice成功的话肯定会返回个true的值
        console.log("deletedUser<<<<<:", deletedUser);

        if(deletedUser){
            io.to(deletedUser.room).emit('message', {user:'admin', text: `${deletedUser.name} has left room`})
        }
    })
})

const server = expressInHttpServer.listen(port, ()=> console.log(`Running on ${port}`))

//terminate server precess when unhandledRejection occurs, 比如Mongo_URI不对,server没连上
process.on('unhandledRejection', (err, promise)=>{
    console.log(`unhandledRejection Error: ${err}`);
    server.close(()=> process.exit(1))
})