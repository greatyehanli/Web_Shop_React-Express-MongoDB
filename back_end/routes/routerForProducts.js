const router = require('express').Router()
const Product = require('../models/Product');
const auth = require('../middlewares/auth')
// controllers 来操控我们的db里面的数据, controller就是把本来我们应该写在routes的syntax给封装到了新的js文件= 模块化
//module.exports只能用require, export default可以用import的解构赋值
const {getAllProducts, getProductById} = require('../controller/productController')

// To add new Product - only seller can add
router.post('/product', auth, async (req,res)=>{
    const product =  new Product({
        ...req.body,
        owner: req.seller._id
    })
    try{
        await product.save();
        res.status(201).send(product);
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/',(req, res)=>{
    console.log('进到server里面了/');
    //这个函数里面会res.json
    getAllProducts(req, res)
}) 
//需要的id在param :id里面已经有了, 不用传参
//这个函数本来接的参数就是req和res, 我们可以直接当回调用, 上面的方法的简化
router.get('/:id',getProductById)

// Get Product by Id (Only by authorized seller)
router.get('/product/:id/seller', auth ,async (req, res) => {
    const _id = req.params.id;

    try{
        await Product.findOne({_id, owner: req.seller._id}, (err, returnedProduct)=>{
            if(err){
                console.log(err);
            }else{
                res.json(returnedProduct)
            }
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error'})
    }
})

// Update product info
router.patch('/product/:id',auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['productName','description', 'price', 'numberInStock'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if(!isValidOperation){
        res.status(400).send({error: 'Invalid Updates!'})
    }
    try{
        const product = await Product.findOne({_id: req.params.id, owner: req.seller._id})
        if(!product){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            product[update] = req.body[update]
        })
        await product.save()
        res.send(product);
    }catch(e){
        res.status(500).send(e);
    }
})

// Delete product
router.delete('/product/:id',auth, async (req, res) => {
    try{
        const product = await Product.findOneAndDelete({_id: req.params.id,owner: req.seller._id})
        if(!product){
            return res.status(404).send()
        }
        res.send(product)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router
