// import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IDeleteUserDTO } from "./DeleteUser_DTO";

export class DeleteUserUserCase {
    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider,
    ) { }

    async execute(data: IDeleteUserDTO) {
        const user = await this.usersRepository.findByEmail(data.email);

        if (!user) throw new Error("User not exists");

        await this.usersRepository.delete(data.email);

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            from: {
                name: 'Eduardo Machado',
                email: 'eduardo.silvamachado07@gmail.com'
            },
            subject: 'Seja bem-vindo',
            body: '<p>Sua conta foi removida do sistema.</p>'
        })
    }
}