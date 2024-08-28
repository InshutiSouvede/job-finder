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
        const id = req.params.id
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
const updateUser = async(req,res)=>{
    try {
        const id = req.params.id
    const user = await User.findById(id)
    if(user){
        const updatedUser =  await User.updateOne({id:id},req.body)
        res.json({user:updatedUser})
    }
    else{
        res.json({message:"No such user "})
    }
        
    } catch (error) {
        res.json({error:true,message:error.message})
    }
}
const deletUser = async(req,res)=>{
    try{
        const id = req.params.id
        const user = await User.findById(id)
        if(user){
            const data = await User.findOneAndDelete(id)
            res.json({data})
        }
        else res.json({message:"User with id "+id+" is not found"})
    }
    catch (error) {
        res.json({error:true,message:error.message})
    }
}
module.exports = {
    getAllUsers,
    getOneUser,
    updateUser,
    deletUser
}