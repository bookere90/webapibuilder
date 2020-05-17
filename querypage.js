$(document).ready(function(){;

    storeEntities(getEntityCollections);

    // perhaps optimize this later.
    function populateEntityList(){
        chrome.storage.local.get(["entityArray"], function(result){
            let entityList = result.entityArray["value"];
            for(var i = 0; i < entityList.length; i++){
                let entityCollection = entityList[i].name;
                $("#entityDropdown").append($(`<option>${entityCollection}</option>`));
            }
        });
    }
    populateEntityList();
    prepareEntityMetadata();
});

function storeEntities(callback){
    chrome.storage.local.get(["apiEndpoint"], function(result){
        console.log(result.apiEndpoint);
        callback(result.apiEndpoint);
    });
}

function getEntityCollections(url){
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

xhttp.open("GET", url, true);
xhttp.send();
}

function prepareEntityMetadata(){
    chrome.storage.local.get(["entityArray"], function(result){
        entities = result.entityArray;
        let entityCollection;
        let entityLogicalName;
        let entityLogicalNameArray = [];
        for(var i = 0; i < entities["value"].length; i++){
            entityCollection = entities["value"][i].name;
            let lastChar = entityCollection.charAt(entityCollection.length-1);
            if(lastChar == "s"){
                entityLogicalName = entityCollection.substring(0, entityCollection.length -1);          
                entityLogicalNameArray.push(entityLogicalName);
            }
            else{
                entityLogicalNameArray.push(entityCollection);
            }
        }
        console.log(entityLogicalNameArray);
    });
}

