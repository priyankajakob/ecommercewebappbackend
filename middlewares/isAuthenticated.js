
const isAuthenticated = (req,res,next)=>{

    // let checker1 = req.signedInUser._id && req.params.id && req.signedInUser._id==req.params.id
    let checker1 = req.signedInUser && req.profile && req.signedInUser._id==req.profile._id
    let checker2 = req.signedInUser.role==1
    // console.log(checker1)
    // console.log(checker2)
    let checker = checker1 || checker2
    if(!checker)
    {
       return res.status(403).json({error:"ACCESS DENIED"})
       //Above message also throws if userId is invalid because of id comparison in checker1
    }
    next()
}

module.exports={
    isAuthenticated
}