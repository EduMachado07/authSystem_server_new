import { User } from "../entities/User";

export interface IUserRepository {
    findByEmail(email: string): Promise<User>;
    findByID(id: string): Promise<User>;
    save(user: User): Promise<void>;
    delete(email: string): Promise<void>;
    findPhonesUser(id: string): Promise<{ number: string }[]>
}