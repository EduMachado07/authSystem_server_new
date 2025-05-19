import { Request, Response } from "express";
import { DeleteUserUserCase } from "./DeleteUser_UserCase";

export class DeleteUserController {
    constructor(
        private createUserUserCase: DeleteUserUserCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        if (!email) throw new Error("Email não informado.");


        try {
            await this.createUserUserCase.execute({
                email
            })
            return res.status(201).json('Conta removida do sistema com sucesso')
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}