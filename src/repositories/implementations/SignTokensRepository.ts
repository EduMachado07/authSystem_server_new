import { Token } from "../../entities/Token";
import { ITokenRepository } from "../ITokenRepository";
import jwt from "jsonwebtoken";

export class SignTokensRepository implements ITokenRepository {
    private accessSecret = process.env.JWT_ACCESS_SECRET as string;
    private refreshSecret = process.env.JWT_REFRESH_SECRET as string;

    signAccess(payload: Token): Promise<string> {
        return jwt.sign(
            { payload },
            this.accessSecret,
            { expiresIn: '1h' }
        );
    }
    signRefresh(payload: Token): Promise<string> {
        return jwt.sign(
            { payload },
            this.refreshSecret,
            { expiresIn: '13d' }
        );
    }
    async verifyAccess(token: string): Promise<string> {
        return jwt.verify(token, this.accessSecret);
    }
    async verifyRefresh(token: string): Promise<string> {
        return jwt.verify(token, this.refreshSecret);
    }
}