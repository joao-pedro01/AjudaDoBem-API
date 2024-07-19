import { PrismaClient } from "@prisma/client";
import ErrorInterface from "./ErrorInterface";
const prisma = new PrismaClient();

class User {
    private id: Number;
    private Name: string;
    private Email: string;
    private Cpf: string;
    private Phone: string;
    private AddressPrimary: String;
    private BirthDate: Date;
    private Password: string;
    private Avatar: string;

    constructor(cpf: string) {
        this.Cpf = cpf;
        //this.Name = name;
        //this.Email = email;
        //this.Password = password;
        this.Avatar = 'avatar_default.png';
    }

    public getId(): Number {
        return this.id;
    }
    public setId(id: Number): void {
        this.id = id;
    }

    public getName(): String {
        return this.Name;
    }
    public setName(name: string): void {
        this.Name = name;
    }


    public getEmail(): String {
        return this.Email;
    }
    public setEmail(email: string): void {
        this.Email = email;
    }

    public getCpf(): String {
        return this.Cpf;
    }
    public setCpf(cpf: string): void {
        this.Cpf = cpf;
    }

    public getPhone(): String {
        return this.Phone;
    }
    public setPhone(phone: string): void {
        this.Phone = phone;
    }

    public getZipCode(): String {
        return this.AddressPrimary;
    }
    public setZipCode(zipCode: String): void {
        this.AddressPrimary = zipCode;
    }

    public getBirthDate(): Date {
        return this.BirthDate;1
    }
    public setBirthDate(birthDate: Date): void {
        this.BirthDate = new Date(birthDate);
    }

    public getPassword(): String {
        return this.Password;
    }
    public setPassword(password: string): void {
        this.Password = password;
    }

    public async createUser(): Promise<User> {
        return new Promise((resolve, reject) => {        
            prisma.user.create({
                data: {
                    name_user: this.Name,
                    email_user: this.Email,
                    cpf_user: this.Cpf,
                    phone_user: this.Phone,
                    birth_date_user: this.BirthDate,
                    password_user: this.Password,
                    avatar_user: this.Avatar
                }
            }).then((user) => {
                this.setId(user.id_user);
                resolve(this);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    public async userIsRegistered(): Promise<ErrorInterface[]> {
            
        return Promise.all([this.getUserByCpf(), this.getUserByEmail()]).then((valores) => {
            var errors: ErrorInterface[] = [];
            let error: ErrorInterface;
            if (valores[0]) {
                error = {
                    msg: 'CPF já cadastrado',
                    field: 'cpf'
                }
                errors.push(error);
            }

            if (valores[1]) {
                error = {
                    msg: 'Email já cadastrado',
                    field: 'email'
                }
                errors.push(error);
            }
    
            return errors;
        }).catch((error) => {
            console.error(error);
            return error;
        });
    }

    public async getUserByCpf(): Promise<User | null> {
        return new Promise((resolve, reject) => {
            prisma.user.findFirst({
                where: {
                    cpf_user: this.Cpf
                }
            }).then((user) => {
                if (user) {
                    this.setId(user.id_user);
                    this.setName(user.name_user);
                    this.setEmail(user.email_user);
                    this.setCpf(user.cpf_user);
                    this.setPhone(user.phone_user);
                    this.setBirthDate(user.birth_date_user);
                    this.setPassword(user.password_user);
                    this.Avatar = user.avatar_user;
                    return resolve(this);
                } 
                return resolve(null);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    public async getUserByEmail(): Promise<User | null> {
        return new Promise((resolve, reject) => {
            prisma.user.findFirst({
                where: {
                    email_user: this.Email
                }
            }).then((user) => {
                if (user) {
                    this.setId(user.id_user);
                    this.setName(user.name_user);
                    this.setEmail(user.email_user);
                    this.setCpf(user.cpf_user);
                    this.setPhone(user.phone_user);
                    this.setBirthDate(user.birth_date_user);
                    this.setPassword(user.password_user);
                    this.Avatar = user.avatar_user;
                    return resolve(this);
                }
                return resolve(null);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }
}

export default User;
