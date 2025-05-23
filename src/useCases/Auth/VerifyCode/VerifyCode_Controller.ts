import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../../repositories/IErrorsRepository";
import { VerifyCodeUseCase } from "./VerifyCode_UseCase";

export class VerifyCodeController {
    constructor(
        public verifyCodeUseCase: VerifyCodeUseCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id, code } = req.body;

            if (!id || !code) {
                throw new BadRequest('Usuário e código são obrigatórios');
            }

            await this.verifyCodeUseCase.execute({
                id,
                code
            })

            return res.status(200).json({ message: 'Código está correto!' });
        } catch (error) {
            next(error)
        }
    }
}