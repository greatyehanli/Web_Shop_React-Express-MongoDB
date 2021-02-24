const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
        productName:{
            type: String,
            required: true
        },

        description:{
            type: String,
            required: true
        },

        price:{
            type: Number,
            required: true
        },

        numberInStock:{
            type: Number,
            required: true
        },

        imgURL:{
            type: String,
            required: true
        }
})

module.exports = new mongoose.model('product', productSchema)