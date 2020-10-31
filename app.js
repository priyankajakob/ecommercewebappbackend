const express = require('express')
const mongoose = require('./config/database')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('../projbackend/routes/auth')
const userRoutes = require('../projbackend/routes/user')
const categoryRoutes = require('../projbackend/routes/category')
const productRoutes = require('../projbackend/routes/product')

const app = express()

const PORT = process.env.port || 3010

//middlewares
app.use(bodyParser.json())
// app.use(cookieParser())
app.use(cors())

//routes
app.use('/',authRoutes)
app.use('/',userRoutes)
app.use('/',categoryRoutes)
app.use('/',productRoutes)

//starting server
app.listen(PORT,()=>{
    console.log(`LISTENING TO PORT : ${PORT}`)
})