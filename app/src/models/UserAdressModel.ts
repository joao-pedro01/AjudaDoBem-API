import Address from "./AddressModel";
import User from "./UserModel";

class UserAddress {
    private id_user_address: Number;
    private number_address: Number;
    private complement_address: String;

    private user: User;
    private address: Address[];
    
    constructor(number: Number, complement: String) {
        this.number_address = number;
        this.complement_address = complement;
    }

    public setUser(user: User): void {
        this.user = user;
    }
    public getUser(): User {
        return this.user;
    }

    public setAddress(address: Address[]): void {
        this.address = address;
    }
    public getAddress(): Address[] {
        return this.address;
    }
}

export default UserAddress;
