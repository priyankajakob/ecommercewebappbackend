const express = require('express')
const router = express.Router()

const {body} = require('express-validator')

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const {isSignedIn} = require('../middlewares/isSignedIn')
const {isAdmin} = require('../middlewares/isAdmin')
const {isAuthenticated} = require('../middlewares/isAuthenticated')

router.post('/signup',
[
    body('email').isEmail().withMessage('must be a valid email address'),
    body('password').isLength({min:5}).withMessage('must be of length 5')
],
authController.signup)

router.post('/signin',
[
    body('email').isEmail().withMessage('Email must be inputted'),
    body('password').isLength({min:1}).withMessage('Password must be inputted')
],
authController.signin)

router.get('/users/:id',isSignedIn,isAuthenticated,userController.showUser)
router.get('/users',isSignedIn,isAdmin,userController.listAllUsers)

router.get('/signout',isSignedIn,authController.signout)

module.exports = router
