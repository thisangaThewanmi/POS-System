import {items} from "../db/db.js";
import {customers} from "../db/db.js";
import {itemCart} from "../db/db.js";
import {ItemCartModel} from "../Model/ItemCartModel.js";
import {orderDetails} from "../db/db.js";
import {orderDetailsModel} from "../Model/orderDetailsModel.js";


autoGenerateOrderId("");


function autoGenerateOrderId(orderId) {

    console.log("currentOrderId: " + orderId);

    if (orderId !== "") {
        var split = [];
        split = orderId.split("O0");
        var id = Number.parseInt(split[1]);
        id++;
        if (id < 10) {
            $("#orderID").val("O00" + id);
        } else {
            $("#orderID").val("O0" + id);
        }
    } else {
        $("#orderID").val("O001");
    }

}


function loadComboBoxes(array, comboBoxId) {
    console.log("combo-box loaded", array, comboBoxId);
    var comboBox = $(comboBoxId); //uda ena comboxId eka tama meken ganne

    // clearing the combobox
    comboBox.empty();

    //udata ena arrya ek aganata iterate krnoo
    for (var i = 0; i < array.length; i++) {
        // array eke current index eke id eka ganno
        var id = array[i].id;
        // Append option to combo box
        comboBox.append($('<option>', {value: id, text: id}));
    }

    // If there's only one item, manually trigger change event
    if (array.length === 1) {
        comboBox.one('click', function () {
            $(this).change();
        });
    }
}


$('#placeOrder-link').click(function () {  //place order link eka ebuwama witharak meka load wenna ona e nisaii header link ekata id dunne ntm mulinma load unoth arraya nisa data na
    console.log("main method");

    loadComboBoxes(customers, '#order-cus-id'); // meken method ekata array ekai cmb id ekai yawanoo
    loadComboBoxes(items, '#order-item-id');

    if (orderDetails === 0) {
        autoGenerateOrderId("");
    }

});


function loadCusData(cusId) {
    console.log("loaded the loadCusData");
    for (var i = 0; i < customers.length; i++) {
        if (cusId === customers[i].id) {
            console.log("cusName", customers[i].Name);
            $('#order-cus-name').val(customers[i].Name);
        }
    }
}

$('#order-cus-id').change(function () {
    console.log("clicke cmb");
    var cusId = $(this).val();
    console.log("cusId:", cusId);
    loadCusData(cusId);
});

/!*=======================LOAD ITEM DATA=========================*!/

function loadItemData(itemId) {
    console.log("loaded the loadItemData");
    for (var i = 0; i < items.length; i++) {
        if (itemId === items[i].id) {
            console.log("itemName", items[i].Name);
            $('#order-item-name').val(items[i].Name);
            $('#order-item-price').val(items[i].price);
            $('#order-item-qty').val(items[i].qty);
        }
    }
}

$('#order-item-id').change(function () {
    console.log("clicked item combo");
    var itemId = $(this).val();
    console.log("itemId:", itemId);
    loadItemData(itemId);
});


/!*===================================Load to the table====================*!/

function loadTable() {
    $('#item-cart-tablebody').empty();

    itemCart.map((itemCart, index) => {
        var record = `
            <tr>
                <td class="cartItemId">${itemCart.itemId}</td>
                <td class="cartItemName">${itemCart.ItemName}</td>
                <td class="cartItemQty">${itemCart.Qty}</td>
                <td class="cartItemPrice">${itemCart.Price}</td>
                <td class="cartItemTotal">${itemCart.Total}</td>
            </tr>
        `;
        $("#item-cart-tablebody").append(record);
    });
}


function updateItemQty() {

    var OrderItemId = $('#order-item-id').val();

    for (var i = 0; i < items.length; i++) {
        if (OrderItemId === items[i].id) {
            var currentItemQty = items[i].qty;
            console.log("currentItemQty : " + currentItemQty);
            var OrderQty = parseInt($('#order-item-oqty').val());
            console.log("currentOrderQty : " + OrderQty);
            var updatedQty = currentItemQty - OrderQty;
            console.log("updateQty : " + updatedQty);

            items[i].qty = updatedQty;
            console.log(" items[i].qty" + items[i].qty);
        }

    }
}


/!*==============================save to the cart=======================*!/
var total = 0;
var finalTotal = 0;
$("#order-addItem").on('click', () => {
    var OrderItemId = $('#order-item-id').val();
    var OrderItemName = $('#order-item-name').val();

    // Strip non-numeric characters from price
    var OrderItemPriceString = $('#order-item-price').val();
    var OrderItemPrice = parseFloat(OrderItemPriceString.replace(/[^0-9.]/g, ''));
    console.log(OrderItemPrice + "OrderItemPrice");

    // Parse quantity as integer
    var OrderQtyString = $('#order-item-oqty').val();
    var OrderQty = parseInt(OrderQtyString);
    console.log(OrderQty + "orderQty");

    if (isNaN(OrderItemPrice) || isNaN(OrderQty)) {
        alert("Please enter valid numbers for price and quantity.");
        return;
    }


    updateItemQty();


    total = OrderQty * OrderItemPrice;
    console.log("total: " + total);

    finalTotal += total; // Incrementally add to final total
    console.log("Final Total: " + finalTotal);

    $('#totalPriceLabel').text(finalTotal);

    // Create an object to store item data
    let cartItem = new ItemCartModel(OrderItemId, OrderItemName, OrderQty, OrderItemPrice, total);
    console.log("Before sending to the table");


    // Push the object to the itemCart array
    itemCart.push(cartItem);


    console.log(itemCart);
    loadTable();

    $('#order-item-id').val('');
    $('#order-item-name').val('');
    $('#order-item-price').val('');
    $('#order-item-oqty').val('');
    $('#order-item-qty').val('');


    $("#discount, #cash").on('input', () => { // listeners danoo
        var discount = parseFloat($('#discount').val()); // meken eka parse krla ganno
        if (isNaN(discount) || discount < 0) { // mekedi balnoo meka not a numberda ntm 0 wlta wada aduda kila ehenm ekata 0 assign karanoo
            discount = 0;
        }

        var discountedTotal = finalTotal - (finalTotal * (discount / 100)); //equation
        $('#subTotalPriceLabel').text(discountedTotal.toFixed(2)); // meken decimal dekakata convert karanoo like 20.123 awill tibboth 20.12 karanoo

        var cash = parseFloat($('#cash').val());  // same thing checked above
        if (isNaN(cash) || cash < 0) {
            cash = 0;
        }

        var balance = cash - discountedTotal; //equation
        $('#balance').val(balance.toFixed(2));
    });
});

/!*================================================placing an order==================================*!/

$('#btnPlaceOrder').on('click', () => {


    var OrderId = $('#orderID').val();
    var OrderDate = $('#date').val();
    var CustomerId = $('#order-cus-id').val();
    var CustomerName = $('#order-cus-name').val();
    var total = $('#totalPriceLabel').text();


    // var discount=$('#discount').val();

    var discount = parseFloat($('#discount').val()); // meken eka parse krla ganno
    if (isNaN(discount) || discount < 0) { // mekedi balnoo meka not a numberda ntm 0 wlta wada aduda kila ehenm ekata 0 assign karanoo
        discount = 0;
    }


    var subTotal = $('#subTotalPriceLabel').text();


    console.log(OrderId);
    console.log(OrderDate);
    console.log(CustomerId);
    console.log(CustomerName);
    console.log(total);
    console.log(discount);
    console.log(subTotal);

    $('#totalPriceLabel').text('');
    $('#discount').val('');
    $('#subTotalPriceLabel').text('');


    $('#orderID').val('');
    $('#orderDate').val('');
    $('#order-cus-id').val('');
    $('#order-cus-name').val('');

    autoGenerateOrderId(OrderId);


    let orderDetailRec = new orderDetailsModel(OrderId, OrderDate, CustomerId, CustomerName, total, discount, subTotal);
    orderDetails.push(orderDetailRec)

    if (orderDetailRec) {
        Swal.fire({
            title: "Success!",
            text: "Order placed:)",
            icon: "success",
            confirmButtonText: "OK"
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Error in placing the order:(",
            icon: "error",
            confirmButtonText: "OK"
        });
    }


    loadODTable();


});


/*==========================loading order Detail Table=================================*/


$('#orderDetail-link').click(function () {  //place order link eka ebuwama witharak meka load wenna ona e nisaii header link ekata id dunne ntm mulinma load unoth arraya nisa data na
    console.log("main method");
    loadODTable();
    console.log("load eka cll una");
});


function loadODTable() {
    console.log("order details:" + orderDetails.length)
    // Clear existing rows in the table body
    $('#orderDetails-tablebody').empty();

    // Iterate through each order detail in orderDetails array
    orderDetails.forEach((orderDetail, index) => {
        // Construct HTML for a new table row using template literals
        var record = `
            <tr>
                <td class="cartOrderId">${orderDetail._orderId}</td>
                <td class="cartOrderDate">${orderDetail._orderDate}</td>
                <td class="cartCusName">${orderDetail._customerName}</td>
                <td class="cartTotal">${orderDetail._total}</td>
                <td class="cartDiscount">${orderDetail._discount}</td>
                <td class="cartFinalTotal">${orderDetail._SubTotal}</td>
                <td>
                    <button class="btn btn-danger btn-sm btn-delete" data-index="${index}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;

        // Append the constructed row HTML to the table body
        $("#orderDetails-tablebody").append(record);

    });


}

function deleteOrder(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
    }).then((result) => {
        if (result.isConfirmed) {
            orderDetails.splice(index, 1); // Remove the order from the array
            loadODTable(); // Reload the table
            Swal.fire("Deleted!", "Your order has been deleted.", "success"); // Success message
        }
    });
}

// Attach event listener for delete buttons using event delegation
$(document).on('click', '.btn-delete', function () {
    var index = $(this).data('index'); // Get the index from the data attribute
    deleteOrder(index);
});






