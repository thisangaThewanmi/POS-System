export class ItemModel {
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

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    constructor(id, Name, qty, price) {
        this._id = id;
        this._Name = Name;
        this._qty = qty;
        this._price = price;
    }
}