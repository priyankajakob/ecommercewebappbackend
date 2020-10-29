
const isAdmin = (req,res,next)=>{
    const { role }=req.signedInUser
    if(role!=2)
    {
        return res.status(404).json({error:"You are not an ADMIN, Access Denied"})
    }
    next()
}

module.exports={
    isAdmin
}