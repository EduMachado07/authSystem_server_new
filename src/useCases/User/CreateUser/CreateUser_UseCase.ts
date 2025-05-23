import { User } from "../../../entities/User";
import { IMailProvider } from "../../../providers/IMailProvider";
import { Conflict } from "../../../repositories/IErrorsRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ICreateUserDTO } from "./CreateUser_DTO";
import bcrypt from "bcrypt";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider,
    ) { }

    async execute(data: ICreateUserDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Conflict("Usuário já está cadastrado.");
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Eduardo Machado',
                email: 'eduardo.silvamachado07@gmail.com'
            },
            subject: 'Seja bem-vindo',
            body: '<p>Faça login na plataforma.</p>'
        })
    }
}