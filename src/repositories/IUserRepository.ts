import { User } from "../entities/User";

export interface IUserRepository {
    findByEmail(email: string): Promise<User>;
    findByID(id: string): Promise<User>;
    findPhonesUser(id: string): Promise<{ number: string }[]>
    save(user: User): Promise<void>;
    saveVerificationCode(id: string): Promise<string>
    resetVerificationCode(id: string): Promise<void>
    updatePassword(id: string, password: string): Promise<void>
    delete(email: string): Promise<void>;
}