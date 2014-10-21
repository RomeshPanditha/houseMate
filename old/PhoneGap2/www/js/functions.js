

    if(localStorage.getItem("userID") > 0) {
        $.ajax({
            url: 'http://www.housemate-app.com/Service/UserAuthService.svc/login?username=' + localStorage.getItem("userName") + '&password=' + localStorage.getItem("userPassword"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                if(json.UID > 0) {
                    console.log("auto login worked!");
                    window.location.href = '#housemenu';
                }

            }
        });
    }

// }
//      localStorage.setItem("userID", json.UID);
//     var userID = localStorage.getItem("userID");
//     console.log(userID);

// });

   



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
                if(json.createdSuccess == true ) {
                    localStorage.setItem("userID", json.UID);
                    localStorage.setItem("userName", signupUsername);
                    localStorage.setItem("userPassword", signupPassword);
                    var userID = localStorage.getItem("userID");
                    console.log(userID);

                    window.location.href = 'index.html#housemenu';
                    $('.callout-footer').hide();
                } 
                else if (json.createdSuccess == false) {
                    $('.calloutMessage').html("<h5>Please ensure all fields are entered correctly.</h5>")
                    $('.callout-footer').show().css('background', '#d6372d');
                }
            }
        });
    }
});




// ------------------ HOUSEMENU FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#housemenu", function() {

    checkHouse();

    function checkHouse() {

        $.ajax({
            url: 'http://www.housemate-app.com/Service/HouseService.svc/getHouse?uid=' + localStorage.getItem("userID"),
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                if (json.HID < 0) {
                    console.log("No HouseID")
                }
                if (json.HID > 0) {
                    console.log("House ID Check worked")
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
            url: 'http://www.housemate-app.com/Service/HouseService.svc/joinHouse?housename=' + joinUsername + '&password=' + joinPassword + '&uid=' + UID,
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json) {
                if (json < 0) {
                    $('.calloutMessage').html("<h5>Please check that you entered your details correctly.</h5>");
                    $('.callout-footer').show().css('background', '#d6372d');
                }
                if (json > 0) {
                    window.location.href = '#home';
                }
            }
        });
    }
});




// ------------------ HOME FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#home", function() {

    $('#logoutButton').click(function() {
        $('.calloutMessage').html("<h5>You have been logged out.</h5>");
        $('.callout-footer').show().css('background', '#384047');
        localStorage.setItem("userID", -1);
        localStorage.setItem("userName", null);
        localStorage.setItem("userPassword", null);

    });
});




// ------------------ SHOPPING FUNCTIONS ---------------------

$( document ).on( "pagecreate", "#shopping", function() {

    getItems();

    // Populates Shopping List with Items
    function getItems() {
        $.ajax({
            url: 'http://www.housemate-app.com/service/ShoppingService.svc/getList?houseID=1',
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
                        foodItem = '<li data-icon="false" class="food"><a href="#"><h3>' + value.name + '</h3><p>' + value.desc + '</p></a><div class="right-radio"><label for="checkbox-food' + value.itemID + '"></label><input type="checkbox" id="checkbox-food' + value.itemID + '" /></div></li>';
                        $('.foodList').append(foodItem).listview("refresh");
                    }
                    else if (value.category == "util") {
                        utilItem = '<li data-icon="false" class="util"><a href="#"><h3>' + value.name + '</h3><p>' + value.desc + '</p></a><div class="right-radio"><label for="checkbox-util' + value.itemID + '"></label><input type="checkbox" id="checkbox-util' + value.itemID + '" /></div></li>';
                        $('.cleaningList').append(utilItem).listview("refresh");
                    }
                    else if (value.category == "other") {
                        otherItem = '<li data-icon="false" class="other"><a href="#"><h3>' + value.name + '</h3><p>' + value.desc + '</p></a><div class="right-radio"><label for="checkbox-other' + value.itemID + '"></label><input type="checkbox" id="checkbox-other' + value.itemID + '" /></div></li>';
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

        $.ajax({
            url: 'http://www.housemate-app.com/service/ShoppingService.svc/addItem?houseID=1&name=' + itemName + '&desc=' + itemDesc + '&category=' + itemCategory + '',
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


    function getBills()
    {
        $.ajax({
            url: 'http://www.housemate-app.com/service/BillService.svc/getBills?houseID=1',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',})
            .done(function(json){
                var output = '';

                $.each(json, function (index, value) {
                    var tenants = '<div id="tenants" style="">';
                    for(i=0;i<value.tNum;i++)
                    {
                        tenants += '<li>'+ value.tNames[i] + ' - $' + value.tAmounts[i] +'</li>'
                    }
                    tenants += "</div>";

                    IDs.push(value.billID);
                    var ulID = 'invList' + value.billID;
                    //var jsonDate = ;
                    var date = new Date(parseInt(value.dueDate.substr(6)));
                    var shortDate = formatDate(date);
                    output += '<li data-icon="false" class=" ' + value.category + '"><a href="#"><h3>' + value.category + ' - $' + value.totalAmount + '</h3><p> DUE: ' + shortDate + ' <br /><ul class="' + ulID + '" data-role="listview" data-theme="f" data-inset="true">' + tenants + '</ul><br /></p></a></li>';
                    //getIndv(value.billID, ulID);

                });

                $('.billsList').append(output).listview("refresh");

                // $.each(json, function (index, value) {
                //       var ulID = 'invList' + value.billID;
                //      getIndv(value.billID, ulID);
                //  });
            });
    }

    function formatDate(value)
    {
        return value.getDate() + "/" + (value.getMonth() + 1) + "/" + (value.getYear() - 100);
    }
});












