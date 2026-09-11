import express from 'express';
import registeruser from '../controller/controller.js';

const route = express.Router();

// register user
route.post("/register",registeruser)


export default route;