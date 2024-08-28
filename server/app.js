const express = require("express");
const mongoose = require("mongoose")
const userRouter = require('./routes/userRoutes');

const { USER_NAME, PASSWORD } = require("./credential");
const connect = mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@alldbs.plbwm.mongodb.net/job_finder_app?retryWrites=true&w=majority&appName=allDbs`)
connect.then((data)=>console.log("Successfully connected to the database"))
.catch((err)=> console.log("Could not connect to the database",err))

const app = express();
const port = 4500
app.get('/',(req,res)=>{
    res.send("Welcome to root")
})
app.use('/users',userRouter)
app.listen(port, (err) => {
  if (!err) console.log("Connected to ", port);
});
