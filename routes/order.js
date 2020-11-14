const express = require('express')
const router = express.Router()

const { isSignedIn } = require('../middlewares/isSignedIn')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { isAdmin } = require('../middlewares/isAdmin')
const {pushOrderIntoPurchaseList} = require('../middlewares/pushOrderIntoPurchaseList')

const {updateStockAndSold} = require('../controllers/productController')

const { getOrderById, getOrder, createOrder, getAllOrders, getOrderStatus, updateStatus } = require('../controllers/orderController')

const { getUserById } = require('../controllers/userController') //this is used to assign req.profile with userId

//params
router.param("userId",getUserById)
router.param("orderId",getOrderById)

//actual routes
router.get("/orders/:orderId",isSignedIn,isAuthenticated,getOrder)
router.get("/orders",isSignedIn,isAuthenticated,getAllOrders)

//create
router.post("/orders/:userId",
isSignedIn,
isAuthenticated,
pushOrderIntoPurchaseList,
updateStockAndSold,
createOrder)

//status
router.get("/orders/status",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
router.put("/orders/:orderId/status",isSignedIn,isAdmin,updateStatus)

module.exports = router