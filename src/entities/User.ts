import { v4 as uuidv4 } from 'uuid';

export class User {

    public readonly id: string;

    public name: string;
    public email: string;
    public password: string;
    public verificationCode?: string;
    public isVerified: boolean;
    public phones?: { number: string }[];

    constructor(props: Omit<User, 'id' | 'isVerified'>, id?: string) {
        Object.assign(this, props);

        this.id = id ?? uuidv4();
        this.isVerified = false;
        this.verificationCode = undefined
    }
}