const express = require('express')
const mongoose = require('./config/database')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const routes = require('../projbackend/routes/route')

const app = express()

const PORT = process.env.port || 3010

//middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//routes
app.use('/',routes)

//starting server
app.listen(PORT,()=>{
    console.log(`LISTENING TO PORT : ${PORT}`)
})