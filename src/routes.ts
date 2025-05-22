import express, { Request, Response } from "express";

import { deleteUserController } from "./useCases/User/DeleteUser";
import { createUserController } from "./useCases/User/CreateUser";
import { getUserController } from "./useCases/User/GetUser";
import { loginUserController } from "./useCases/Auth/LoginUser";

const router = express.Router();

router.post('/login', (req: Request, res: Response) => {
    return loginUserController.handle(req, res);
});
router.post('/get-user', (req: Request, res: Response) => {
    return getUserController.handle(req, res);
});
router.post('/create', (req: Request, res: Response) => {
    return createUserController.handle(req, res);
});
router.delete('/delete', (req: Request, res: Response) => {
    return deleteUserController.handle(req, res);
});

export { router };
