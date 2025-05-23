import { IMailProvider } from "../../../providers/IMailProvider";
import { NotFound, Unauthorized } from "../../../repositories/IErrorsRepository";
import { ITokenRepository } from "../../../repositories/ITokenRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ILoginUserDTO } from "./LoginUser_DTO";
import bcrypt from "bcrypt";

export class LoginUserUserCase {
    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider,
        private tokensRepository: ITokenRepository,
    ) { }

    async execute(data: ILoginUserDTO) {
        const user = await this.usersRepository.findByEmail(data.email)

        if (!user) {
            throw new NotFound('Usuário não encontrado.')
        }

        const passwordIsCorrect = await bcrypt.compare(data.password, user.password)

        if (!passwordIsCorrect) {
            throw new Unauthorized("Senha incorreta.");
        }

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            from: {
                name: 'Eduardo Machado',
                email: 'eduardo.silvamachado07@gmail.com'
            },
            subject: 'Novo acesso no sistema',
            body: '<p>Identificamos a entrada de um dispositivo na sua conta.</p>'
        })

        const accessToken = await this.tokensRepository.signAccess({ id: user.id, email: user.email })
        const refreshToken = await this.tokensRepository.signRefresh({ id: user.id, email: user.email })

        return { accessToken, refreshToken }
    }
}