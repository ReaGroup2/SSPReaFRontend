export class User{
    username: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    constructor(username: number, name: string, email: string, phone: string, role: string){
        this.username = username;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }
}