import { NextFunction, Request, Response } from "express";
import { GetUserUserCase } from "./GetUser_UseCase";
import { BadRequest } from "../../../repositories/IErrorsRepository";

export class GetUserController {
    constructor(
        private getUserUserCase: GetUserUserCase
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.user;

        if (!id) throw new BadRequest("Usuário não informado");

        try {
            const user = await this.getUserUserCase.execute({
                id
            })
            return res.status(201).json({ message: "Usuário encontrado", user })
        } catch (error) {
            next(error)
        }
    }
}