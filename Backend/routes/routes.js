import express from 'express';
import {login, logout, refreshtoken, register} from '../controller/controller.js';


const router = express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/refreshtoken",refreshtoken);
router.post("/logout",logout);
export default router;