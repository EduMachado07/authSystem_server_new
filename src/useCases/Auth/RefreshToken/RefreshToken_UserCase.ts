import { ITokenRepository } from "../../../repositories/ITokenRepository";
import { IRefreshTokenDTO } from "./RefreshToken_DTO";

export class RefreshTokenUserCase {
  constructor(private tokensRepository: ITokenRepository) {}

  async execute(data: IRefreshTokenDTO) {
    let decodeRefresh;
    let accessToken;

    try {
      decodeRefresh = this.tokensRepository.verifyRefresh(data.refreshToken);
    } catch (error) {
      throw new Error("Refresh token invalid");
    }

    if (!data.accessToken) {
      return accessToken = this.tokensRepository.signAccess({
        id: decodeRefresh.id,
        email: decodeRefresh.email,
      });
    }

    try {
      const refreshToken = this.tokensRepository.verifyAccess(data.accessToken);

      return {accessToken, refreshToken};
    } catch (error) {
      throw new Error("Refresh token invalid");
    }
  }
}
