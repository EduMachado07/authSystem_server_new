import { IMailProvider } from "../../../providers/IMailProvider";
import { NotFound } from "../../../repositories/IErrorsRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IForgotPasswordDTO } from "./ForgotPassword_DTO";

export class ForgotPasswordUseCase {
    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider,
    ) { }

    async execute(data: IForgotPasswordDTO) {
        const user = await this.usersRepository.findByID(data.id)

        if (!user) {
            throw new NotFound('Usuário não encontrado.')
        }

        await this.usersRepository.updatePassword(user.id, data.password);

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            from: {
                name: 'Eduardo Machado',
                email: 'eduardo.silvamachado07@gmail.com'
            },
            subject: 'Senha alterada com sucesso',
            body: '<p>A senha da sua conta foi alterada com sucesso.</p>'
        })

        return
    }
}