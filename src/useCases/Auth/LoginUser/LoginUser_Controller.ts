import { Request, Response, NextFunction } from "express";
import { LoginUserUserCase } from "./LoginUser_UseCase";
import { BadRequest } from "../../../repositories/IErrorsRepository";

export class LoginUserController {
    constructor(
        private loginUserUseCase: LoginUserUserCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new BadRequest('Email e senha são obrigatórios.');
            }

            const token = await this.loginUserUseCase.execute({
                email,
                password
            });

            res.cookie('accessToken', token.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 15, // 15 minutos
            });

            res.cookie('refreshToken', token.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
            });

            return res.status(200).json({ message: 'Usuário entrou no sistema.' });
        } catch (error) {
            next(error);
        }
    }
}
