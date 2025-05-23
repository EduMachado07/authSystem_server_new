import { NextFunction, Request, Response } from "express";
import { SignTokensRepository } from "../../../repositories/implementations/SignTokensRepository";
import { ValidateAccessMiddleware } from "./ValidateAccess_Middleware";

const signTokensRepository = new SignTokensRepository();
// MIDDLEWARE
const validateAccessMiddleware = new ValidateAccessMiddleware(
    signTokensRepository
)

export const validateAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validateAccessMiddleware.handle(req, res, next);
    } catch (error) {
        next(error);
    }
};
