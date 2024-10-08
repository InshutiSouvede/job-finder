const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan");
const cors = require('cors')
const path = require('path')

const userRouter = require('./routes/userRoutes');
const cvRouter = require('./routes/cvRoutes');
const pictureRouter = require('./routes/profilePictureRoutes');

dotenv.config()
const USER_NAME = process.env.USER_NAME
const PASSWORD = process.env.PASSWORD
const connect = mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@alldbs.plbwm.mongodb.net/job_finder_app?retryWrites=true&w=majority&appName=allDbs`)
connect.then((data)=>console.log("Successfully connected to the database"))
.catch((err)=> console.log("Could not connect to the database",err))

const app = express();
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))

const port = process.env.PORT
app.use(cors())
// make files in public accessible through our server on the frontent
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.send("Welcome to root")
})
app.use('/users',userRouter)
app.use('/cv',cvRouter)
app.use('/picture',pictureRouter)
app.listen(port, (err) => {
  if (!err) console.log("Connected to ", port);
});
