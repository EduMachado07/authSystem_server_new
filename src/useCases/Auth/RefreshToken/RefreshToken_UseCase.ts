import { Unauthorized } from "../../../repositories/IErrorsRepository";
import { ITokenRepository } from "../../../repositories/ITokenRepository";
import { IRefreshTokenDTO } from "./RefreshToken_DTO";

export class RefreshTokenUserCase {
  constructor(private tokensRepository: ITokenRepository) { }

  async execute(data: IRefreshTokenDTO) {
    let payload;

    // VERIFY REFRESH TOKEN
    try {
      payload = await this.tokensRepository.verifyRefresh(data.refreshToken);
    } catch (error) {
      throw new Unauthorized("Refresh token invalid");
    }

    const newTokenRefresh = await this.tokensRepository.signRefresh({ id: payload.id, email: payload.email })
    const newTokenAccess = await this.tokensRepository.signAccess({ id: payload.id, email: payload.email })

    return { accessToken: newTokenAccess, refreshToken: newTokenRefresh, }
  }
}
