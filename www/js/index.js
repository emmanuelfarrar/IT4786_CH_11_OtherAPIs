var list = "";
var masterList;

window.onload = function() {
    document.addEventListener('deviceready', init, false);
    init();     //delete to run on device
}

function init() {
    masterList = document.getElementById('masterList');
    loadList();
}

function addToList() {
    var itemToAdd = document.getElementById('listItem').nodeValue;

    if (itemToAdd != null && itemToAdd != "") {
        list += itemToAdd + ",";
        displayList();
        document.getElementById('listItem').value = "";
    }
}

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