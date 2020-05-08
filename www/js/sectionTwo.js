window.onload = function() {
    document.addEventListener('deviceready', init, false);
    init();     //delete to run on device
}
function init() {
    var output = "Model: " + device.model;
    output +="<br/>Cordova: " + device.cordova;
    output +="<br/>Platform: " + device.platform;
    output +="<br/>UUIDL " + device.uuid;
    output +="<br/>Version: " + device.version;

    document.getElementById('result').innerHTML = output;
}