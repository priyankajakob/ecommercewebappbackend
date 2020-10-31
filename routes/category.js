const express = require('express')
const router = express.Router()


const { createCategory, getCategoryById , getCategory, getAllCategories } = require('../controllers/categoryController')
const { getUserById } = require('../controllers/userController')

const { isSignedIn } = require('../middlewares/isSignedIn')
const { isAuthenticated } = require('../middlewares/isAuthenticated')
const { isAdmin } = require('../middlewares/isAdmin')

//params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

//actual routes
router.get("/categories/:categoryId",isSignedIn,isAdmin,getCategory)
router.post("/categories",isSignedIn,isAdmin,createCategory)
router.get("/categories",isSignedIn,isAdmin,getAllCategories)

module.exports = router