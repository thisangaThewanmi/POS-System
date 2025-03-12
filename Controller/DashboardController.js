import {customers, items, orderDetails} from "../db/db.js";

$('#dash-link').click(function () {
    getCusCount();
    getItemCount();
    getOrderCount();
});

function getCusCount() {
    $('#customerCount').text(customers.length);
}

function getItemCount() {
    $('#itemCount').text(items.length);
}

function getOrderCount() {
    $('#orderCount').text(orderDetails.length);
}