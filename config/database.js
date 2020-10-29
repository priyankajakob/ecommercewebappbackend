const mongoose = require('mongoose')

mongoose.Promise = global.Promise

require('dotenv').config()

 mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
        // useCreateIndex:true
    })
    .then(()=>{
        console.log("CONNECTED TO MONGODB")
    })
    .catch((err)=>{
        console.log("NOT CONNECTED TO DB : "+err)
    })
module.exports=mongoose


