require 'rubygems'
require 'pushmeup'
GCM.host = 'https://android.googleapis.com/gcm/send'
GCM.format = :json
GCM.key = "AIzaSyA1hvhEexT3eqQQHXgKE7DLU9FW2UZbkNs"
destination = ["APA91bGZrz7cLscCwhzRMpG1AlKXzLUoxX9uAygovPq2Atu4AYiXb3n6YHRpRF4bV_-MnVJCj9r8oGAeRkJctzWLiGeeWgJF9Ut8A2Cc0QQnD8Nbp6-MYWaDXMsQVNnjtEdK-3UloPYB0LvlGAT3PBO5iDy4NguYBZEbIYpJqOlNJNjv-tRTE"]
data = {:message => "PhoneGap Build rocks!", :msgcnt => "1", :soundname => "beep.wav"}

GCM.send_notification( destination, data)
