import { MailTrapMailProvider } from "../../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUsersRepository";
import { SignTokensRepository } from "../../../repositories/implementations/TokensRepository";
import { LoginUserController } from "./LoginUser_Controller";
import { LoginUserUserCase } from "./LoginUser_UserCase";

// INFRA
const postgresUserRepository = new PostgresUsersRepository();
const mailtrapMailProvider = new MailTrapMailProvider();
const signTokensRepository = new SignTokensRepository();
// SERVICE
const loginUserUseCase = new LoginUserUserCase(
    postgresUserRepository,
    mailtrapMailProvider,
    signTokensRepository
);
// CONTROLLER
const loginUserController = new LoginUserController(
    loginUserUseCase
)

export { loginUserUseCase, loginUserController }
