const express = require('express')
const router = express.Router()

const { getUserById, getUser, getAllUsers, updateUser, deleteUser, userOrderList } = require('../controllers/userController')

const {isSignedIn} = require('../middlewares/isSignedIn')
const {isAdmin} = require('../middlewares/isAdmin')
const {isAuthenticated} = require('../middlewares/isAuthenticated')

//params
router.param("userId",getUserById)
router.get('/users/:userId',isSignedIn,isAuthenticated,getUser)
// router.get('/users/:id',isSignedIn,isAuthenticated,userController.showUser)

//actual routes
router.put('/users/:userId',isSignedIn,isAuthenticated,updateUser)
router.delete('/users/:userId',isSignedIn,isAuthenticated,deleteUser)
router.get('/users/orders/:userId',isSignedIn,isAuthenticated,userOrderList)
router.get('/users',isSignedIn,isAdmin,getAllUsers)


module.exports = router