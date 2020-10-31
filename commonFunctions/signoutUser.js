const {User} = require('../models/user')

const signoutUser = (userId) =>{
    let tokens = []
    //below code is not working - tokens array is not getting emptied
    User.findByIdAndUpdate({_id:userId},{$push : { tokens :tokens }},{new:true})
    .then((user)=>{
        console.log(user)
        return({message : "Please re-login to see updates"})
    })
    .catch((err)=>{
        return({error:err})
    })
}

module.exports = { signoutUser }