import { IMailProvider } from "../../../providers/IMailProvider";
import { NotFound } from "../../../repositories/IErrorsRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ISendCodeEmailDTO } from "./SendCodeEmail_DTO";

export class SendCodeEmailUseCase {
    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider,
    ) { }

    async execute(data: ISendCodeEmailDTO) {
        const user = await this.usersRepository.findByEmail(data.email)

        if (!user) {
            throw new NotFound('Usuário não encontrado.')
        }

        const verificationCode = await this.usersRepository.saveVerificationCode(user.id)

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            from: {
                name: 'Eduardo Machado',
                email: 'eduardo.silvamachado07@gmail.com'
            },
            subject: 'Redefinição da sua senha',
            body: `
                    <p>Identificamos um pedido para alterar a sua senha.</p>
                    <p>Seu código de autenticação: ${verificationCode}</p>

                    <button>Alterar senha</button>
                `
        })
    }
}