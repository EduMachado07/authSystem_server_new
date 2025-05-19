import express, { Request, Response } from "express";
import { createUserController } from "./useCases/CreateUser";
import { deleteUserController } from "./useCases/DeleteUser";

const router = express.Router();

router.post('/users', (req: Request, res: Response) => {
    return createUserController.handle(req, res);
});
router.delete('/users', (req: Request, res: Response) => {
    return deleteUserController.handle(req, res);
});

export { router };
