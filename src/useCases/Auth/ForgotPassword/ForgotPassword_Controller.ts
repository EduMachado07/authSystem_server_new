import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../../repositories/IErrorsRepository";
import { ForgotPasswordUseCase } from "./ForgotPassword_UseCase";

export class ForgotPasswordController {
    constructor(
        private forgotPasswordUserCase: ForgotPasswordUseCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id, password } = req.body;

        if (!id || !password) throw new BadRequest("Usuário e senha são obrigatórios.");

        try {
            await this.forgotPasswordUserCase.execute({
                id,
                password
            })
            return res.status(200).json('Senha alterada com sucesso!')
        } catch (error) {
            next(error)
        }
    }
}