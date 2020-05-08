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

/**********************************************
 * > In order to save the list using the File API we need to create a set of objects to work
 * with the file system.
 * > First we request a file system object, then we pass that file system object to a function 
 * that either gets pr creates a file. After that we pass a reference to that file to a 
 * a function that will create a writer object that can write to a file. 
 * The writer obj is then passed to another function which actually writes to the file 
 * **********************************************/

/** saveList()
 * function that when it is called it request a file system where the app can store data.
 * The options passed define the type of file system, and two callback functions for a success
 * and failure.
 * When successful call the file system object is passed to the success callback (onFS())
 */ 
function saveList() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFS, onError);
}

/**onFS()
 * is passed a file system obj and calls a method of the file system object getFile(). 
 * That method takes a filename "list.txt" a set of options, and success and failure callback functions.
 * The options tell the file system whether or not it should create the file if it does not exist, (set to "true")
 * and whether or not the app should have exclusive access to thsi file (set to "false").
 * The success callback function is passed the file entry obj that results from getFile().
 * 
 * @param {*} fs 
 */
function onFS(fs){
    fs.root.getFile("list.txt", {
        create: true, exclusive: false },
        onFile, onError);
}

/**onFile(file)
 * function is called by onFS() and is passed a file entry object. 
 * The function calls the createWriter() of the file entry object to create a writer obj that is able to
 * acttually write data to the file.
 * The createWriter() takes two parameters (both callbacks) onWriter for success and onError for failure
 * 
 * @param {*} file 
 */
function onFile(file) {
    file.createWriter(onWriter, onError);
}


/**onWriter()
 * where the file writing actually takes place. 
 * It is passed a writer obj, writer. This has a method write() that writes to the file.
 * Befor we call the method, we set the onwriteend attribute of writer to define what to do when its write()
 * method completes. In our case we log a message to console.
 * Finally, we call the write() with our list string var as a parameter to write our list to permanent storage.
 * 
 * @param {*} writer 
 */
function onWriter(writer) {
    writer.onwriteend = function() {
        console.log("File written");
    }
    writer.write(list);
}

/** loadList()
 * loading the data from a previously saved file follows a similar pattern.
 * Instead of writing we are reading. 
 * Request the local permanent file system, but pass the file system obj to onFSLoad()
 */
function loadList() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSLoad, onError);
}

/** onFSLoad(fs)
 * 
 * uses getFile() to access "list.txt", creating it again if needed.
 * If successful, getFile() calls gotFileLoad()
 * 
 * @param {*} fs 
 */
function onFSLoad(fs) {
    fs.root.getFile("list.txt", {create: true, exclusive: false}, gotFileLoad, onError);
}

/** gotFileLoad(theFile)
 * passed a file entry object as theFile and then calls the file entry obj file().
 * This methods creates a file object that contains file properties. 
 * If successful it calls readFile(), if it fails it calls onError()
 * 
 * @param {*} theFile 
 */
function gotFileLoad(theFile) {
    theFile.file(readFile, onError);
}


/**readFile(file)
 * we create a new FileReader obj that we name reader and set its onloadend attribute.
 * The onloadend attribute defines what happens when the FileReader obj finishes reading a file.
 * In this case once list.txt is read we want to take the resultof the read event and set it as 
 * the value of the list global var and then call the displayList() to display the list to the user .
 * To actually read the file we use the FileReader obj readAsText() and pass it the file to be read as a
 * parameter.
 * 
 * @param {*} file 
 */
function readFile(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        list = evt.target.result;
        displayList();
    };
    reader.readAsText(file);
}

/**onError(e)
 * just alerts with the error code that is passed to it.
 * 
 * @param {*} e 
 */
function onError(e) {
    alert(e.code);
}