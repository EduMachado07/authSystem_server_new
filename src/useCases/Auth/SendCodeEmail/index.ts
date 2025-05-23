import { MailTrapMailProvider } from "../../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUsersRepository";
import { SendCodeEmailController } from "./SendCodeEmail_Controller";
import { SendCodeEmailUseCase } from "./SendCodeEmail_UseCase";

// INFRA
const postgresUserRepository = new PostgresUsersRepository();
const mailtrapMailProvider = new MailTrapMailProvider();
// SERVICE
const sendCodeEmailUseCase = new SendCodeEmailUseCase(
    postgresUserRepository,
    mailtrapMailProvider,
);
// CONTROLLER
const sendCodeEmailController = new SendCodeEmailController(
    sendCodeEmailUseCase
)

export { sendCodeEmailUseCase, sendCodeEmailController }
