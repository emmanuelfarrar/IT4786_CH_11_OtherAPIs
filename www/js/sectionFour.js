/** install the following plugins
 * phonegap plugin add cordova-plugin-vibration
 * phonegap plugin add cordova-plugin-dialogs
 */

 window.onload = function() {
     this.document.addEventListener('deviceready', init, false);
     this.init();
 }

 /** init()
  * Will launch th device notification using the alert() of notification obj.
  * alert() takes up to 4 properties...
  * 1 - alert message
  * 2 - a callback function to run after the alert has been dismissed
  * 3 - an OPTIONAL alert box title
  * 4 - an OPTIONAL alert box button message
  */
 function init() {
     navigator.notification.alert(
         "You rock!",       //Message
         alertDismiss,      //callback
         "Queen Fan",       //Title
         "Complete"         //Button message
     );
 }

 /**alertDismiss()
  * The alert callback function
  * container is modified to show the alert was dismissed and we will then use vibrate() and the notification obj 
  * to vibrate the device for 1 second.
  */
 function alertDismiss(){
     document.getElementById('container').innerHTML = "<h2>Alert Dismissed</h2>";
     navigator.notification.vibrate(1000);
 }