import { Request, Response } from "express";
import { RefreshTokenUserCase } from "./RefreshToken_UserCase";

export class RefreskTokenController {
  constructor(private refreshTokenUserCase: RefreshTokenUserCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { accessToken, refreshToken } = req.body;

    if (!accessToken || !refreshToken) throw new Error("Tokens não informados.");

    try {
      const token = await this.refreshTokenUserCase.execute({
        accessToken,
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

      return res.status(201).json("Usuário criado com sucesso");
    } catch (error) {
      return res.status(400).json({
        message: error.message || "Unexpected error.",
      });
    }
  }
}
