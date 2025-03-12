export class ItemCartModel {
    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get ItemName() {
        return this._ItemName;
    }

    set ItemName(value) {
        this._ItemName = value;
    }


    get Qty() {
        return this._Qty;
    }

    set Qty(value) {
        this._Qty = value;
    }

    get Price() {
        return this._Price;
    }

    set Price(value) {
        this._Price = value;
    }

    get Total() {
        return this._Total;
    }

    set Total(value) {
        this._Total = value;
    }

    constructor(itemId, ItemName, Qty, Price, Total) {
        this._itemId = itemId;
        this._ItemName = ItemName;
        this._Qty = Qty;
        this._Price = Price;
        this._Total = Total;
    }
}