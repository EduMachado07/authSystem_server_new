import { MailTrapMailProvider } from "../../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUsersRepository";
import { ForgotPasswordController } from "./ForgotPassword_Controller";
import { ForgotPasswordUseCase } from "./ForgotPassword_UseCase";

const postgresUserRepository = new PostgresUsersRepository();
const mailTrapMailProvider = new MailTrapMailProvider();

const forgotPasswordUseCase = new ForgotPasswordUseCase(
    postgresUserRepository,
    mailTrapMailProvider
)

const forgotPasswordController = new ForgotPasswordController(
    forgotPasswordUseCase
)

export { forgotPasswordUseCase, forgotPasswordController }