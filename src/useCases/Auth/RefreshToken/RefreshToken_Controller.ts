import { NextFunction, Request, Response } from "express";
import { RefreshTokenUserCase } from "./RefreshToken_UseCase";
import { Unauthorized } from "../../../repositories/IErrorsRepository";

export class RefreskTokenController {
  constructor(private refreshTokenUserCase: RefreshTokenUserCase) { }

  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const { refreshToken } = req.cookies;

    if (!refreshToken) throw new Unauthorized("Refresh token not provided");

    try {
      const token = await this.refreshTokenUserCase.execute({
        refreshToken,
      });

      res.cookie("accessToken", token.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 15, // 15 minutos
      });
      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      });

      return res.status(200).json({ message: "Renewed tokens" });
    } catch (error) {
      next(error)
    }
  }
}
