import express from 'express';
import { getUser ,registeruser  } from '../controller/controller.js';

const route = express.Router();

// register user
route.post("/register",registeruser);

//get user
route.get("/getuser",getUser);

export default route;