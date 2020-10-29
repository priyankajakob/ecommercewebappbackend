const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        maxlength:32,
        trim:true
    },
    lastName:{
        type:String,
        maxlength:10,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:[true,'email is required']
    },
    userInfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    },
    tokens:[
        {
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }

        }
    ]
},
{   timestamp:true })


userSchema.virtual("password")
.set(function(password)
{
    this._password = password
    this.salt = uuidv1()
    this.encry_password=this.securePassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {
    authenticate:function(plainPassword){
        return this.securePassword(plainPassword)===this.encry_password
    },

    securePassword:function(plainPassword){
        if(!plainPassword)
        return ""
        try
        {
            return crypto.createHmac('sha256',this.salt)
            .update(plainPassword)
            .digest('hex')
        }
        catch(err)
        {
            console.log(err)
            return ""
        }
    },

    generateToken:function(){
        const user = this
        return new Promise((resolve,reject)=>{
            const {_id:userId,name,email,role} = user
            const tokenData = {
                userId,
                name,
                email,
                role,
                createdAt:Number(new Date())
            }
            // console.log(tokenData)
            //If you notice there is "iat" added extra in token
            const token = jwt.sign(tokenData,process.env.SECRET)
            //console.log(user)
               const signedInDevices = user.tokens.length
            //    console.log(signedInDevices)
               if(signedInDevices<3)
               {
                    user.tokens.push({token})
                    user.save()
                    .then((user)=>{
                        const data = {user,token}
                        resolve(data)
                    })
                    .catch((err)=>{
                        reject('Error saving user')
                    })
               }
               else
               reject('Please logout from another device. Signed In device count exceeded!')  
        })
    }
}

userSchema.statics = {
    findByCredentials : function(email,password){
        return new Promise((resolve,reject)=>{
            // console.log({email})
            User.findOne({email})
            .then((user)=>{
                if(user)
                {
                    const isPasswordMatching = user.authenticate(password)
                    if(!isPasswordMatching)
                        reject("Incorrect email or password")
                    else
                        resolve(user)
                } 
                reject("Incorrect email or password")              
            })
            .catch((err)=>{
                console.log(err)
                reject("Incorrect email or password")
            })
        })
       
    },
    findByToken : function(token){
        const User=this
        let tokenData
        return new Promise((resolve,reject)=>
        {
            try
            {
                tokenData = jwt.verify(token,process.env.SECRET)
                // console.log(tokenData)
                if(!tokenData)
                    reject("TOKEN INVALID")
            }
            catch(err)
            {
                reject("TOKEN INVALID")
            }  
            const {userId:_id,name,email,role}=tokenData
            User.findOne({_id,'tokens.token':token})
            .then((user)=>{
                if(!user)
                reject("TOKEN INVALID")
                else
                resolve({
                    _id,
                    name,
                    email,
                    role
                })
            })
            .catch((err)=>{
                reject(err)
            })
           
        })
    }
}

const User = mongoose.model('User',userSchema)

module.exports= {
    User
}