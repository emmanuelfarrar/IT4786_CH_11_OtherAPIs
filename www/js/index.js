var list = "";          //for access to the list
var masterList;         //for access to the masterList

window.onload = function() {
    document.addEventListener('deviceready', init, false);
    init();     //delete to run on device
}

/** init()
 * sets the masterList to the correct DOM element
 * calls the loadList() so we can auto load a list when the app first runs
 */
function init() {
    masterList = document.getElementById('masterList');
    loadList();
}

/** addToList()
 * stores the value entered by a user as var itemToAdd.
 * if value != null or empty add it to the list.
 * call display()
 * reset value to empty
 */
function addToList() {
    var itemToAdd = document.getElementById('listItem').nodeValue;

    if (itemToAdd != null && itemToAdd != "") {
        list += itemToAdd + ",";
        displayList();
        document.getElementById('listItem').value = "";
    }
}

/** displayList()
 * > creates var output that will hold the HTML for the new list items
 * > Uses the CSV parser to create an array listArray from the CSV string that was stored
 * in list.
 * > list is created with a trailing comma which the CSV parser understands as signaling
 * a new value. This value results in an empty final array element in listArray, which
 * is removed using listArray.pop()
 * > Next loop through the elements in listArray and append them to output as HTML list terms.
 * > Once this is completed wet the inner HTML of masterList <ul> element to the value of output
 * and use jQuery to refresh the masterList Listview.
 */
function displayList() {
    var output = "";
    var listArray = $.csv.toArray(list);
    listArray.pop();

    for(var i = 0; i < listArray.length; i++) {
        output += "<li>" + listArray[i] + "</li>";
    }
    masterList.innerHTML = output;
    $(masterList).listview().listview('refresh');
}

/** clearList()
 * sets the list to empty
 * uses displayList() to display that empty string (so clearing the masterList)
 */
function clearList() {
    list = "";
    displayList();
}

function saveList() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFS, onError);
}

function onFS(fs){
    fs.root.getFile("list.txt", {
        create: true, exclusive: false },
        onFile, onError);
}

function onFile(file) {
    file.createWriter(onWriter, onError);
}

function onWriter(writer) {
    writer.onwriteend = function() {
        console.log("File written");
    }
    writer.write(list);
}

function loadList() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSLoad, onError);
}

function onFSLoad(fs) {
    fs.root.getFile("list.txt", {create: true, exclusive: false}, gotFileLoad, onError);
}

function gotFileLoad(theFile) {
    theFile.file(readFile, onError);
}

function readFile(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        list = evt.target.result;
        displayList();
    };
    reader.readAsText(file);
}

function onError(e) {
    alert(e.code);
}