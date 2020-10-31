const express = require('express')
const User = require('../models/user')

const pushOrderIntoPurchaseList=(req,res,next)=>{
    
    let purchases = []
    req.body.order.products.forEach((product)=>{
        const { _id, name, description, category, quantity } = product
        purchases.push({
            _id,
            name,
            description,
            category,
            quantity,
            amount : req.body.order.amount,
            transactionId: req.body.order.transactionId
        })
    })
    //store this in DB
    User.finOneAndUpdate(
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