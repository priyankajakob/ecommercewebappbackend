const {User} = require('../models/user')

module.exports.listAllUsers = (req,res) => {
//check of signedInUser not present is not required since that case error is sent from custom middleware
 const {signedInUser}=req
        User.find()
        .then((users)=>{
            res.json({
                users,
                signedInUser
            })
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
}

module.exports.showUser = (req,res)=>{
    const {signedInUser} = req
    const {id}=req.params
    User.findById({_id:id})
    .then((user)=>{
        if(user)
        res.json({
            user,
            signedInUser
        })
        else
        res.json({error:"User doesn't exist",signedInUser})
    })
    .catch((err)=>{
        res.status(400).json({error:err})
    })
}
