const Product = require('../models/Product')

//我们在controller里面只定义了一些得到db数据的函数
const getAllProducts = async (req, res)=>{
    try {
        //find() 方法以非结构化的方式来显示所有文档, 默认参数是{}=查找所以返回文档
        //find(query, projections)
       const products = await Product.find({}, (err, returnedProducts)=>{
           if(err){
               console.log(err);
           }else{
               //return results in json format, no difference with send when param is {} or []
               //https://blog.fullstacktraining.com/res-json-vs-res-send-vs-res-end-in-express/
               res.json(returnedProducts)
           }
       })
    } catch (error) {
        console.log(error);
        //gives a status message
        //这里是链式调用, 本来应该是res.status, res.json
        res.status(500).json({message: 'HTTP-Internal Server Error'})
    }
}

const getProductById = async (req, res)=>{
    try {
       const products = await Product.findById(req.params.id, (err, returnedProduct)=>{
            if(err){
                console.log(err);
            }else{
                res.json(returnedProduct)
            }
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error.'})
    }
}

module.exports = {
    getAllProducts,
    getProductById
}
