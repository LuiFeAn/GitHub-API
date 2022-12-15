import { Router } from "express";

//Controllers
import userController from "./src/controllers/user-controller";

const router = Router();


router.get('/users/:nick',userController.show);

export default router;
