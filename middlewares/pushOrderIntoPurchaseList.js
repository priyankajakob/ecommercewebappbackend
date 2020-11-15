const express = require('express')
const {User} = require('../models/user')

const pushOrderIntoPurchaseList=(req,res,next)=>{
 
    if(JSON.stringify(req.body)==JSON.stringify({}))
        return res.status(400).json({error:"Empty order details passed"})

    let purchases = []
    // console.log(req.body.order)
    req.body.order.products.forEach((product)=>{
        const { _id, name, description, category } = product
        purchases.push({
            _id,
            name,
            description,
            category,
            quantity : product.count,
            // amount : req.body.order.amount,
            amount:product.price * product.count ,
            transactionId: req.body.order.transaction_id
        })
    })
    // console.log(purchases)
    //store this in DB
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$push : { purchases : purchases }},
        {new:true}
    )
    .then((user)=>{
        if(!user)
            return res.staus(400).json({error:"error adding orders to purchase list"})
        next()
    })
    .catch((err)=>{
        return res.staus(400).json({error:"error adding orders to purchase list"})
    })
}

module.exports={
    pushOrderIntoPurchaseList
}