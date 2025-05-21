import { Request, Response } from "express";
import { LoginUserUserCase } from "./LoginUser_UserCase";

export class LoginUserController {
    constructor(
        private loginUserUserCase: LoginUserUserCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        if (!email || !password) throw new Error("Dados não informados.");

        try {
            const token = await this.loginUserUserCase.execute({
                email,
                password
            })

            res.cookie('accessToken', token.acessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 15, // 15 minutos
            })
            res.cookie('refreshToken', token.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
            })

            return res.status(201).json('Usuário criado com sucesso')
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}