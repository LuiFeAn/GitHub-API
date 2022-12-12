import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/api-err";

export default function AsyncErr(error: ApiError, req: Request, res: Response, next: NextFunction){

    if( error ){
        return res.status( error.statusCode || 500).json({
            error: error.message || 'Um erro interno ocorreu. Por favor, tente novamente mais tarde'
        });
    }

}