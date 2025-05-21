import { Request, Response } from "express";
import { GetUserUserCase } from "./GetUser_UserCase";

export class GetUserController {
    constructor(
        private getUserUserCase: GetUserUserCase
    ) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;

        if (!id) throw new Error("Usuário não informado");

        try {
            const user = await this.getUserUserCase.execute({
                id
            })
            return res.status(201).json({ message: "Usuário encontrado", user })
        } catch (error) {
            return res.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}