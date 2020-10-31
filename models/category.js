const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        maxlength:35,
        required:[true,"name is required"]
    }
},
{
    timestamps:true
})

const Category = mongoose.model('Category',categorySchema)

module.exports={
    Category
}