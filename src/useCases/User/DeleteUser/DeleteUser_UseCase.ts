import { IMailProvider } from "../../../providers/IMailProvider";
import { NotFound } from "../../../repositories/IErrorsRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IDeleteUserDTO } from "./DeleteUser_DTO";

export class DeleteUserUserCase {
    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider,
    ) { }

    async execute(data: IDeleteUserDTO) {
        const user = await this.usersRepository.findByID(data.id);

        if (!user) throw new NotFound('Usuário não encontrado.');

        await this.usersRepository.delete(data.id);

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            from: {
                name: 'Eduardo Machado',
                email: 'eduardo.silvamachado07@gmail.com'
            },
            subject: 'Conta Removida',
            body: '<p>Sua conta foi removida do sistema.</p>'
        });
    }
}