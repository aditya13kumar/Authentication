import express from 'express';
import connectdb from './config/Db.js'
import dotenv from 'dotenv';
import route from './routes/routes.js';


dotenv.config();


const app = express();




app.use("/",async(req,res)=>{
   res.send("hello aditya!!")
})
app.use('/api/auth',route);

app.listen(5000,()=>{
    console.log("server is running on port 5000");
    connectdb();
})