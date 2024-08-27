const express = require("express");
const userRouter = require('./routes/userRoutes')
const app = express();
const port = 4500
app.get('/',(req,res)=>{
    res.send("Welcome to root")
})
app.use('/users',userRouter)
app.listen(port, (err) => {
  if (!err) console.log("Connected to ", port);
});
