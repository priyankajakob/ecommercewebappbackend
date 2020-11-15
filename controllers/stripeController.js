const stripe = require("stripe")("sk_test_")
const uuid = require("uuid/v4")

module.exports.makePayment = (req,res)=>{
    const {products , token} = req.body
    console.log("PRODUCTS : ",products)

    let amount = 0
    products.forEach((prod)=>{
        amount += prod.count * prod.price
    })

    const idempotencyKey = uuid() //so that user is not chanrged twice in case of network issues

    return stripe.customers.create({
        email : token.email,
        source: token.id
    })
    .then((customer)=>{
        stripe.charges.create({
            amount : amount*100,
            currency : 'INR',
            customer:customer.id,
            receipt_email:token.email,
            shipping : {
                name:token.card.name,
                address : {
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postal_code:token.card.address_zip
                }
            }

        },{idempotencyKey})
        .then((result)=>res.status(200).json(result))
        .catch((error)=>console.log(error))
    })
    .catch((error)=>console.log(error))
}