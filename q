[1mdiff --cc PhoneGap/www/js/functions.js[m
[1mindex 7b94804,62a8c1d..0000000[m
[1m--- a/PhoneGap/www/js/functions.js[m
[1m+++ b/PhoneGap/www/js/functions.js[m
[36m@@@ -458,12 -486,10 +496,14 @@@[m [m$( document ).on( "pageshow", "#bills"[m
                      {[m
                          output += '<li data-icon="false" id="' + value.billID + '"class=" ' + value.category + '"><a href="#"><h3>' + value.category + ' - $' + value.totalAmount + '</h3><p> DUE: ' + shortDate + ' </p><ul class="' + ulID + '" data-role="listview" data-theme="f" data-inset="true">' + tenants + '</ul></a></li>';[m
                      }[m
[31m- [m
[31m-                     [m
[31m- [m
                  });[m
[31m-                 $('.billsList').append(output).listview("refresh");[m
  [m
[32m+                 $('.billsList').append(output).listview("refresh");[m
[32m++<<<<<<< HEAD[m
[32m++[m
[32m++=======[m
[32m+                 $.mobile.loading('hide');[m
[32m++>>>>>>> 487700893270d274d5d79e25fb9a669232a11de6[m
            });[m
      }[m
  [m
[36m@@@ -498,8 -524,7 +538,8 @@@[m
  [m
                  });[m
                  $('.billsList').append(output).listview("refresh");[m
[32m++                [m
              });[m
[31m- [m
      }[m
  [m
      function payBill(billID, tenID)[m
