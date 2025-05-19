import { Request, Response } from "express";
import { CreateUserUserCase } from "./CreateUser_UserCase";

export class CreateUserController {
    constructor(
        private createUserUserCase: CreateUserUserCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        if (!name || !email || !password) throw new Error("Dados insuficientes.");


        try {
            await this.createUserUserCase.execute({
                name,
                email,
                password
            })
            return res.status(201).json('Usuário criado com sucesso')
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}