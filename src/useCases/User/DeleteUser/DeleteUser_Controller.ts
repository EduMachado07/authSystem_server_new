import { NextFunction, Request, Response } from "express";
import { DeleteUserUserCase } from "./DeleteUser_UseCase";
import { BadRequest } from "../../../repositories/IErrorsRepository";

export class DeleteUserController {
    constructor(
        private deleteUserUserCase: DeleteUserUserCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.user;

        if (!id) throw new BadRequest("Usuário não informado.");

        try {
            await this.deleteUserUserCase.execute({
                id
            })
            return res.status(201).json('Conta removida do sistema com sucesso')
        } catch (error) {
            next(error)
        }
    }
}