$(document).ready(function(){;

    storeEntities(getEntityList);

    // perhaps optimize this later.
    function populateEntityList(){
        chrome.storage.local.get(["entityArray"], function(result){
            let entityList = result.entityArray["value"];
            for(var i = 0; i < entityList.length; i++){
                let entityName = entityList[i].name;
                $("#entityDropdown").append($(`<option>${entityName}</option>`));
            }
        });
    }

    populateEntityList();

});



function storeEntities(callback){
    chrome.storage.local.get(["apiEndpoint"], function(result){
        console.log(result.apiEndpoint);
        callback(result.apiEndpoint);
    });
}

function getEntityList(url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       var entityList = JSON.parse(xhttp.response);
       console.log(entityList);
       chrome.storage.local.set({"entityArray": entityList}, function(){
           console.log("entityArrray is set.");
       });
    }
};
xhttp.responseType = "json";
xhttp.open("GET", url, true);
xhttp.send();
}