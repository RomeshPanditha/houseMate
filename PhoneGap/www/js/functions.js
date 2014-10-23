

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




// ------------------ LOGIN FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#login", function() {

    $('#loginSubmit').click(function() {
        login();
    });

    function login() {
        var loginUsername = $('#login-username').val();
        var loginPassword = $('#login-password').val();

        $.ajax({
            url: 'http://www.housemate-app.com/Service/UserAuthService.svc/login?username=' + loginUsername + '&password=' + loginPassword,
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                if (json.UID < 0) {
                    $('.calloutMessage').html("<h5>Please check that you entered your details correctly.</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                }
                if (json.UID > 0) {
                    //sets user details to localStorage on login
                    localStorage.setItem("userID", json.UID);
                    localStorage.setItem("userName", loginUsername);
                    localStorage.setItem("userPassword", loginPassword);
                    window.location.href = '#housemenu';
                }
            }
        });
    }
});




// ------------------ SIGNUP FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#signup", function() {

    $('#signupSubmit').click(function() {
        signup();
    });

    function signup() {
        var signupUsername = $('#signup-username').val();
        var signupEmail = $('#signup-email').val();
        var signupPassword = $('#signup-password').val();

        $.ajax({
            url: 'http://www.housemate-app.com/Service/UserAuthService.svc/createUser?username=' + signupUsername + '&password=' + signupPassword + '&email=' + signupEmail,
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
                }
                else if (json.createdSuccess === false) {
                    $('.calloutMessage').html("<h5>Please ensure all fields are entered correctly.</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                }
            }
        });
    }
});




// ------------------ HOUSE MENU FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#housemenu", function() {

    checkHouse();

    //checks whether the user currently has a house
    function checkHouse() {

        $.ajax({
            url: 'http://www.housemate-app.com/Service/HouseService.svc/getHouse?uid=' + localStorage.getItem("userID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                if (json.HID < 0) {
                    //console.log("No HouseID");
                }
                if (json.HID > 0) {
                    //console.log("House ID Check worked");
                    localStorage.setItem("houseID", json.HID);
                    window.location.href = '#home';
                }
            }
        });
    }
});




// ------------------ CREATE HOUSE FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#createhouse", function() {

    $('#createSubmit').click(function() {
        createHouse();
    });

    function createHouse() {
        var createHouseName = $('#create-name').val();
        var createHousePass = $('#create-password').val();
        var createHouseAddress = $('#create-address').val();
        var createHouseCity = $('#create-city').val();
        var createHouseState = $('#create-state').val();


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
                }
                if (json.HID > 0) {
                    localStorage.setItem("houseID", json.HID);
                    window.location.href = '#home';
                }
            }
        });
    }
});



// ------------------ JOIN HOUSE FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#joinhouse", function() {

    $('#joinSubmit').click(function() {
        joinHouse();
    });

    function joinHouse() {
        var joinUsername = $('#join-username').val();
        var joinPassword = $('#join-password').val();

        $.ajax({
            url: 'http://www.housemate-app.com/Service/HouseService.svc/joinHouse?housename=' + joinUsername + '&password=' + joinPassword + '&uid=' + localStorage.getItem("userID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                console.log(json);
                if (json < 0) {
                    $('.calloutMessage').html("<h5>Please check that you entered your details correctly.</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                }
                if (json > 0) {
                    localStorage.setItem("houseID", json.HID);
                    window.location.href = '#home';
                }
            }
        });
    }
});




// ------------------ HOME FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#home", function() {

    getTennantID();

    $('#logoutButton').click(function() {
        $('.calloutMessage').html("<h5>You have been logged out.</h5>");
        $('.callout-footer').show().css('background', '#384047');
        localStorage.setItem("userID", -1);
        localStorage.setItem("userName", null);
        localStorage.setItem("userPassword", null);

    });

    function getTennantID() {

        $.ajax({
            url: 'http://www.housemate-app.com/Service/HouseService.svc/getTID?uid=' + localStorage.getItem("userID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                console.log(json);
                if (json> 0) {
                    localStorage.setItem("tennantID", json);
                }
            }
        });
    }
});




// ------------------ SHOPPING FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#shopping", function() {

    getItems();

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

    function buyItem(itemID)
    {
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

                    if (value.category == "food") {
                        foodItem = '<li data-icon="false" id="' + value.itemID + '" class="food"><a href="#"><h3>' + value.name + '</h3><p>' + value.desc + '</p></a><div class="right-radio"><label for="checkbox-food' + value.itemID + '"></label><input type="checkbox" id="checkbox-food' + value.itemID + '" /></div></li>';
                        $('.foodList').append(foodItem).listview("refresh");
                    }
                    else if (value.category == "util") {
                        utilItem = '<li data-icon="false" id="' + value.itemID + '" class="util"><a href="#"><h3>' + value.name + '</h3><p>' + value.desc + '</p></a><div class="right-radio"><label for="checkbox-util' + value.itemID + '"></label><input type="checkbox" id="checkbox-util' + value.itemID + '" /></div></li>';
                        $('.cleaningList').append(utilItem).listview("refresh");
                    }
                    else if (value.category == "other") {
                        otherItem = '<li data-icon="false" id="' + value.itemID + '" class="other"><a href="#"><h3>' + value.name + '</h3><p>' + value.desc + '</p></a><div class="right-radio"><label for="checkbox-other' + value.itemID + '"></label><input type="checkbox" id="checkbox-other' + value.itemID + '" /></div></li>';
                        $('.otherList').append(otherItem).listview("refresh");
                    }
                });
            }
        });
    }


    // Add an Item to the when 'add' button is pressed
    $("#addItemToList").click(function () {

        addItem();

    });


    // Adds an Item to the Shopping List'
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

        $.ajax({
            url: 'http://www.housemate-app.com/service/ShoppingService.svc/addItem?houseID=' + localStorage.getItem("houseID") + '&name=' + itemName + '&desc=' + itemDesc + '&category=' + itemCategory + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                $('.foodList').listview("refresh");
                $('.cleaningList').listview("refresh");
                $('.otherList').listview("refresh");
            }
        });
    }
});




// ------------------ BILLS FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#bills", function() {

    var IDs = [];
    getBills();


    function getBills() {
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
                    var ulID = 'invList' + value.billID;
                    //var jsonDate = ;
                    var date = new Date(parseInt(value.dueDate.substr(6)));
                    var shortDate = formatDate(date);
                    output += '<li data-icon="false" class=" ' + value.category + '"><a href="#"><h3>' + value.category + ' - $' + value.totalAmount + '</h3><p> DUE: ' + shortDate + ' </p><ul class="' + ulID + '" data-role="listview" data-theme="f" data-inset="true">' + tenants + '</ul></a></li>';

                });
                $('.billsList').append(output).listview("refresh");
          });
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

});



// ------------------ NOTICE FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#notices", function() {

    getNotices();

    $("#noticeForm").hide();
    $("#iouForm").hide();

    $(".notices-nav").click(function(){$("#noticeForm").hide();$("#iouForm").hide();});

    $("#addNoticeBtn").click(function(){
        if($( '#noticeForm' ).is(":visible")){
            $( '#noticeForm' ).slideUp();
            addNotice();
        } else{
            $( '#noticeForm' ).slideDown();
            $( '#addNoticeBtn' ).html("Add").removeClass("ui-btn-icon-notext").css("height", "18px");
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

                    if (value.type == "notice") {
                        notice = '<div class="notice"><h3>' + value.noticeTitle + ' - ' + shortDate + '</h3><p>' + value.noticeDesc + '</p><p class="tenantName">- ' + value.tenantName + '</p></div>';
                        $('.notice-container').append(notice);
                    }
                    else if (value.type == "iou") {
                        iou = '<div class="iou"><h3>IOU - <span class="iou-title">' + value.noticeTitle + '</span></h3><p>' + value.noticeDesc + '</p><p class="tenantName">- ' + value.tenantName + ' ' + shortDate + '</p></div>';
                        $('.iou-container').append(iou);
                    }
                });
            }
        });
    }

    function addNotice() {
        var houseID = localStorage.getItem("houseID");
        var tenantID = localStorage.getItem("tennantID");
        var title = $('#add-notice-title').val();
        var message = $('#add-notice-message').val();
        var type = "notice";
        var d = new Date();
        var shortDate = formatDate(d);

        $.ajax({
            url: 'http://www.housemate-app.com/service/NoticeBoardService.svc/addNotice?houseID=' + houseID + '&tenantID=' + tenantID + '&title=' + title + '&message=' + message + '&type=' + type + '',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                $('.notice-container').prepend('<div class="notice"><h3>' + title + ' - ' + shortDate + '</h3><p>' + message + '</p><p class="tenantName">- ' + name + '</p></div>');
            }
        });
    }

    function addIOU()
    {
        var houseID = localStorage.getItem("houseID");
        var tenantID = localStorage.getItem("tennantID");
        var title = $('#add-iou-title').val();
        var message = $('#add-iou-message').val();
        var type = "iou";
        var d = new Date();
        var shortDate = formatDate(d);

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
            url: 'http://www.housemate-app.com/service/HouseService.svc/setInfo?hid=' + hid + '&hName=' + name + '&hPwd=' + pwd + '&wifi=' + wifi + '&binNight=' + bin + '&recOrGre=recycling',
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

});


// ------------------ GENERAL FUNCTIONS ---------------------

function formatDate(value) {
    return value.getDate() + "/" + (value.getMonth() + 1) + "/" + (value.getYear() - 100);
}