const express = require('express')
const router = express.Router()

const { isSignedIn } = require('../middlewares/isSignedIn')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const {getToken,processPayment} = require('../controllers/paymentBController')
const { getUserById } = require('../controllers/userController') //this is used to assign req.profile with userId, otherwise we get "ACCESS DENIED" error from isAuthenticated middleware

router.param("userId",getUserById) // important for assigning re.profile -- this provides authenticated route access - user App personalization

router.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken)

router.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment)

module.exports = router