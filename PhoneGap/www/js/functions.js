
// if a userID has been stored in localStorage, attempt to auto-login
if(localStorage.getItem("userID") > 0) {
    $.mobile.loading('hide');
    $.ajax({
        url: 'http://www.housemate-app.com/Service/UserAuthService.svc/login?username=' + localStorage.getItem("userName") + '&password=' + localStorage.getItem("userPassword"),
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function (json) {

            if(json.UID > 0) {
                window.location.href = '#loadingHouse';
            }
            else {
                window.location.href = '#signup';
            }
        }
    });
}
else {
    window.location.href = '#signup';
}

// ------------------ LOADING FUNCTIONS ---------------------

$( document ).on( "pageshow", "#loadingHouse", function() {

    checkHouse();


    //checks whether the user currently has a house
    function checkHouse() {

        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/Service/HouseService.svc/getHouse?uid=' + localStorage.getItem("userID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                if (json.HID < 0) {
                    $.mobile.loading('hide');
                    window.location.href = '#housemenu';
                }
                if (json.HID > 0) {
                    localStorage.setItem("houseID", json.HID);
                    window.location.href = '#home';
                    $.mobile.loading('hide');
                }
            }
        });
    }

});

// ------------------ LOGIN FUNCTIONS ---------------------

$( document ).on( "pageshow", "#login", function() {

    $('#loginSubmit').click(function() {
        login();
    });

    function login() {
        var loginUsername = $('#login-username').val();
        var loginPassword = $('#login-password').val();

        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/Service/UserAuthService.svc/login?username=' + loginUsername + '&password=' + loginPassword,
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                // checks whether a userID exists
                if (json.UID < 0) {
                    $('.calloutMessage').html("<h5>Please check that you entered your details correctly.</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                    $.mobile.loading('hide');
                }

                //if userID exists, store details in local storage and redirect to next page
                if (json.UID > 0) {
                    //sets user details to localStorage on login
                    localStorage.setItem("userID", json.UID);
                    localStorage.setItem("userName", loginUsername);
                    localStorage.setItem("userPassword", loginPassword);
                    window.location.href = '#loadingHouse';

                    $.mobile.loading('hide');
                }
            }
        });
    }
});




// ------------------ SIGNUP FUNCTIONS ---------------------

$( document ).on( "pageshow", "#signup", function() {


    $('#signupSubmit').click(function() {
        signup();
    });

    function signup() {
        var signupUsername = $('#signup-username').val();
        var signupName = $('#signup-name').val();
        var signupPassword = $('#signup-password').val();

        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/Service/UserAuthService.svc/createUser?username=' + signupUsername + '&password=' + signupPassword + '&email=' + signupName,
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                //if user is sucsessfully created, set user details to localStorage
                if(json.createdSuccess === true ) {
                    localStorage.setItem("userID", json.UID);
                    localStorage.setItem("userName", signupUsername);
                    localStorage.setItem("userPassword", signupPassword);
                    var userID = localStorage.getItem("userID");

                    window.location.href = 'index.html#housemenu';
                    $('.callout-footer').hide();
                    $.mobile.loading('hide');
                }
                else if (json.createdSuccess === false) {
                    $('.calloutMessage').html("<h5>Please ensure all fields are entered correctly.</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                    $.mobile.loading('hide');
                }
            }
        });
    }
});




// ------------------ HOUSE MENU FUNCTIONS ---------------------

$( document ).on( "pageshow", "#housemenu", function() {

    checkHouse();


    //checks whether the user currently has a house
    function checkHouse() {

        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/Service/HouseService.svc/getHouse?uid=' + localStorage.getItem("userID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                // if houseID does not exist, show join/create buttons
                if (json.HID < 0) {
                    $.mobile.loading('hide');
                    $(".housemenu-btn").css('opacity', '1');

                }
                // if houseID exists, store in localStorage and redirect to home
                if (json.HID > 0) {
                    localStorage.setItem("houseID", json.HID);
                    window.location.href = '#home';
                    $.mobile.loading('hide');
                }
            }
        });
    }
});




// ------------------ CREATE HOUSE FUNCTIONS ---------------------

$( document ).on( "pageshow", "#createhouse", function() {

    $('#createSubmit').click(function() {
        createHouse();
    });

    function createHouse() {
        var createHouseName = $('#create-name').val();
        var createHousePass = $('#create-password').val();
        var createHouseAddress = $('#create-address').val();
        var createHouseCity = $('#create-city').val();
        var createHouseState = $('#create-state').val();

        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/Service/HouseService.svc/createHouse?housename=' + createHouseName + '&password=' + createHousePass + '&uid=' + localStorage.getItem("userID") + '&addr=' +  createHouseAddress + '&city=' + createHouseCity + '&state=' + createHouseState,
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                // if house exists show error message
                if (json.HID < 0) {
                    $('.calloutMessage').html("<h5>That House already exists. Try another?</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                    $.mobile.loading('hide');
                }
                // if hosue exists, store HouseID in localStorage and redirect to home
                if (json.HID > 0) {
                    localStorage.setItem("houseID", json.HID);
                    window.location.href = '#home';
                    $.mobile.loading('hide');
                }
            }
        });
    }
});



// ------------------ JOIN HOUSE FUNCTIONS ---------------------

$( document ).on( "pageshow", "#joinhouse", function() {

    $('#joinSubmit').click(function() {
        joinHouse();
    });

    function joinHouse() {
        var joinUsername = $('#join-name').val();
        var joinPassword = $('#join-password').val();

        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/Service/HouseService.svc/joinHouse?housename=' + joinUsername + '&password=' + joinPassword + '&uid=' + localStorage.getItem("userID") + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                // if house does not exist, show error message
                if (json < 0) {
                    $('.calloutMessage').html("<h5>Please check that you entered your details correctly.</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                    $.mobile.loading('hide');
                }
                if (json > 0) {
                    localStorage.setItem("houseID", json.HID);
                    window.location.href = '#home';
                    $.mobile.loading('hide');
                }
            }
        });
    }
});




// ------------------ HOME FUNCTIONS ---------------------

$( document ).on( "pageshow", "#home", function() {

    getTenantID();

    $('#logoutButton').click(function() {
        $('.calloutMessage').html("<h5>You have been logged out.</h5>");
        $('.callout-footer').show().css('background', '#384047');
        localStorage.setItem("userID", -1);
        localStorage.setItem("userName", null);
        localStorage.setItem("userPassword", null);

    });

    function getTenantID() {

        $.ajax({
            url: 'http://www.housemate-app.com/Service/HouseService.svc/getTID?uid=' + localStorage.getItem("userID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                console.log(json);
                if (json> 0) {
                    localStorage.setItem("tenantID", json);
                }
            }
        });
    }
});




// ------------------ SHOPPING FUNCTIONS ---------------------

$( document ).on( "pageshow", "#shopping", function() {


    getItems();

    // Removes a Shopping Item from list when clicked
    $("#foodUL").on("click", "li", function(){
        var removeItemID = $(this).attr('id');
        buyItem(removeItemID);
        $(this).slideUp();
    });

    $("#cleanUL").on("click", "li", function(){
        var removeItemID = $(this).attr('id');
        buyItem(removeItemID);
        $(this).slideUp();
    });

    $("#otherUL").on("click", "li", function(){
        var removeItemID = $(this).attr('id');
        buyItem(removeItemID);
        $(this).slideUp();
    });

    function clearList() {
        $('#foodUL > li').remove();
        $('#cleanUL > li').remove();
        $('#otherUL > li').remove();
    }

    // Marks a Shopping Item as bought in the database
    function buyItem(itemID) {
        var hid = localStorage.getItem("houseID");

        $.ajax({
            url: 'http://www.housemate-app.com/service/ShoppingService.svc/buyItem?itemID='+itemID+'&houseID='+hid+'',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
            }
        });
    }

    // Populates Shopping List with Items
    function getItems() {

        $.mobile.loading('show');

        clearList();

        $.ajax({
            url: 'http://www.housemate-app.com/service/ShoppingService.svc/getList?houseID=' + localStorage.getItem("houseID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                var foodItem = '';
                var utilItem = '';
                var otherItem = '';
                console.log(json);
                $.each(json, function (index, value) {

                    var name = value.name.replace("jsonCallback", "??");
                    var desc = value.desc.replace("jsonCallback", "??");


                    if (value.category == "food") {
                        foodItem = '<li data-icon="false" id="' + value.itemID + '" class="food"><a href="#"><h3>' + name + '</h3><p>' + desc + '</p></a><div class="right-radio"><label for="checkbox-food' + value.itemID + '"></label><input type="checkbox" id="checkbox-food' + value.itemID + '" /></div></li>';
                        $('.foodList').append(foodItem).listview("refresh");
                    }
                    else if (value.category == "util") {
                        utilItem = '<li data-icon="false" id="' + value.itemID + '" class="util"><a href="#"><h3>' + name + '</h3><p>' + desc + '</p></a><div class="right-radio"><label for="checkbox-util' + value.itemID + '"></label><input type="checkbox" id="checkbox-util' + value.itemID + '" /></div></li>';
                        $('.cleaningList').append(utilItem).listview("refresh");
                    }
                    else if (value.category == "other") {
                        otherItem = '<li data-icon="false" id="' + value.itemID + '" class="other"><a href="#"><h3>' + name + '</h3><p>' + desc + '</p></a><div class="right-radio"><label for="checkbox-other' + value.itemID + '"></label><input type="checkbox" id="checkbox-other' + value.itemID + '" /></div></li>';
                        $('.otherList').append(otherItem).listview("refresh");
                    }
                });

                $.mobile.loading('hide');
            }
        });
    }


    // Add an Item to the when 'add' button is pressed
    $("#addItemToList").click(function () {

        addItem();

    });


    // Adds an Item to the Shopping List
    function addItem() {
        var itemName = $('#add-item-name').val();
        var itemDesc = $('#add-item-desc').val();
        var itemCategory = '';

        if ($('#radio-choice-food').prop("checked")) {
            itemCategory = "food";
        }
        else if ($('#radio-choice-util').prop("checked")) {
            itemCategory = "util";
        }
        else {
            itemCategory = "other";
        }

        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/service/ShoppingService.svc/addItem?houseID=' + localStorage.getItem("houseID") + '&name=' + itemName + '&desc=' + itemDesc + '&category=' + itemCategory + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                $.mobile.loading('hide');
                $('#add-item-name').val("");
                $('#add-item-desc').val("");
            }
        });
    }
});




// ------------------ BILLS FUNCTIONS ---------------------

$( document ).on( "pageshow", "#bills", function() {

    $.mobile.loading('show');

    var tenID = localStorage.getItem("tenantID");


    var IDs = [];
    getBills();

    function clearList() {
        $('.billsList > li').remove();
    }


    $(".billsList").on("click", "li", function(){
        var payBillID = $(this).attr('id');


        if(!($('.' + payBillID + ' > .tenant' + tenID + ':contains("PAID")').length > 0))
        {
            payBill(payBillID, tenID);

            var d = new Date();
            var shortDate = myFormatDate(d);

            var value = $('.' + payBillID + ' > .tenant' + tenID + '').html();
            $('.' + payBillID + ' > .tenant' + tenID + '').html("");
            $('.' + payBillID + ' > .tenant' + tenID + '').html('<strike>' + value + '</strike><br /><p style="font-size:x-small; color:green;">PAID: '+ shortDate +'</p>');
        }



    });


    function getBills() {

        clearList();

        $.ajax({
            url: 'http://www.housemate-app.com/service/BillService.svc/getBills?houseID=' + localStorage.getItem("houseID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp'})
            .done(function(json){
                var output = '';

                $.each(json, function (index, value) {
                    var tenants = '<ul class="' + value.billID + '">';
                    for(i=0;i<value.tNum;i++)
                    {
                        if(value.tIDs[i] != -1)
                        {
                            if(value.tPaid[i] != "")
                            {
                                var datePaid = value.tPaid[i].substr(0,10);
                                tenants += '<li class="tenant'+value.tIDs[i]+'" disabled><strike>'+ value.tNames[i] + ' - $' + value.tAmounts[i] + '</strike><br /><p style="font-size:x-small; color:green;">PAID: '+ datePaid +'</p></li>';
                            }
                            else
                            { 
                                tenants += '<li class="tenant'+value.tIDs[i]+'" disabled>'+ value.tNames[i] + ' - $' + value.tAmounts[i] +'</li>';
                            }
                            
                        }
                    }
                    tenants += "</ul>";

                    IDs.push(value.billID);
                    var ulID = 'invList' + value.billID;
                    //var jsonDate = ;
                    var dueDate = new Date(parseInt(value.dueDate.substr(6)));
                    var shortDate = myFormatDate(dueDate);

                    var today_L = new Date();

                    if(today_L.setHours(0,0,0,0) > dueDate.setHours(0,0,0,0))
                    {
                        output += '<li data-icon="false" id="' + value.billID + '"class=" ' + value.category + '"><a href="#"><h3>' + value.category + ' - $' + value.totalAmount + '</h3><p> DUE: <b style="color: red;">' + shortDate + ' (OVERDUE)</b> </p><ul class="' + ulID + '" data-role="listview" data-theme="f" data-inset="true">' + tenants + '</ul></a></li>';
                    }
                    else
                    {
                        output += '<li data-icon="false" id="' + value.billID + '"class=" ' + value.category + '"><a href="#"><h3>' + value.category + ' - $' + value.totalAmount + '</h3><p> DUE: ' + shortDate + ' </p><ul class="' + ulID + '" data-role="listview" data-theme="f" data-inset="true">' + tenants + '</ul></a></li>';
                    }
                });
                $('.billsList').append(output).listview("refresh");
                $.mobile.loading('hide');
          });
    }

    function payBill(billID, tenID)
    {
        $.ajax({
            url: 'http://www.housemate-app.com/service/BillService.svc/payBill?billID=' + billID + '&tenantID=' + tenID + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json){


            }
        }); 
    } 

});


// ------------------ ADD BILLS FUNCTIONS ---------------------

$(function(){
    $.datepicker.setDefaults({
            dateFormat: "yy-mm-dd"
        });
});

$( document ).on( "pageshow", "#addBill", function() {

    var hid = localStorage.getItem("houseID");

    var numTenants = 0;
    var IDs = [];


    getTenants(hid);
    $(".tenantList").hide();

    $('#checkbox-split').click(function() {

        if($("#checkbox-split").is(":checked")){
            $(".tenantList").slideUp();
        } 
        else{
            $(".tenantList").slideDown();
        }     
    });

    $(function(){ $("#datepicker").datepicker({dateFormat: "yy-mm-dd"}) });

    $("#addbill-amount").on('input propertychange paste', function(){
        var total = $("#addbill-amount").val();
        var singleCost = total/numTenants;
        $(".tenant-inputs").val(singleCost);

        console.log("lol");
    });

    $(".tenantList").click(function(){
        for(i=0;i<numTenants;i++)
        {
            $('#ten'+IDs[i]+'').on('input propertychange paste', function(){
                // var total = parseFloat($("#addbill-amount").val());
                // var split = parseFloat(total / numTenants);
                // var curr = parseFloat($(this).val());

                // var sub = true;

                // var diff;
                // if(curr > split) {diff = parseFloat(curr - split); sub = false;}
                // else {diff = parseFloat(split - curr); sub = true;}

                // $(".tenant-inputs").each(function(){

                //     if(sub)
                //     {
                //         //var c = parseFloat($(this).val());
                //         var cost = split + diff;
                //         $(this).val(cost);
                //     }
                //     else
                //     {
                //         //var c = parseFloat($(this).val());
                //         var cost = split - diff;
                //         $(this).val(cost);
                //     }
                // });

                // $(this).val(curr);
            }); 
        }
    });

    function checkSum()
    {
        var total = parseInt($("#addbill-amount").val());
        var sum = 0;
        for(i=0;i<numTenants;i++)
        {
            sum += parseInt($('#ten'+IDs[i]+'').val());
        }

        console.log(sum);
        console.log(total);

        if(total == sum)
        {
            return true;
        }
        else
        {
            return false;
        }      
    }

   
    $("#addBillSubmit").click(function(){
        
        if(checkSum())
        {
            var type = $("#addbill-type").val();
            var amount = $("#addbill-amount").val();


            var tenantIDs = '';
            for(i=0;i<numTenants;i++)
            {
                var ID = $('#ten'+IDs[i]+'').attr('id');
                var nID = ID.replace("ten", "");

                if(i+1 == numTenants) tenantIDs += nID;
                else tenantIDs += nID + '~';
            }


            var tAmounts = '';
            if($('#checkbox-split').is(':checked'))
            {
                var cost = amount / numTenants;
                for(i=0;i<numTenants;i++)
                {
                    if(i+1 == numTenants) tAmounts += cost;
                    else tAmounts += cost + '~';
                }

            }
            else
            {
                for(i=0;i<numTenants;i++)
                {
                    var tmpC = $('#ten'+IDs[i]+'').val();
                    var cost = '';
                    if(tmpC.length > 0)
                    {
                        cost = tmpC
                    }
                    else
                    {
                        cost = "0";
                    }

                    if(i+1 == numTenants) tAmounts += cost;
                    else tAmounts += cost + '~';
                    
                }
            }

            var date = $("#datepicker").val();

            addBill(hid, type, amount, date, tenantIDs, tAmounts);
            alert("paid");
        }
        else
        {
            alert("split amounts must equal overall cost");
        }

        
    });

    function clearList() {
        $(".tenantList > li").remove();
    }

    function getTenants(houseID)
    {
        clearList();

        $.ajax({
            url: 'http://www.housemate-app.com/service/HouseService.svc/getTenants?hid=' + houseID + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json){

                numTenants = $(json).length;

                tenants = '';

                $.each(json, function (index, value) {
                    tenants += '<li><label for="' + value.tenID + '">' + value.tenName + '</label><input class="tenant-inputs" type="text" id="ten' + value.tenID + '" placeholder="$" required></li>';
                    IDs.push(value.tenID);
                });

                $(".tenantList").append(tenants).listview("refresh");

            }
        }); 
    }

    function addBill(hid, type, amount, date, tenants, tAmounts)
    {
        $.ajax({
            url: 'http://www.housemate-app.com/service/BillService.svc/addBill?houseID='+hid+'&billType='+type+'&amount='+amount+'&dueDate='+date+'&tenantIDs='+tenants+'&tenantAmounts='+tAmounts+'' + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json){

            }
        });
    }



});





// ------------------ NOTICE FUNCTIONS ---------------------

$( document ).on( "pageshow", "#notices", function() {

    getNotices();

    function clearList() {
        $('.notice-container').children().remove();
        $('.iou-container').children().remove();
    }

    $('#addNoticeBtn').hide();
    $('#addIouBtn').hide();
    $("#noticeForm").hide();
    $("#iouForm").hide();
    $('#openNoticeBtn').show();
    $('#openIouBtn').show();

//    $("#addNoticeBtn").click(function(){
//        if($( '#noticeForm' ).is(":visible")){
//            $( '#noticeForm' ).slideUp();
//            addNotice();
//        } else{
//            $( '#noticeForm' ).slideDown();
//        }
//    });

    $('#openNoticeBtn').click(function(){
        $('#openNoticeBtn').hide();
        $('#addNoticeBtn').show();
        $('#noticeForm').slideDown();



        $('#addNoticeBtn').click(function(){

            var title = $('#add-notice-title').val();
            var message = $('#add-notice-message').val();
            if(title.length === 0 || message.length === 0){
                $('#openNoticeBtn').show();
                $('#addNoticeBtn').hide();
                $('#noticeForm').slideUp();
            }
            else {
                addNotice();
                $('#openNoticeBtn').show();
                $('#addNoticeBtn').hide();

                //clear input and hide form
                $('#add-notice-title').val("");
                $('#add-notice-message').val("");
                $('#noticeForm').slideUp();
            }
        });
    });

    $('#openIouBtn').click(function(){
        $('#openIouBtn').hide();
        $('#addIouBtn').show();
        $('#iouForm').slideDown();



        $('#addIouBtn').click(function(){

            var title = $('#add-iou-title').val();
            var message = $('#add-iou-message').val();
            if(title.length === 0 || message.length === 0){
                $('#openIouBtn').show();
                $('#addIouBtn').hide();
                $('#iouForm').slideUp();
            }
            else {
                addIOU();
                $('#openIouBtn').show();
                $('#addIouBtn').hide();

                //clear input and hide form
                $('#add-iou-title').val("");
                $('#add-iou-message').val("");
                $('#iouForm').slideUp();
            }
        });
    });

    function getNotices()
    {
        clearList();
        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/service/NoticeBoardService.svc/getNotices?houseID=' + localStorage.getItem("houseID") + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                var notice = '';
                var iou = '';
                console.log(json);
                $.each(json, function (index, value) {

                    var d = new Date(parseInt(value.date.substr(6)));
                    var shortDate = myFormatDate(d);

                    var message = value.noticeDesc.replace("jsonCallback", "??");
                    var title = value.noticeTitle.replace("jsonCallback", "??");

                    if (value.type == "notice") {
                        notice = '<div class="notice"><h3>' + title + ' - ' + shortDate + '</h3><p>' + message + '</p><p class="tenantName">- ' + value.tenantName + '</p></div>';
                        $('.notice-container').append(notice);
                    }
                    else if (value.type == "iou") {
                        iou = '<div class="iou"><h3>IOU - <span class="iou-title">' + title + '</span></h3><p>' + message + '</p><p class="tenantName">- ' + value.tenantName + ' ' + shortDate + '</p></div>';
                        $('.iou-container').append(iou);
                    }
                });

                $.mobile.loading('hide');
            }
        });
    }

    function addNotice() {
        var houseID = localStorage.getItem("houseID");
        var tenantID = localStorage.getItem("tenantID");
        var title = $('#add-notice-title').val();
        var message = $('#add-notice-message').val();
        var type = "notice";
        var d = new Date();
        var shortDate = myFormatDate(d);

        if(title === "" || message === "" ) {
            console.log("empty");
        }
        else {
            $.ajax({
                url: 'http://www.housemate-app.com/service/NoticeBoardService.svc/addNotice?houseID=' + houseID + '&tenantID=' + tenantID + '&title=' + title + '&message=' + message + ' &type=' + type + '',
                jsonpCallback: 'jsonCallback',
                contentType: 'application/json',
                dataType: 'jsonp',
                success: function (json) {
                    $('.notice-container').prepend('<div class="notice"><h3>' + title + ' - ' + shortDate + '</h3><p>' + message + '</p><p class="tenantName">- ' + name + '</p></div>');
                }
            });
        }
    }

    function addIOU()
    {
        var houseID = localStorage.getItem("houseID");
        var tenantID = localStorage.getItem("tenantID");
        var title = $('#add-iou-title').val();
        var message = $('#add-iou-message').val();
        var type = "iou";
        var d = new Date();
        var shortDate = myFormatDate(d);

        if(title === "" || message === "" ) {
            console.log("empty");
        }
        else {
            $.ajax({
                url: 'http://www.housemate-app.com/service/NoticeBoardService.svc/addNotice?houseID=' + houseID + '&tenantID=' + tenantID + '&title=' + title + '&message=' + message + '&type=' + type + '',
                jsonpCallback: 'jsonCallback',
                contentType: 'application/json',
                dataType: 'jsonp',
                success: function (json) {
                    $('.iou-container').prepend('<div class="iou"><h3>IOU - <span class="iou-title">' + title + '</span></h3><p>' + message + '</p><p class="tenantName">- ' + name + ' ' + shortDate + '</p></div>');
                }
            });
        }
    }

});

// ------------------ CHORES FUNCTIONS ---------------------
$( document ).on( "pageshow", "#chores", function() {

    fillChores();
    $('#openChoreBtn').show();
    $('#openAllocateBtn').show();

    $("#choreForm").hide();
    $("#addChoreBtn").hide();
    $("#allocateForm").hide();
    $("#addAllocateBtn").hide();

    $('#openChoreBtn').click(function(){
        $('#openChoreBtn').hide();
        $('#addChoreBtn').show();
        $('#choreForm').slideDown();



        $('#addChoreBtn').click(function(){

            var name = $('#add-chore-name').val();
            if(name.length === 0){
                $('#openChoreBtn').show();
                $('#addChoreBtn').hide();
                $('#choreForm').slideUp();
            }
            else {
                addChore(name);
                $('#openChoreBtn').show();
                $('#addChoreBtn').hide();

                //clear input and hide form
                $('#add-chore-name').val("");
                $('#choreForm').slideUp();
            }
        });
    });


    $('#openAllocateBtn').click(function(){
        $('#openAllocateBtn').hide();
        $('#addAllocateBtn').show();
        $('#allocateForm').slideDown();



        $('#addAllocateBtn').click(function(){

            var name = $('#add-chore-type').val();
            var realName = $('#add-chore-tenant option:selected').text();
            var day = $('#add-chore-date').val();
            var tid = $('#add-chore-tenant').val();
            if(name.length === 0 && tid.length === 0){
                $('#openAllocateBtn').show();
                $('#addAllocateBtn').hide();
                $('#allocateForm').slideUp();
            }
            else {
                allocateChore(name, realName, tid, day);
                $('#openAllocateBtn').show();
                $('#addAllocateBtn').hide();

                //clear input and hide form
                $('#add-allocate-name').val("");
                $('#allocateForm').slideUp();
            }
        });
    });

    function clearList()
    {
        $('.choreList > li').remove();
        $('.alloList > li').remove();
        $("#add-chore-tenant > option").remove();
        $("#add-chore-type > option").remove();
    }

    function addChore(name)
    {
        $.ajax({
            url: 'http://www.housemate-app.com/service/ChoreService.svc/addChore?hid=' + localStorage.getItem("houseID") + '&cName=' + name + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                $('.choreList').append('<li data-icon="false" class="chore"><a href="#"><h3>' + name + '</h3></a></li>').listview("refresh"); 
            }
        });
    }

    function allocateChore(name, realName, tid, dow)
    {
        $.ajax({
            url: 'http://www.housemate-app.com/service/ChoreService.svc/allocateChore?hid=' + localStorage.getItem("houseID") + '&cName='+name+'&tID='+tid+'&dow='+dow+'&cyc='+0+'',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                $('.alloList').append('<li data-icon="false" class="allo"><a href="#"><h3>' + name + '</h3><p>Who: ' + realName + '<br />When: ' + dow + '</p></a></li>').listview("refresh"); 
            }
        });
    }

    function fillChores()
    {
        $.mobile.loading('show');

        clearList();

        $.ajax({
            url: 'http://www.housemate-app.com/service/ChoreService.svc/getChores?hid=' + localStorage.getItem("houseID") + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                var chore = '';
                var allo = '';

                var tenNs = '';
                for(i=0;i<json[0].tNames.length;i++) tenNs += '<option value="' + json[0].tids[i] + '">' + json[0].tNames[i] + '</option>';
                $("#add-chore-tenant").append(tenNs);


                var cNames = '';
                for(i=0;i<json[0].cNames.length;i++) cNames += '<option value="' + json[0].cNames[i] + '">' + json[0].cNames[i] + '</option>';
                $("#add-chore-type").append(cNames);


                for(i=0;i<json[0].cNum;i++) chore += '<li data-icon="false" class="chore"><a href="#"><h3>' + json[0].cNames[i] + '</h3></a></li>';
                $('.choreList').append(chore).listview("refresh"); 


                $.each(json, function (index, value) {
                    if(value.choreName != "")
                    {
                        allo += '<li data-icon="false" class="allo"><a href="#"><h3>' + value.choreName + '</h3><p>Who: ' + value.tenName + '<br />When: ' + value.dow + '</p></a></li>';
                    }
                });

                $('.alloList').append(allo).listview("refresh");

                $.mobile.loading('hide');
            }
        });
    }


});

// ------------------ HOUSEINFO FUNCTIONS ---------------------

$( document ).on( "pageshow", "#houseinfo", function() {

    var editing = false;

    fillInfo();

    $(".inputs").hide();
    $(".labels").show();
    $("#editInfoBtn").click(function(){

        if(editing)
        {
            editInfo();
            $(".inputs").hide();
            $(".labels").show();
            // refresh page somehow
            editing = false;
        }
        else
        {
            $(".inputs").show();
            $(".labels").hide();
            fillTxtBoxes();
            editing = true;
        }

        
    });

    $("#leaveHouseBtn").click(function(){
        var r = confirm("Are you sure you want the leave the house?");
        if(r == true)
        {
            leaveHouse();
        }        
    });

    function fillInfo()
    {
        var houseID = localStorage.getItem("houseID");

        $.ajax({
            url: 'http://www.housemate-app.com/service/HouseService.svc/getInfo?hid=' + houseID + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                $("#hNameLbl").html(json.houseName);
                $("#hPwdLbl").html(json.housePwd);
                $("#wifiLbl").html(json.wifi);
                $("#binLbl").html(json.binNight);
            }
        });
    }

    function fillTxtBoxes()
    {
        $("#addhName").val($("#hNameLbl").html());
        $("#addhPwd").val($("#hPwdLbl").html());
        $("#addWifi").val($("#wifiLbl").html());
        $("#addBin").val($("#binLbl").html());
    }

    function editInfo()
    {
        var hid = localStorage.getItem("houseID");
        var name = $("#addhName").val();
        var pwd = $("#addhPwd").val();
        var wifi = $("#addWifi").val();
        var bin = $("#addBin").val();


        $.ajax({
            url: 'http://www.housemate-app.com/service/HouseService.svc/setInfo?hid=' + hid + '&hName=&hPwd=' + pwd + '&wifi=' + wifi + '&binNight=' + bin + '&recOrGre=recycling',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                $("#hNameLbl").html($("#addhName").val());
                $("#hPwdLbl").html($("#addhPwd").val());
                $("#wifiLbl").html($("#addWifi").val());
                $("#binLbl").html($("#addBin").val());
            }
        });
    }

    function leaveHouse()
    {
        $.ajax({
            url: 'http://www.housemate-app.com/service/HouseService.svc/leaveHouse?uid=' + localStorage.getItem("userID") + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                window.location.href = '#joinhouse';
            }
        });
    }

});

// ------------------ SETTINGS FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#settings", function() {

    var editing = false;
    var pwdEditing = false;
    fillInfo();

    $(".inputs").hide();
    $(".labels").show();
    $(".pwdReset").hide();

    $("#editSettingsBtn").click(function(){


        
    });

    $("#editPwdBtn").click(function(){

        if(pwdEditing)
        {
            $(".pwdReset").hide();
            // refresh page somehow
            pwdEditing = false;
        }
        else
        {
            $(".pwdReset").show();
            pwdEditing = true;
        }
        
    });

    function fillInfo()
    {
        $("#logLbl").append(localStorage.getItem("userName"));

        $.ajax({
            url: 'http://www.housemate-app.com/service/UserAuthService.svc/getTenant?tid=' + localStorage.getItem("userID") + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                $("#nameLbl").append(json);
            }
        });
    }

});

// ------------------ ANALYTICS FUNCTIONS ---------------------
$( document ).on( "pagecreate", "#analytics", function() {

    var pieData = [
                        {
                            value : 90,
                            color : "#384047",
                            label : 'Soon',
                            labelColor : '#F5F5F5',
                            labelFontSize : '1.1em',
                            labelAlign : 'center'
                        },
                        {
                            value : 180,
                            color : '#2ecc71',
                            label : 'Coming',
                            labelColor : "#F5F5F5",
                            labelFontSize : '1.1em',
                            labelAlign : 'center'
                        }
                    ];


                    var myChart = new Chart(document.getElementById("canvas").getContext("2d"));
                    var myPie = myChart.Pie(pieData, {
                                animationSteps: 100,
                                animationEasing: 'easeOutBounce'
                            });

});

// ------------------ GENERAL FUNCTIONS ---------------------

function myFormatDate(value) {
    return value.getDate() + "/" + (value.getMonth() + 1) + "/" + (value.getYear() - 100);
}
