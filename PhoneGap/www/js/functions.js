

// if a userID has been stored in localStorage, attempt to auto-login
if(localStorage.getItem("userID") > 0) {
    $.ajax({
        url: 'http://www.housemate-app.com/Service/UserAuthService.svc/login?username=' + localStorage.getItem("userName") + '&password=' + localStorage.getItem("userPassword"),
        jsonpCallback: 'jsonCallback',
        contentType: 'application/json',
        dataType: 'jsonp',

        success: function (json) {
            if(json.UID > 0) {
                window.location.href = '#housemenu';
            }

        }
    });
}
$(document).on({
    ajaxStart: function() {
        $.mobile.loading('show');
    },
    ajaxStop: function() {
        $.mobile.loading('hide');
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
                if (json.UID < 0) {
                    $('.calloutMessage').html("<h5>Please check that you entered your details correctly.</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                    $.mobile.loading('hide');
                }
                if (json.UID > 0) {
                    //sets user details to localStorage on login
                    localStorage.setItem("userID", json.UID);
                    localStorage.setItem("userName", loginUsername);
                    localStorage.setItem("userPassword", loginPassword);
                    window.location.href = '#housemenu';

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
                console.log(json);
                if(json.createdSuccess === true ) {
                    //sets user details to localStorage on signup
                    localStorage.setItem("userID", json.UID);
                    localStorage.setItem("userName", signupUsername);
                    localStorage.setItem("userPassword", signupPassword);
                    var userID = localStorage.getItem("userID");
                    console.log(userID);

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
                if (json.HID < 0) {
                    //console.log("No HouseID");
                    $.mobile.loading('hide');
                }
                if (json.HID > 0) {
                    //console.log("House ID Check worked");
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
                console.log("success");
                console.log(json);
                if (json.HID < 0) {
                    $('.calloutMessage').html("<h5>Please check that you entered your details correctly.</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                    $.mobile.loading('hide');
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
                console.log(json);
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
            var foodItem = '<li data-icon="false" class="food"><a href="#"><h3>' + itemName + '</h3><p>' + itemDesc + '</p></a><div class="right-radio"><label for="checkbox-food"></label><input type="checkbox" id="checkbox-food" /></div></li>';
            $('.foodList').append(foodItem).listview("refresh");
        }
        else if ($('#radio-choice-util').prop("checked")) {
            itemCategory = "util";
            var utilItem = '<li data-icon="false" class="util"><a href="#"><h3>' + itemName + '</h3><p>' + itemDesc + '</p></a><div class="right-radio"><label for="checkbox-util"></label><input type="checkbox" id="checkbox-util" /></div></li>';
            $('.cleaningList').append(utilItem).listview("refresh");
        }
        else {
            itemCategory = "other";
            var otherItem = '<li data-icon="false" class="util"><a href="#"><h3>' + itemName + '</h3><p>' + itemDesc + '</p></a><div class="right-radio"><label for="checkbox-util"></label><input type="checkbox" id="checkbox-util" /></div></li>';
            $('.otherList').append(otherItem).listview("refresh");
        }

        $('#add-item-name').val("");
        $('#add-item-desc').val("");

        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/service/ShoppingService.svc/addItem?houseID=' + localStorage.getItem("houseID") + '&name=' + itemName + '&desc=' + itemDesc + '&category=' + itemCategory + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                $('.foodList').listview("refresh");
                $('.cleaningList').listview("refresh");
                $('.otherList').listview("refresh");
                $.mobile.loading('hide');
            }
        });
    }
});




// ------------------ BILLS FUNCTIONS ---------------------

$( document ).on( "pageshow", "#bills", function() {

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
            var shortDate = formatDate(d);

            var value = $('.' + payBillID + ' > .tenant' + tenID + '').html();
            $('.' + payBillID + ' > .tenant' + tenID + '').html("");
            $('.' + payBillID + ' > .tenant' + tenID + '').html('<strike>' + value + '</strike><br /><p style="font-size:x-small; color:green;">PAID: '+ shortDate +'</p>');
        }

        

    });


    function getBills() {

        clearList();

        $.mobile.loading('show');

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
                    var shortDate = formatDate(dueDate);

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

    function checkOverdue(date1, date2, value)
    {
        
    }

    function getTenants(){
        $.ajax({
            url: 'http://www.housemate-app.com/service/BillService.svc/getBills?houseID=' + localStorage.getItem("houseID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp'})
            .done(function(json){
                var output = '';

                $.each(json, function (index, value) {
                    var tenants = '';
                    for(i=0;i<value.tNum;i++)
                    {
                        tenants += '<li>'+ value.tNames[i] + ' - $' + value.tAmounts[i] +'</li>';
                    }
                    tenants += "";

                    IDs.push(value.billID);
                    var ulID = 'tenantList' + value.billID;
                    //var jsonDate = ;
                    var date = new Date(parseInt(value.dueDate.substr(6)));
                    var shortDate = formatDate(date);
                    output += '<li data-icon="false" class=" ' + value.category + '"><a href="#"><h3>' + value.category + ' - $' + value.totalAmount + '</h3><p> DUE: ' + shortDate + ' </p><ul class="' + ulID + '" data-role="listview" data-theme="f" data-inset="true">' + tenants + '</ul></a></li>';

                });
                $('.billsList').append(output).listview("refresh");
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



// ------------------ NOTICE FUNCTIONS ---------------------

$( document ).on( "pageshow", "#notices", function() {

    getNotices();

    $("#noticeForm").hide();
    $("#iouForm").hide();

    $("#addNoticeBtn").click(function(){ 
        if($( '#noticeForm' ).is(":visible")){
            $( '#noticeForm' ).slideUp();
                addNotice();
        } else{
            $( '#noticeForm' ).slideDown();
            $( '#addNoticeBtn' ).html("Add").removeClass("ui-btn-icon-notext").css("ui-icon-plus");
        }
    });


    $("#addIouBtn").click(function(){
        if($( '#iouForm' ).is(":visible")){
            $( '#iouForm' ).slideUp();
            addIOU();
        } else{
            $( '#iouForm' ).slideDown();
            $( '#addIouBtn' ).html("Add").removeClass("ui-btn-icon-notext").css("height", "18px");
        }
    });

    function getNotices()
    {
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
                    var shortDate = formatDate(d);

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
        var shortDate = formatDate(d);

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
        var shortDate = formatDate(d);

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

    function fillChores()
    {
        $.mobile.loading('show');

        $.ajax({
            url: 'http://www.housemate-app.com/service/ChoreService.svc/getChores?hid=' + localStorage.getItem("houseID") + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {

                var chore = '';
                var allo = '';

                for(i=0;i<json[0].cNum;i++)
                {
                    chore += '<li data-icon="false" class="chore"><a href="#"><h3>' + json[0].cNames[i] + '</h3></a></li>';
                }
                $('.choreList').append(chore).listview("refresh");  

                $.each(json, function (index, value) {

                    allo += '<li data-icon="false" class="allo"><a href="#"><h3>' + value.choreName + '</h3><p>Who: ' + value.tenName + '<br />When: ' + value.dow + '</p></a></li>';
      
                });

                $('.alloList').append(allo).listview("refresh");

                $.mobile.loading('hide');
            }
        });
    }


});

// ------------------ HOUSEINFO FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#houseinfo", function() {

    var editing = false;

    fillInfo();

    $(".space").hide();
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
        leaveHouse();

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
                $("#hNameLbl").append(json.houseName);
                $("#hPwdLbl").append(json.housePwd);
                $("#wifiLbl").append(json.wifi);
                $("#binLbl").append(json.binNight);
            }
        });
    }

    function fillTxtBoxes()
    {
        //$("#addhName").val($("#hNameLbl").html());
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
                //$("#hNameLbl").html($("#addhName").val());
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

    $(".space").hide();
    $(".inputs").hide();
    $(".labels").show();
    $(".pwdReset").hide();

    $("#editInfoBtn").click(function(){

        
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

// ------------------ GENERAL FUNCTIONS ---------------------

function formatDate(value) {
    return value.getDate() + "/" + (value.getMonth() + 1) + "/" + (value.getYear() - 100);
}