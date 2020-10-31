const {User} = require('../models/user')
const {validationResult} = require('express-validator')

module.exports.signup=(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
    const {body}=req
    const user = new User(body)
    user.save((err,user)=>{
        if(err){
            console.log(`ERROR WHILE CREATING USER : ${err}`)
            return res.status(400).json({error:err})
        }
        const { _id,name, lastName, email, role } = user
        res.json({
            _id,
            name,
            lastName,
            email,
            role
        })   
    })
}

module.exports.signin = (req,res)=>{
    //In case there are validation errors - like incorrect email format or password empty
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }

    //When email and password are inputted, first it will try to find a user with that email and validate the password entered. Then on success, it will try to generate token for it.
    const {password: plainPassword, email} = req.body
     User.findByCredentials(email,plainPassword)
     .then((user)=>{
        return user.generateToken() //return is important here
     })
     .then((data)=>{
        const {_id,name,email,role}=data.user
        const {token} = data
        res.json({
            token,
            user:
                {
                    _id,
                    name,
                    email,
                    role
                }
        })
     })
    .catch((error)=>{
        res.status(400).json({error})
    })
}

module.exports.signout = (req,res)=>{
    const { signedInUser:user,token }=req
    const { _id }=user
    User.findByIdAndUpdate(_id,{ $pull:{ tokens : { token:token }}})
    .then((user)=>{
        if(user)
        res.json({message:"Signed Out!!"})
    })
    .catch((err)=>{
        res.status(400).json({error:"error signing out"})
    })
}