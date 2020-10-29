const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        maxlength:12,
        require:[true,"name is required"]
    }
},
{
    timestamp:true
})

const Category = mongoose.model('Category',categorySchema)

module.exports={
    Category
}