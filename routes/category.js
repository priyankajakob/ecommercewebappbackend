const express = require('express')
const router = express.Router()


const { 
    createCategory, 
    getCategoryById , 
    getCategory, 
    updateCategory , 
    deleteCategory, 
    getAllCategories 
    } = require('../controllers/categoryController')

const { getUserById } = require('../controllers/userController') //this is used to assign req.profile with userId

const { isSignedIn } = require('../middlewares/isSignedIn')
const { isAdmin } = require('../middlewares/isAdmin')

//params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

//actual routes

//get
router.get("/categories/:categoryId",getCategory)
router.get("/categories",getAllCategories)

//update
router.put("/categories/:categoryId",isSignedIn,isAdmin,updateCategory)

//delete
router.delete("/categories/:categoryId",isSignedIn,isAdmin,deleteCategory)

//create
router.post("/categories",isSignedIn,isAdmin,createCategory)


module.exports = router