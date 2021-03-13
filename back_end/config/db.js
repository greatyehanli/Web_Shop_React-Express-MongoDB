//给process.env加自定义值
require('dotenv').config()
const mongoose = require('mongoose')

/*  async函数可能包含0个或者多个await表达式。await表达式会暂停整个async函数的执行进程并出让其控制权，
    只有当其等待的基于promise的异步操作被兑现或被拒绝之后才会恢复进程。promise的解决值会被当作该await表达式的返回值。
    使用async / await关键字就可以在异步代码中使用普通的try / catch代码块。
    https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
*/
const connectDB = async() =>{
    try{
        console.log('MongoDB connected successfully!');
        await mongoose.connect(process.env.MONGO_URI, {
            //mongoDB驱动程序
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        })
    }catch(err){
        console.log(err);
        process.exit(1)
    }

}

//expose this function out
module.exports = connectDB