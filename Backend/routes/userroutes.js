import express from 'express';
import { deleteuser, getprofile, getuser } from '../controller/usercontroller.js';
import { verifyrole, verifytoken } from '../middleware/middleware.js';

const router = express.Router();

router.get('/',verifytoken,verifyrole("admin"),getuser);
router.delete("/:id",verifytoken,verifyrole("admin"),deleteuser);
router.get("/me",verifytoken,getprofile);





export default router;