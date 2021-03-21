const router = require('express').Router()
const Order = require('../models/order');
const {tokenValidation} = require('../middlewares/authorizationCheck')

router.get('/order', tokenValidation, async (req, res) => {
    try {
       await Order.find({user: req.user._id}, (err, returnedProducts)=>{
           if(err){
               console.log(err);
           }else{
               res.json(returnedProducts)
           }
       })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'HTTP-Internal Server Error'})
    }
})

router.post('/order', tokenValidation, async (req, res) => {
    console.log('req.body+++++', req.body);
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else {
        const order = new Order({
            ...req.body,
            user: req.user._id
        });
        const createdOrder = await order.save();
        res.status(201).send({ message: 'New Order Created', order: createdOrder });
    }
})

router.get('/order/:id', tokenValidation, async (req, res) => {
    const _id = req.params.id;

    try{
        const order = await Order.findOne({_id, user: req.user._id})
        if(!order){
            res.status(404).send()
        }
        res.send(order);
    }catch(e){
        res.status(500).send(e);   
    }
})

router.put('/order/:id/pay',tokenValidation, async (req, res) => {
    const order = await Order.findById({_id:req.params.id, user: req.user._id}).populate(
      'user',
      'email name'
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
})


router.delete('/order/:id', tokenValidation, async (req, res) => {
    try{
        const order = await Order.findOneAndDelete({_id: req.params.id,user: req.user._id});
        if(!order){
            return res.status(404).send({ message: 'Order Not Found' })
        }
        res.send(order)
    }catch(e){
        res.status(500).send(e)
    }
})

router.put('/:id/deliver',tokenValidation, async (req, res) => {
    const order = await Order.findOneAndDelete({_id: req.params.id,user: req.user._id})
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
})


module.exports = router;