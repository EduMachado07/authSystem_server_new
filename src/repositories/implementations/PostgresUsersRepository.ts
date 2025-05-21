import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import { PrismaClient } from "../../generated/prisma";

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
        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
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
}