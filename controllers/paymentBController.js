
const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "myMerchantId",
  publicKey: "myPublicKey",
  privateKey: "myPrivateKey"
});

module.exports.getToken = (req,res)=>{
    gateway.clientToken.generate({}).then(response => {
        // pass clientToken to your front-end
        const clientToken = response.clientToken
        return res.send(response)
      })
      .catch(error=>{
        return res.status(500).send(error)
      })
}

module.exports.processPayment = (req,res)=>{
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }).then(result => {
        return res.send(result)
       })
       .catch(error=>{
            return res.status(500).send(error)
       })
}