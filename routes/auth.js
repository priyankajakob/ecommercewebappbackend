const express = require('express')
const router = express.Router()

const {body} = require('express-validator')

const { signup, signin, signout } = require('../controllers/authController')

const {isSignedIn} = require('../middlewares/isSignedIn')

router.post('/signup',
[
    body('email').isEmail().withMessage('must be a valid email address'),
    body('password').isLength({min:5}).withMessage('must be of length 5')
],
signup)

router.post('/signin',
[
    body('email').isEmail().withMessage('Email must be inputted'),
    body('password').isLength({min:1}).withMessage('Password must be inputted')
],
signin)

router.get('/signout',isSignedIn,signout)

module.exports = router
