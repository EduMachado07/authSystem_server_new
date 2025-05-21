import { Request, Response } from "express";
import { DeleteUserUserCase } from "./DeleteUser_UserCase";

export class DeleteUserController {
    constructor(
        private deleteUserUserCase: DeleteUserUserCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;

        if (!id) throw new Error("Usuário não informado.");


        try {
            await this.deleteUserUserCase.execute({
                id
            })
            return res.status(201).json('Conta removida do sistema com sucesso')
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}