import { NotFound } from "../../../repositories/IErrorsRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IGetResponseDTO, IGetUserDTO } from "./GetUser_DTO";

export class GetUserUserCase {
    constructor(
        private usersRepository: IUserRepository,
    ) { }

    async execute(data: IGetUserDTO): Promise<IGetResponseDTO> {
        const userAlreadyExists = await this.usersRepository.findByID(data.id);

        if (!userAlreadyExists) {
            throw new NotFound("Usuário não encontrado");
        }

        const phonesUser = await this.usersRepository.findPhonesUser(data.id)

        return {
            email: userAlreadyExists.email,
            name: userAlreadyExists.name,
            phones: phonesUser
        };
    }
}