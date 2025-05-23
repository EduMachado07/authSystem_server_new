import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUsersRepository";
import { VerifyCodeController } from "./VerifyCode_Controller";
import { VerifyCodeUseCase } from "./VerifyCode_UseCase";

const postgresUserRepository = new PostgresUsersRepository();

const verifyCodeUseCase = new VerifyCodeUseCase(
    postgresUserRepository
)

const verifyCodeController = new VerifyCodeController(
    verifyCodeUseCase
)

export { verifyCodeUseCase, verifyCodeController }