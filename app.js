const express = require('express')
const mongoose = require('./config/database')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('../projbackend/routes/auth')
const userRoutes = require('../projbackend/routes/user')

const app = express()

const PORT = process.env.port || 3010

//middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//routes
app.use('/',authRoutes)
app.use('/',userRoutes)

//starting server
app.listen(PORT,()=>{
    console.log(`LISTENING TO PORT : ${PORT}`)
})