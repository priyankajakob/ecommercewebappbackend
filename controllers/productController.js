const { Product } = require('../models/product')
const formidable = require("formidable")
const _ = require('lodash')
const fs = require('fs')

module.exports.getProductById = (req,res,next,id)=>{
    Product.findById(id).populate("category")
    .then((prod)=>{
        if(!prod)
            return res.status(400).json({error:"Product not found in DB"})
        
        req.product = prod
        next()
    })
    .catch((err)=>{
        res.status(400).json({error:"Product not found in DB",details:err})
    })
}

module.exports.getProduct = (req,res)=>{
    req.product.photo = undefined
    res.json({product : req.product})
}

module.exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? Number(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find().select("-photo").populate("category").sort([[sortBy,"desc"]]).limit(limit)
    .then((products)=>{
        if(!products.length)
            return res.status(400).json({error:"No products yet"})
        
        res.json({products})
    })
    .catch((err)=>{
        // console.log(err)
        res.status(400).json({error:"Error fetching categories from DB",details:err})
    })
}

module.exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category",{})
    .then((categories)=>{
        res.json({categories})
    })
    .catch((err)=>{
        res.status(400).json({error:"No unique categories found"})
    })
}

module.exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true

    form.parse(req,(err,fields,file)=>{
        if(err)
        {
            // console.log(err)
            return res.status(400).json({
                error:"problem with image"
            })
        }
       
        //destructure the fields
         const { name, description, price, stock, category } = fields

        //TODO : Restrictions on field
         if( !name  || !description || !price || !category || !stock)
         {
             //console.log(name,description,price,stock,category)
             return res.status(400).json({error:"Please include all fields"})
         }

        let product = new Product(fields)

        //handle file
        if(file.photo){
            if(file.photo.size > 3000000)
            {
                res.status(400).json({
                    error:"File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //Save to DB
        product.save()
        .then((product)=>{
            if(!product)
                return res.json({error:"error saving to DB"})
            
            product.photo = undefined
            res.json({product})
        })
        .catch((err)=>{
            res.status(400).json({error:err})
        })
    })
}

module.exports.updateProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true

    form.parse(req,(err,fields,file)=>{
        if(err)
         return res.status(400).json({
             error:"problem with image"
         })

         //updation code
        let product = req.product
         product = _.extend(product,fields)

        //handle file
        if(file.photo){
            if(file.photo.size > 3000000)
            {
                res.status(400).json({
                    error:"File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        //Save to DB
        product.save()
        .then((product)=>{
            if(!product)
                return res.json({error:"updation of product failed"})
            product.photo = undefined
            res.json({product})
        })
        .catch((err)=>{
            res.status(400).json({error:err})
        })
    })
}

module.exports.deleteProduct = (req,res)=>{
    const { _id } = req.product
    Product.findByIdAndDelete({_id})
    .then((product)=>{
        res.json({message:"Deleted successfully"})
    })
    .catch((err)=>{
        res.json({error:"Error deleting product from DB",details:err})
    })
}

//middleware
module.exports.photo = (req,res,next)=>{
    if(req.product.photo.data) {
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

//middleware
module.exports.updateStockAndSold = (req,res,next)=>{

    let myOperations = req.body.order.products.map((product)=>{
        return {
            updateOne: {
                filter : {_id : product._id},
                update: {$inc:{stock : -product.count ,sold : +product.count}}
            }
        }
    })

    Product.bulkWrite(myOperations,{})
    .then((product)=>{
        next()
    })
    .catch((err)=>{
        return res.status(400).json({error:"Bulk operations failed"})
    })
}


