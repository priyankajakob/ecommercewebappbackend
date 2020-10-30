const {User} = require('../models/user')

module.exports.getAllUsers = (req,res) => {
//check of signedInUser not present is not required since that case error is sent from custom middleware
 const {signedInUser}=req
        User.find()
        .then((users)=>{
            if(!users)
            return res.status(400).json({error:"No users found"})
        
            res.json({
                users,
                signedInUser
            })
        })
        .catch((err)=>{
            res.status(400).json({error:"No users found"})
        })
}

// module.exports.showUser = (req,res)=>{
//     const {signedInUser} = req
//     const {id}=req.params
//     User.findById({_id:id})
//     .then((user)=>{
//         if(user)
//         res.json({
//             user,
//             signedInUser
//         })
//         else
//         res.json({error:"User doesn't exist",signedInUser})
//     })
//     .catch((err)=>{
//         res.status(400).json({error:err})
//     })
// }

module.exports.getUserById = (req,res,next,id)=>{
    User.findById(id)
    .then((user)=>{
        if(!user)
            return res.status(400).json({error:"No user was found in DB"})
        req.profile = user
        next()
    })
    .catch((err)=>{
        res.status(400).json({error:"No user was found in DB"})
    })
}

module.exports.getUser = (req,res)=>{
    //Below are to selectively not send stuffs
    req.profile.salt=undefined
    req.profile.encry_password=undefined
    req.profile.tokens=undefined

    return res.json(req.profile)
}

module.exports.updateUser = (req,res)=>{
    const { body } = req
    const { _id } = req.profile
    
    User.findByIdAndUpdate({_id:_id},{$set:body},{new:true,useFindAndModify:false})
    .then((user)=>{
        if(!user)
        {
            return res.status(400).json({error:"User not found"})
        }
        console.log(user)
        user.encry_password=undefined,
        user.salt=undefined
        res.json(user)
    })
    .catch((err)=>{
        return res.status(400).json({error:"User not found"})
    })
}
