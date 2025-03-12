$('#dashboard').css({display:'block'});
$('#customer').css({display:'none'});
$('#item').css({display:'none'});
$('#order').css({display:'none'});
$('#orderDetail').css({display:'none'});



$('#dash-link').on('click',()=>{


    $('#dashboard').css({display:'block'});
    $('#customer').css({display:'none'});
    $('#item').css({display:'none'});
    $('#order').css({display:'none'});
    $('#orderDetail').css({display:'none'});

});

$('#cus-link').on('click',()=>{


    $('#dashboard').css({display:'none'});
    $('#customer').css({display:'block'});
    $('#item').css({display:'none'});
    $('#order').css({display:'none'});
    $('#orderDetail').css({display:'none'});

});

//course click
$('#item-link').on('click',()=>{


    $('#dashboard').css({display:'none'});
    $('#customer').css({display:'none'});
    $('#item').css({display:'block'});
    $('#order').css({display:'none'});
    $('#orderDetail').css({display:'none'});
});

$('#placeOrder-link').on('click',()=>{


    $('#dashboard').css({display:'none'});
    $('#customer').css({display:'none'});
    $('#item').css({display:'none'});
    $('#order').css({display:'block'});
    $('#orderDetail').css({display:'none'});

});

$('#orderDetail-link').on('click',()=>{


    $('#dashboard').css({display:'none'});
    $('#customer').css({display:'none'});
    $('#item').css({display:'none'});
    $('#order').css({display:'none'});
    $('#orderDetail').css({display:'block'});
});

