const {User} = require('../models/user')

const isSignedIn = (req,res,next)=>{
    // console.log(req.headers)
    const token=req.headers['x-auth']
    if(!token)
        return res.status(403).json({error:"ACCESS DENIED"})

    User.findByToken(token)
    .then((signedInUser)=>{
        if(!signedInUser)
            return res.status(400).json({error:"TOKEN INVALID"})
        //Above is required when user was logged in and at same moment user got deleted in DB.
        const {_id,name,email,role}=signedInUser
        req.signedInUser = {
            _id,
            name,
            email,
            role
        }
        next()
    })
    .catch((err)=>{
        res.status(400).json({error:err})
    })
   
}
module.exports={
    isSignedIn
}