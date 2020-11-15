const express = require('express')
const mongoose = require('./config/database') //required to make db connection
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
// const stripeRoutes = require('./routes/stripe')

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
app.use('/',orderRoutes)
// app.use('/',stripeRoutes)

//starting server
app.listen(PORT,()=>{
    console.log(`LISTENING TO PORT : ${PORT}`)
})