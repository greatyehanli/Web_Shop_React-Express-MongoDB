const express = require('express');
const Seller = require('../models/seller');
const auth = require('../middlewares/auth');
const router = new express.Router();

// Register Seller
router.post('/seller', async (req, res)=>{
    const seller = new Seller(req.body);

    try{
        await  seller.save()
        // sendWelcomeEmail(seller.email, seller.name)
        const token = await seller.generateAuthToken()
        res.status(201).send({seller, token})
    }catch(e){
        res.status(400).send(e);
    }
})

// Login Seller
router.post('/seller/login', async (req, res) => {
    try {
        const seller = await Seller.findByCredentials(req.body.email, req.body.password)
        const token = await seller.generateAuthToken()
        res.send({seller, token})
    }catch(e){
        res.status(400).send(e)
    }
})
router.get('/seller', auth, async (req, res)=>{
    try{
        const seller = await Seller.find({})
        res.status(404).send(seller)
    }catch(e){
        res.status(500).send(e);
    }
})

// Logout Seller
router.post('/seller/logout', auth , async (req, res)=>{
    try{
        req.seller.tokens = req.seller.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.seller.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/seller/me', auth, async (req, res)=>{
    res.send(req.seller);
})

// update
router.patch('/seller/me', auth,async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        updates.forEach((update)=>{
            req.seller[update]= req.body[update]
        })
        await req.seller.save()

        res.send(req.seller);
    }catch(e){
        res.status(400).send(e);
    }
})

// delete

router.delete('/seller/me',auth, async (req, res)=>{
    try{
        await req.seller.remove()
        sendCancelationEmail(req.seller.email, req.seller.name)
        res.send(req.seller)
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router