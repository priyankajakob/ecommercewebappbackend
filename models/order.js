const mongoose = require('mongoose')

const productCartSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product'
    },
    name:String,
    count:Number,
    price:Number
})

const orderSchema = new mongoose.Schema({
    products:[productCartSchema],
    transaction_id:{},
    amount:{
        type:Number
    },
    address:String,
    updated:Date,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

},{timestamps:true})

const Order = mongoose.model('Order',orderSchema)
const ProductCart = mongoose.model('ProductCart',productCartSchema)

module.exports={Order,ProductCart}

