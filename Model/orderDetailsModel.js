export class orderDetailsModel {

    constructor(orderId, orderDate, customerId, customerName, total, discount, SubTotal) {

        this._orderId = orderId;
        this._orderDate = orderDate;
        this._customerId = customerId;
        this._customerName = customerName;
        this._total = total;
        this._discount = discount;
        this._SubTotal = SubTotal;
    }


    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get orderDate() {
        return this._orderDate;
    }

    set orderDate(value) {
        this._orderDate = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(value) {
        this._customerName = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get discount() {
        return this._discount;
    }

    set discount(value) {
        this._discount = value;
    }

    get subTotal() {
        return this._SubTotal;
    }

    set subTotal(value) {
        this._SubTotal = value;
    }
}