const express = require('express')
const router = express.Router()

const { 
    getProductById, 
    getProduct, 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    photo
 } = require('../controllers/productController')

 const { isSignedIn } = require('../middlewares/isSignedIn')
 const { isAdmin } = require('../middlewares/isAdmin')

//params
router.param("productId",getProductById)

//Routes

//get
router.get("/products/:productId",getProduct)
router.get("/products",getAllProducts)
router.get("/products/photo/:productId",photo)

//create
router.post("/products",isSignedIn,isAdmin,createProduct)

//update
router.put("/products/:productId",isSignedIn,isAdmin,updateProduct)

//delete
router.delete("/products/:productId",isSignedIn,isAdmin,deleteProduct)

module.exports = router