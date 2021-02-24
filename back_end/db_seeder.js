require('dotenv').config()
// const mongoose = require('mongoose')

const productData = require('./data/productData')
const connectDB = require('./config/db')

//require models for managing corresponding collections
const Product = require('./models/Product')

//这个方法使用mongoose来connect过了, 只要再当前文件进行过connect操作, 那么model就直接可以用了, 不报错默认连接数据库成功
connectDB()

function waitThreeSec(){
    setTimeout(()=>{
        console.log("wwwhiuadhuoasdhos");
    }, 3)
}

const seedProductDB = async() =>{
    try{
        await Product.deleteMany()
        //这个await返回的不是promise对象, 它根本不会等, 先打印下面的然后才打印这个function里面的console.log()
        /*
            OUTPUT:
                Middle!!!!!!
                wwwhiuadhuoasdhos
                End!!!!!!
        */
        // await waitThreeSec()
        // console.log("Middle!!!!!!")
        await Product.insertMany(productData)
        console.log("Seeding Product Succeeded!!!!!!")
        process.exit()
    }catch(err){
        console.log("error occured during seeding", err);
        //1=err
        process.exit(1)
    }
}

seedProductDB()