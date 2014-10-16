

localStorage.setItem("userID", "1");
var userID = localStorage.getItem("userID");
$('#signupheader').html(userID);
console.log(userID);

// var userID = 0;

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
                    window.location.href = '#home';
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

    getBills();
    
    function getBills() {

       

        $.ajax({
            url: 'http://www.housemate-app.com/service/BillService.svc/getBills?houseID=1',
            jsonpCallback: 'jsonCallback',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json) {

                var output = '';
                var itemCounter = 0;

                $.each(json, function (index, value) {
                    var ulID = 'invList' + value.billID;
                    //itemCounter++; 
                    //var jsonDate = ;
                    var d = $.parseJSON(value.date, true);
                    output += '<li data-icon="false" class=" ' + value.category + '"><a href="#"><h3>' + value.category + '</h3><p> ' + d + ' <br /><ul class="' + ulID + '" data-role="listview" data-theme="f" data-inset="true"></ul><br /></p></a></li>';
                    getIndv(value.billID, ulID);

                });    
                $('.billsList').append(output).listview("refresh");
            }
        });
    }

    function getIndv(val, ID){
        
        
        $.ajax({
            url: 'http://www.housemate-app.com/service/BillService.svc/getIndividuals?billID=' + val + '',
            jsonpCallback: 'jsonCallback',
            async: false,
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (json2) {
                //var individuals = '';
                var indv = '';
                $.each(json2, function (index2, value2) {
                    indv += '<li>' + value2.tenantName + ' $' + value2.amount + '</li>';
                    
                });
                //if($('.indvList').length < 1){
                    $('.' + ID + '').append(indv).listview("refresh");
                //}
            }
        });
    }

});


 /*!

   2:   * jQuery.parseJSON() extension (supports ISO & Asp.net date conversion)

   3:   *

   4:   * Version 1.0 (13 Jan 2011)

   5:   *

   6:   * Copyright (c) 2011 Robert Koritnik

   7:   * Licensed under the terms of the MIT license

   8:   * http://www.opensource.org/licenses/mit-license.php

   9:   */

  (function ($) {

   

      // JSON RegExp

      var rvalidchars = /^[\],:{}\s]*$/;

      var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;

      var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;

      var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

      //var dateISO = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[.,]\d+)?Z/i;

      var dateISO = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[.,]\d+)?Z?/i;

      //var dateNet = /\/Date\((\d+)(?:-\d+)?\)\//i;

      var dateNet = /\/Date\((\d+)(?:[-\+]\d+)?\)\//i;

   

      // replacer RegExp

      var replaceISO = /"(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:[.,](\d+))?Z"/gi;

      var replaceNet = /"\\\/Date\((\d+)(?:-\d+)?\)\\\/"/gi;

   

      // determine JSON native support

      var nativeJSON = (window.JSON && window.JSON.parse) ? true : false;

      var extendedJSON = nativeJSON && window.JSON.parse('{"x":9}', function(k,v){return "Y";}) === "Y";

   

      var jsonDateConverter = function(key, value) {

          if (typeof(value) === "string")

          {

              if (dateISO.test(value))

              {

                  return new Date(value);

              }

              if (dateNet.test(value))

              {

                  return new Date(parseInt(dateNet.exec(value)[1], 10));

              }

          }

          return value;

      };

   

      $.extend({

          parseJSON: function(data, convertDates) {

              /// <summary>Takes a well-formed JSON string and returns the resulting JavaScript object.</summary>

              /// <param name="data" type="String">The JSON string to parse.</param>

              /// <param name="convertDates" optional="true" type="Boolean">Set to true when you want ISO/Asp.net dates to be auto-converted to dates.</param>

   

              if (typeof data !== "string" || !data) {

                  return null;

              }

   

              // Make sure leading/trailing whitespace is removed (IE can't handle it)

              data = $.trim(data);

   

              // Make sure the incoming data is actual JSON

              // Logic borrowed from http://json.org/json2.js

              if (rvalidchars.test(data

                  .replace(rvalidescape, "@")

                  .replace(rvalidtokens, "]")

                  .replace(rvalidbraces, "")))

              {

                  // Try to use the native JSON parser

                  if (extendedJSON || (nativeJSON && convertDates !== true))

                  {

                      return window.JSON.parse(data, convertDates === true ? jsonDateConverter : undefined);

                  }

                  else

                  {

                      data = convertDates === true ?

                          data.replace(replaceISO, "new Date(parseInt('$1',10),parseInt('$2',10)-1,parseInt('$3',10),parseInt('$4',10),parseInt('$5',10),parseInt('$6',10),(function(s){return parseInt(s,10)||0;})('$7'))")

                              .replace(replaceNet, "new Date($1)") :

                          data;

                      return (new Function("return " + data))();

                  }

              } else

              {

                  $.error("Invalid JSON: " + data);

              }

          }

      });

  })(jQuery);
