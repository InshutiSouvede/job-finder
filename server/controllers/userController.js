const User = require("../models/users")

const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find()
        if(users.length>0){
            res.json({users})
        }
        else res.json({message:"No user yet"})
        
    } catch (error) {
        res.json({error:true,message:error.message})
    }
    
}
const getOneUser = async(req,res)=>{
    try{
        id = req.params.id
        const user = await User.findById(id)
        if(user){
            res.json({user})
        }
        else res.json({message:"User with id "+id+" is not found"})
    }
    catch (error) {
        res.json({error:true,message:error.message})
    }
}
module.exports = {
    getAllUsers,
    getOneUser
}