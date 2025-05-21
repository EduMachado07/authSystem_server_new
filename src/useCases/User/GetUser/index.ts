import { PostgresUsersRepository } from "../../../repositories/implementations/PostgresUsersRepository";
import { GetUserController } from "./GetUser_Controller";
import { GetUserUserCase } from "./GetUser_UserCase";

// INFRA
const postgresUserRepository = new PostgresUsersRepository();
// SERVICE
const getUserUseCase = new GetUserUserCase(
    postgresUserRepository,
);
// CONTROLLER
const getUserController = new GetUserController(
    getUserUseCase
)

export { getUserUseCase, getUserController }
