const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:15
    },
    description:{
        type:String,
        trim:true,
        maxlength:50
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:true
    },
    stock:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo : {
        data:Buffer,
        contentType:String
    }
},{timestamp:true})

const Product = mongoose.model('Product',productSchema)

module.exports={
    Product
}