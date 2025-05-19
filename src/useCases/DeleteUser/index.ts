import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { DeleteUserController } from "./DeleteUser_Controller";
import { DeleteUserUserCase } from "./DeleteUser_UserCase";



// INFRA
const postgresUserRepository = new PostgresUsersRepository();
const mailtrapMailProvider = new MailTrapMailProvider();
// SERVICE
const deleteUserUseCase = new DeleteUserUserCase(
    postgresUserRepository,
    mailtrapMailProvider
);
// CONTROLLER
const deleteUserController = new DeleteUserController(
    deleteUserUseCase
)

export { deleteUserUseCase, deleteUserController }
