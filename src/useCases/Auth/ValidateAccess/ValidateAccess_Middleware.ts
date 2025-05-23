import { NextFunction, Request, Response } from "express";
import { ITokenRepository } from "../../../repositories/ITokenRepository";
import { BadRequest } from "../../../repositories/IErrorsRepository";

export class ValidateAccessMiddleware {
    constructor(private tokensRepository: ITokenRepository) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { accessToken } = req.cookies;

        if (!accessToken) throw new BadRequest("Access token not provided");

        try {
            const decoded = await this.tokensRepository.verifyAccess(accessToken);

            req.user = {
                id: decoded.id,
                email: decoded.email
            }

            next();
        } catch (error) {
            next(error)
        }
    }
}
