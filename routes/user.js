const express = require('express')
const router = express.Router()

const { getUserById, getUser, getAllUsers, updateUser } = require('../controllers/userController')

const {isSignedIn} = require('../middlewares/isSignedIn')
const {isAdmin} = require('../middlewares/isAdmin')
const {isAuthenticated} = require('../middlewares/isAuthenticated')

router.param("userId",getUserById)
router.get('/users/:userId',isSignedIn,isAuthenticated,getUser)
// router.get('/users/:id',isSignedIn,isAuthenticated,userController.showUser)
router.put('/users/:userId',isSignedIn,isAuthenticated,updateUser)
router.get('/users',isSignedIn,isAdmin,getAllUsers)

module.exports = router