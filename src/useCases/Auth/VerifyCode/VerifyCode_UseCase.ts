import { NotFound, Unauthorized } from "../../../repositories/IErrorsRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { IVerifyCodeDTO } from "./VerifyCode_DTO";

export class VerifyCodeUseCase {
    constructor(
        private usersRepository: IUserRepository,
    ) { }

    async execute(data: IVerifyCodeDTO) {
        const user = await this.usersRepository.findByID(data.id)

        if (!user) {
            throw new NotFound('Usuário não encontrado.')
        }

        if (data.code !== user.verificationCode) {
            throw new Unauthorized("Código incorreto.")
        }

        await this.usersRepository.resetVerificationCode(user.id)

        return
    }
}