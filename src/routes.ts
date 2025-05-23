import express, { NextFunction, Request, Response } from "express";

import { deleteUserController } from "./useCases/User/DeleteUser";
import { createUserController } from "./useCases/User/CreateUser";
import { getUserController } from "./useCases/User/GetUser";
import { loginUserController } from "./useCases/Auth/LoginUser";
import { refreshTokenController } from "./useCases/Auth/RefreshToken";
import { validateAccess } from "./useCases/Auth/ValidateAccess";
import { sendCodeEmailController } from "./useCases/Auth/SendCodeEmail";
import { verifyCodeController } from "./useCases/Auth/VerifyCode";
import { forgotPasswordController } from "./useCases/Auth/ForgotPassword";

const router = express.Router();
// AUTH
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    return loginUserController.handle(req, res, next);
});
router.post('/verify-code', (req: Request, res: Response, next: NextFunction) => {
    return verifyCodeController.handle(req, res, next);
});
router.post('/send-code', (req: Request, res: Response, next: NextFunction) => {
    return sendCodeEmailController.handle(req, res, next);
});
router.post('/forgot-password', (req: Request, res: Response, next: NextFunction) => {
    return forgotPasswordController.handle(req, res, next);
});
router.post('/refresh-token', (req: Request, res: Response, next: NextFunction) => {
    return refreshTokenController.handle(req, res, next);
});
// USER
router.post('/create', (req: Request, res: Response, next: NextFunction) => {
    return createUserController.handle(req, res, next);
});
router.post('/get-user', validateAccess, (req: Request, res: Response, next: NextFunction) => {
    return getUserController.handle(req, res, next);
});
router.delete('/delete', validateAccess, (req: Request, res: Response, next: NextFunction) => {
    return deleteUserController.handle(req, res, next);
});

export { router };
