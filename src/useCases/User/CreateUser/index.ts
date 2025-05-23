import { MailTrapMailProvider } from "../../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUser_Controller";
import { CreateUserUseCase } from "./CreateUser_UseCase";

// INFRA
const postgresUserRepository = new PostgresUsersRepository();
const mailtrapMailProvider = new MailTrapMailProvider();
// SERVICE
const createUserUseCase = new CreateUserUseCase(
    postgresUserRepository,
    mailtrapMailProvider
);
// CONTROLLER
const createUserController = new CreateUserController(
    createUserUseCase
)

export { createUserUseCase, createUserController }
