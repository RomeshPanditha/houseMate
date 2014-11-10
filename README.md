HouseMate
=========

HouseMate is a sharehouse management app designed to streamline the complexities of sharehouse living - helping tenants organise and track their bills, shopping, notices, and chores all in an easily accessible and user-friendly mobile interface.

You can find our project landing page at http://www.housemate-app.com/

Team:
- Harrison Dempsey
- Romesh Wickramasekera
- Kane Marzol

Instructions for marking:

NOTE: The app requires an internet connection to run, there is no offline support at this time.

Browser:
- To test the app in a browser simply navigate to 'root/PhoneGap/www' and open the index.html file (I recommend Google Chrome or Firefox).
- When testing in browser, try to avoid use of 'refresh', the project is designed to be a native app not a web app, and does not support this feature well. If you need to simulate opening and closing the application, go to the end of the URL and delete everything to the right of the "#" symbol, and then the symbol itself, and press enter.	

Android:
- Inside the folder 'Android APK' there is a file named "*****". Transfer this file to an android device via transfer cable or dropbox and open the file. You will be prompted to install the application. Upon install in this way you will then be able to test the app as though it is a native app on the Android device.

iOS & wp8:
Due to restrictions with licensing and development environments the process of testing on these devices is slightly more complicated and abstracted. The applications must be run from a local phonegap server using the project directory to push the app to each device (This will also work with android).

- First you must install Node.js on your machine (http://nodejs.org/)
- Then in your command line you can install phonegap using the command 'npm install -g phonegap' (http://phonegap.com/install/)
- Now in your command line navigate to the project directory and into the 'PhoneGap' folder. ( eg 'C:/houseMate/PhoneGap')
- Now execute the command 'phonegap serve'. This will start a phonegap server and give you an IP address
- On both devices you can now download the Phonegap application (simply search phonegap) and use the IP address from the server to start the applications on those devices

(more information about this process found at http://app.phonegap.com/)

NOTE: In the phonegap application you can quad tap on the app to refresh, simulating application close and re-open.

Login Information:
 For ease of testing, we've included some pre-existing user accounts and houses.
 Login details are as follows:
  - Username: Sally
  - Password: Pokemon123
  
  - Username: Billy
  - Password: billy45
  
  - Username: Toby
  - Password: Pokemon123

  They are all assigned to the same house, and can interact with each-other accordingly.
