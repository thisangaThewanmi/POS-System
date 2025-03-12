export class CustomerModel {
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get Name() {
        return this._Name;
    }

    set Name(value) {
        this._Name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get contactNo() {
        return this._contactNo;
    }

    set contactNo(value) {
        this._contactNo = value;
    }

    constructor(id, Name, address, contactNo) {
        this._id = id;
        this._Name = Name;
        this._address = address;
        this._contactNo = contactNo;
    }
}