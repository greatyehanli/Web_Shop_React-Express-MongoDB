const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Product = require('../models/Product')

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,  
        required: true,
        minlength: 8,
        trim: true,
        validate(password){
            if(password.toLowerCase().includes('password')){
                throw new Error('Cannot contain word password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})
sellerSchema.virtual('products',{
    ref: 'Product',
    localField:'_id',
    foreignField:'owner'
})
sellerSchema.methods.toJSON = function (){
    const seller = this
    const sellerObject = seller.toObject()

    delete sellerObject.password
    delete sellerObject.tokens

    return sellerObject
}

sellerSchema.methods.generateAuthToken = async function (){
    const seller = this
    const token = jwt.sign({_id: seller._id.toString()}, 'thisismy newcourse')

    seller.tokens = seller.tokens.concat({token})

    await seller.save()
    return token;

}

sellerSchema.statics.findByCredentials = async (email, password)=>{
    const seller = await Seller.findOne({email})
    if(!seller){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, seller.password)

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return seller
}
// Hash the plain text password before saving
sellerSchema.pre('save', async function(next){
    const seller = this

    if(seller.isModified('password')){
        seller.password = await bcrypt.hash(seller.password, 8)
    }

    next()
})

// Delete seller product when seller is removed

sellerSchema.pre('remove', async function (next){
    const seller = this
    await Product.deleteMany({owner: seller._id})

    next()
})

const Seller = mongoose.model('Seller',sellerSchema)

module.exports = Seller;