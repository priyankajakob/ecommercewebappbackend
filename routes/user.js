const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const {isSignedIn} = require('../middlewares/isSignedIn')
const {isAdmin} = require('../middlewares/isAdmin')
const {isAuthenticated} = require('../middlewares/isAuthenticated')

router.get('/users/:id',isSignedIn,isAuthenticated,userController.showUser)
router.get('/users',isSignedIn,isAdmin,userController.listAllUsers)

module.exports = router