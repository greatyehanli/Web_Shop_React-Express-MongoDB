const router = require('express').Router()
// controllers 来操控我们的db里面的数据, controller就是把本来我们应该写在routes的syntax给封装到了新的js文件= 模块化
//module.exports只能用require, export default可以用import的解构赋值
const {getAllProducts, getProductById} = require('../controller/productController')


router.get('/',(req, res)=>{
    console.log('进到server里面了/');
    //这个函数里面会res.json
    getAllProducts(req, res)
}) 
//需要的id在param :id里面已经有了, 不用传参
//这个函数本来接的参数就是req和res, 我们可以直接当回调用, 上面的方法的简化
.get('/:id',getProductById)


module.exports = router