const bcrypt = require('bcryptjs')

const password = "secret123"

async function generateSalt()
{
    const salt = await bcrypt.genSalt(10)
    return salt
}
async function encryptPassword(salt){
    const encryptedPass = await bcrypt.hash(password,salt)
    return encryptedPass
}
async function authenticateUser(plainPassword,hash){
    // console.log(plainPassword + " "+ hash)
    const valid = await bcrypt.compare(plainPassword,hash)
    return valid
}
generateSalt()
.then((saltResponse)=>{
    console.log("salt : " + " " +saltResponse)
    return encryptPassword(saltResponse)
})
.then((hash)=>{
    console.log("encryptedPassword : "  + " " + hash)
    return authenticateUser(password,hash) // true
})
.then((isValid)=>{
    console.log(isValid)
})
.catch((err)=>{
    console.log(err)
})