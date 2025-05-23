import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import { PrismaClient } from "../../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class PostgresUsersRepository implements IUserRepository {

    async findByEmail(email: string): Promise<User> {
        const user = await prisma.user.findUnique({ where: { email } })

        return user
    }
    async findByID(id: string): Promise<User> {
        const user = await prisma.user.findUnique({ where: { id }, })

        return user
    }
    async findPhonesUser(id: string): Promise<{ number: string }[]> {
        const phones = await prisma.phone.findMany({
            where: { userId: id },
            select: { number: true }
        })

        return phones
    }
    async save(user: User): Promise<void> {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                password: hashedPassword,
                verificationCode: user.verificationCode,
                isVerified: user.isVerified,
                phones: {
                    create: user.phones ?? []
                }
            }
        })
    }
    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        })
    }
    async saveVerificationCode(id: string): Promise<string> {
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        await prisma.user.update({
            where: { id: id },
            data: { verificationCode: code }
        })
        return code
    }
    async resetVerificationCode(id: string): Promise<void> {
        await prisma.user.update({
            where: { id: id },
            data: { verificationCode: null },
        });
    }
    async updatePassword(id: string, password: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: id },
            data: { password: hashedPassword }
        })
    }
}