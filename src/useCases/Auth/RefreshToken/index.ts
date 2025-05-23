import { SignTokensRepository } from "../../../repositories/implementations/SignTokensRepository";
import { RefreskTokenController } from "./RefreshToken_Controller";
import { RefreshTokenUserCase } from "./RefreshToken_UseCase";

const signTokensRepository = new SignTokensRepository();
// SERVICE
const refreshTokenUseCase = new RefreshTokenUserCase(
    signTokensRepository
);
// CONTROLLER
const refreshTokenController = new RefreskTokenController(
    refreshTokenUseCase
)

export { refreshTokenUseCase, refreshTokenController }
