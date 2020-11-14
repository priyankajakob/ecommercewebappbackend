const express = require('express')
const router = express.Router()

const {makePayment} = require('../controllers/stripeController')

//Routes
router.post("/stripepayment",makePayment)

module.exports = router
