import {CustomerModel} from "../Model/CustomerModel.js";
import{customers} from "../db/db.js";

var recordIndex;




function loadTable() {
    $('#Cus-table-body').empty();

    customers.map((customer, index) => {
        var record = `
            <tr>
                <td class="cus-id-value">${customer.id}</td>
                <td class="cus-name-value">${customer.Name}</td>
                <td class="cus-address-value">${customer.address}</td>
                <td class="cus-contactNo-value">${customer.contactNo}</td>
            </tr>
        `;
        $("#Cus-table-body").append(record);
    });
}


/*=======================get data from the current index=====================*/

$("#Cus-table-body").on('click', 'tr' , function () {

    let index = $(this).index();
    recordIndex = index;

    console.log("index: ",index);

    let Id = $(this).find(".cus-id-value").text();
    let Name = $(this).find(".cus-name-value").text();
    let Address = $(this).find(".cus-address-value").text();
    let ContactNo = $(this).find(".cus-contactNo-value").text();


    $("#cusId").val(Id);
    $("#cusFullname").val(Name);
    $("#cusAddress").val(Address);
    $("#cusContactNo").val(ContactNo);



});




/*============save a customer============================*/


    $("#btnCusSave").on('click', () => {
        console.log("start button triggered");

        if (validateAll()) {
            var CustomerId = $("#cusId").val();

            var CustomerName = $("#cusFullname").val();

            var CustomerAddress = $("#cusAddress").val();

            var CustomerContact = $("#cusContactNo").val();


            let customer= new CustomerModel(CustomerId,CustomerName,CustomerAddress,CustomerContact);
            customers.push(customer);
            Swal.fire({
                title: "Success?",
                text: "Customer added to the system?",
                icon: "success",
                confirmButtonText:"ok !"
            })


            console.log(CustomerId);
            console.log(CustomerName);
            console.log(CustomerAddress);
            console.log(CustomerContact);

            console.log(customers);

            loadTable();
            clearData();
            getCount();


        }
    });


/*=====================Update a customer===========================*/
$("#btnCusUpadate").on('click', () => {

    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update this customer?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!"
    }).then((result) => {
        if (result.isConfirmed) {

            var CustomerId = $("#cusId").val();

            var CustomerName = $("#cusFullname").val();

            var CustomerAddress = $("#cusAddress").val();

            var CustomerContact = $("#cusContactNo").val();


            let customerObj = customers[recordIndex];

            customerObj.id = CustomerId;
            customerObj.Name = CustomerName;
            customerObj.address = CustomerAddress;
            customerObj.contactNo = CustomerContact;

            loadTable();
            clearData()

            Swal.fire("Updated!", "Customer has been updated.", "success");
        }

        });
    });


/*========================delete a customer=======================*/

$("#btnCusDelete").on('click', () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
    }).then((result) => {
        if (result.isConfirmed) {
            // Delete the customer
            customers.splice(recordIndex, 1);

            // Reload the table
            loadTable();

            // Clear input fields
            clearData();

            // Show success message
            Swal.fire("Deleted!", "Customer has been deleted.", "success");
        }
    });
});




function  validateCusId(){
    // console.log("validate method called");

    var CustomerId = $("#cusId").val();
    let pattern = /^C-\d{3}$/;


    if (pattern.test(CustomerId)) {
        $('#error-msgId').html("") ;
        return true;
    } else {
        $('#error-msgId').html("Please enter the id in C-*** format");
        return false;
    }
}

function  validateCusName(){
    console.log("validate method called for Name");

    var CustomerName = $("#cusFullname").val();
    let pattern = /^[A-Za-z]+(([' -][A-Za-z ])?[A-Za-z]*)*$/;


    if (pattern.test(CustomerName)) {
        $('#error-msgName').html("") ;
        return true;
    } else {
        $('#error-msgName').html("Please enter a valid name");
        // console.log("Please enter a valid name");
        return false;
    }
}

function  validateCusAddress(){
    console.log("validate method called for Name");

    var CustomerAddress = $("#cusAddress").val();
    let pattern =  /^[a-zA-Z0-9\s,.'-]{3,}$/;;


    if (pattern.test(CustomerAddress)) {
        $('#error-msgAddress').html("") ;
        return true;
    } else {
        $('#error-msgAddress').html("Please enter a valid address");
        // console.log("Please enter a valid Address");
        return false;
    }
}


function  validateCusContact(){
    // console.log("validate method called for Contact");

    var CustomerContact = $("#cusContactNo").val();
    let pattern = /^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/;



    if (pattern.test(CustomerContact)) {
        $('#error-msgContact').html("") ;
        return true;
    } else {
        $('#error-msgContact').html("Please enter a valid address");
        // console.log("Please enter a valid Contact");
        return false;
    }
}




$("#cusId").on('input', validateCusId);
$("#cusFullname").on('input', validateCusName);
$("#cusAddress").on('input', validateCusAddress);
$("#cusContactNo").on('input', validateCusContact);



function validateAll() {
    // Call each validation method and store the result
    let isValidId = validateCusId();
    let isValidName = validateCusName();
    let isValidAddress = validateCusAddress();
    let isValidContact = validateCusContact();

    // Check if all validation methods return true
    if (isValidId && isValidName && isValidAddress && isValidContact) {
        // All validations passed
        return true;
    } else {
        // At least one validation failed
        return false;
    }
}



/*================================================Cus Search====================================*/


// Function to simulate fetching customer data (replace with your actual backend call)

    // Function to handle customer search
    $('#searchCusButton').on('click', function() {
        var customerName = $('#CusSearchBar').val().trim(); // Get customer name from input

        // Perform a check to ensure customerName is not empty
        if (customerName === '') {
            alert('Please enter a customer name.');
            return;
        }


        var customerData = findCustomerByName(customerName); // Replace with your actual function to fetch data


        if (customerData) {
            Swal.fire({
                title: "Success!",
                text: "Customer Found :)",
                icon: "success",
                confirmButtonText: "OK"
            });
        } else {
            Swal.fire({
                title: "Error!",
                text: "Customer Not Found :(",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
        $('#CusSearchBar').val('');

    });


    // Function to simulate fetching customer data (replace with your actual backend call)
    function findCustomerByName(name) {

        for (var i = 0; i < customers.length; i++) {
            if (name === customers[i].Name) {
                console.log("cusName", customers[i].Name);
                $('#cusId').val(customers[i].id);
                $('#cusFullname').val(customers[i].Name);
                $('#cusAddress').val(customers[i].address);
                $('#cusContactNo').val(customers[i].contactNo);
                return true;
            }
        }

    }

/* ============================ clear data  ==========================*/

 function clearData(){
     $("#cusId").val("");

      $("#cusFullname").val("");

      $("#cusAddress").val("");

      $("#cusContactNo").val("");

 }

 /*=================  GET COUNT =========================*/

function getCount(){
    $('#cus-count').text(customers.length);
}





