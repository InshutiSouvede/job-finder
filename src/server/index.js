const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require('cors')
const userRouter = require('./routes/userRoutes');
dotenv.config()
const USER_NAME = process.env.USER_NAME
const PASSWORD = process.env.PASSWORD
const connect = mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@alldbs.plbwm.mongodb.net/job_finder_app?retryWrites=true&w=majority&appName=allDbs`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
connect.then((data)=>console.log("Successfully connected to the database"))
.catch((err)=> console.log("Could not connect to the database",err))

const app = express();
// const port = 4500

const port = process.env.PORT
app.use(cors())
app.get('/',(req,res)=>{
    res.send("Welcome to root")
})
app.use('/users',userRouter)
app.listen(port, (err) => {
  if (!err) console.log("Connected to ", port);
});
