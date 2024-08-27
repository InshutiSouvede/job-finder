const User = require("../models/users")

const getAllUsers = async(req,res)=>{
    try {
        const users = User.find()
        if(users.length>0){
            res.json({users})
        }else{
            res.json({message:"No user yet"})
        }
    } catch (error) {
        res.json({error:true,message:error.message})
    }
    
}
module.exports = {
    getAllUsers
}