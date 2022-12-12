import { Router } from "express";
import userController from "./src/controllers/user-controller";

const router = Router();


router.get('/users/:nick',userController.show);

export default router;