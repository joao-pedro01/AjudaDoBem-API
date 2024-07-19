import http from "http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Address {
    private street: string;
    private neighborhood: string;
    private city: string;
    private state: string;
    private complement: string;
    private zipCode: string;

    constructor(zip: string) {
        this.zipCode = zip;
    }

    private async getStreetApi(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            http.get(`http://viacep.com.br/ws/${this.zipCode}/json/`, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    const resApi = JSON.parse(data);

                    this.street = resApi.logradouro;
                    this.neighborhood = resApi.bairro;
                    this.city = resApi.localidade;
                    this.state = resApi.uf;
                    this.complement = resApi.complemento;

                    resolve(true);
                });
            }).on('error', (error: any) => {
                console.error(`Erro ao fazer requisição: ${error.message}`);
                reject(new Error("Erro ao buscar endereço"));
            });
        });
    }

    public async getAddressByZipCode(): Promise<Address> {
        try {
            await this.getStreetApi();

            let address = await prisma.address.findFirst({
                where: {
                    zip_code_address: this.zipCode
                },
                select: {
                    id_address: true,
                    street_address: true,
                    city_address: true,
                    state_address: true,
                    zip_code_address: true
                }
            });

            if (!address) {
                return address = await this.createAddress();
            }

            this.street = address.street_address;
            this.city = address.city_address;
            this.state = address.state_address;

            return this;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao buscar endereço");
        }
    }

    private async createAddress(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const newAddress = prisma.address.create({
                    data: {
                        street_address: this.street,
                        neighborhood_address: this.neighborhood,
                        city_address: this.city,
                        state_address: this.state,
                        complement_address: this.complement,
                        zip_code_address: this.zipCode
                    }
                });
    
                resolve(newAddress);
            } catch (error) {
                console.error(error);
                reject(new Error("Erro ao criar endereço"));
            }
        });
    }
}

export default Address;
