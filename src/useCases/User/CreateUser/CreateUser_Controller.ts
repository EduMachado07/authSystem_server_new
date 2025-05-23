import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUser_UseCase";
import { BadRequest } from "../../../repositories/IErrorsRepository";

export class CreateUserController {
    constructor(
        private createUserUserCase: CreateUserUseCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { name, email, password, phones } = req.body;

        if (!name || !email || !password) throw new BadRequest("Requisição inválida. Verifique os campos enviados.");

        try {
            await this.createUserUserCase.execute({
                name,
                email,
                password,
                phones
            })
            return res.status(201).json('Usuário criado com sucesso')
        } catch (error) {
            next(error)
        }
    }
}