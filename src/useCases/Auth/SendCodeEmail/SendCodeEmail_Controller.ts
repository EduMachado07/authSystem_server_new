import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../../repositories/IErrorsRepository";
import { SendCodeEmailUseCase } from "./SendCodeEmail_UseCase";

export class SendCodeEmailController {
    constructor(
        public forgotPasswordUseCase: SendCodeEmailUseCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { email } = req.body;

            if (!email) {
                throw new BadRequest('Email é obrigatório');
            }

            await this.forgotPasswordUseCase.execute({
                email
            })

            return res.status(200).json({ message: 'Código enviado para o seu email.' });
        } catch (error) {
            next(error)
        }
    }
}