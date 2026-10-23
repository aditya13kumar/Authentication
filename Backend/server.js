import express from 'express';
import connectdb from './config/Db.js'
import dotenv from 'dotenv';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import authrouter from './routes/routes.js';
import userrouter from './routes/userroutes.js';


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}
));
app.use(cookieParser());

app.use('/api/auth',authrouter);
app.use('/api/users',userrouter)





connectdb();

app.listen(5000,()=>{
    console.log("server is running on port 5000");
    
})