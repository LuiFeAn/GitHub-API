import { Request, Response } from 'express';
import userService from '../services/user-service';

class UserController {

    async show(req: Request, res: Response){

        const { nick } = req.params;

        const service = await userService.getUserByNickname(nick);

        res.json(service);


    }

}

export default new UserController();