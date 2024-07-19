import Address from '../src/models/AddressModel';

let address: Address = new Address("18050001");

describe('User models', () => {
    it('adds two numbers correctly', () => {
        expect(address.getAddressByZipCode());
    });
});
