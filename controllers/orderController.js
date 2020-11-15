const { Order, ProductCart } = require('../models/order')

module.exports.getOrderById = (req,res,next,id)=>{
    Order.findById({id}).populate("products.product","name price")
    .then((order)=>{
        req.order = order
        next()
    })
    .catch((err)=>{
        res.status(400).json({error:"Order not found in DB"})
    })
}

module.exports.getOrder = (req,res)=>{
    res.json(req.order)
}

module.exports.createOrder = (req,res)=>{
    // console.log(req.body.order)
    req.body.user = req.profile
    const order = new Order(req.body.order)
    order.save()
    .then((order)=>{
        res.json({order})
    })
    .catch((err)=>{
        res.status(400).json({error:"Error creating order"})
    })

}

module.exports.getAllOrders = (req,res)=>{
    Order.find().populate("user","_id name").sort([["_id","desc"]])
    .then((orders)=>{
        if(!orders.length)
        return res.status(400).json({error:"No orders yet"})
        
        res.json({orders})
    })
    .catch((err)=>{
        res.status(400).json({error:"Error fetching all orders from DB"})
    })
}

module.exports.getOrderStatus = (req,res)=>{
    res.json(Order.schema.path("status").enumValues)
}

module.exports.updateStatus = (req,res)=>{
   const {_id} = req.order
   Order.findByIdAndUpdate({_id},{$set:{status:req.body.status}})
   .then((order)=>{
       res.json(order)
   })
   .catch((err)=>{
       res.status(400).json({error:"Order status update failed"})
   })
}