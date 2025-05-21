import { IMailProvider } from "../../../providers/IMailProvider";
import { ITokenRepository } from "../../../repositories/ITokenRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { ILoginUserDTO } from "./LoginUser.DTO";
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
            throw new Error("User not exists");
        }

        const passwordIsCorrect = await bcrypt.compare(data.password, user.password)

        if (!passwordIsCorrect) {
            throw new Error("Password invalid");
        }

        const acessToken = await this.tokensRepository.signAccess({ id: user.id, email: user.email })
        const refreshToken = await this.tokensRepository.signRefresh({ id: user.id, email: user.email })

        return { acessToken, refreshToken }
    }
}