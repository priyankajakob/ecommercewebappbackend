const { Category } = require('../models/category')

module.exports.getCategoryById = (req,res,next,id)=>{
    Category.findById({_id:id})
    .then((category)=>{
        if(!category)
            return res.status(400).json({error:"No category found in DB"})
        req.collection = category
        next()
    })
    .catch((err)=>{
        res.status(400).json({error:"No category found"})
    })
}

module.exports.getCategory = (req,res)=>{
    res.json({category:req.collection})
}

module.exports.createCategory = (req,res)=>{
    const { body } = req

    const category = new Category(body)
    category.save()
    .then((category)=>{
        res.json(category)
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({error:err})
    })
}

module.exports.getAllCategories = (req,res)=>{
    Category.find()
    .then((categories)=>{
        if(!categories.length)
          return res.status(400).json({error:"No categories yet"})
        
        res.json({categories,signedInUser:req.signedInUser})
    })
    .catch((err)=>{
        res.status(400).json({error:"Error fetching catagories from DB"})
    })
}

module.exports.updateCategory = (req,res)=>{
    const { body } = req
    const { _id } = req.collection
    Category.findByIdAndUpdate({_id},{$set:body},{new:true,useFindAndModify:false})
    .then((category)=>{
        res.json(category)
    })
    .catch((err)=>{
        res.status(400).json({error:"Error updating category"})
    })
}

module.exports.deleteCategory = (req,res)=>{
    const { _id } = req.collection
    //we can remove category using category.remove also
    Category.findByIdAndDelete({_id})
    .then((category)=>{
        res.json({message : "Category deleted successfully"})
    })
    .catch((err)=>{
        res.status(400).json({error:"Error deleting category"})
    })
}