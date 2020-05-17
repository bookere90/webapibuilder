$(document).ready(function(){;

    initializer(setEntityMetaData, getEntityCollections, populateEntityList);

    function populateEntityList(metadataArray){
        console.log("In the function. Here is the array: ", metadataArray);
        let unsortedArray = [];
        for(i = 0; i < Object.keys(metadataArray["value"]).length; i++){
            let collectionName = metadataArray["value"][i].LogicalCollectionName;
            if(collectionName != null){
                unsortedArray.push(collectionName);
            }
        }
        let sortedArray = unsortedArray.sort();
        for(i = 0; i < sortedArray.length; i++){
            $("#entityDropdown").append(`<option>${sortedArray[i]}</option>`);
        }
    }
});

function getEntityCollections(entityMetadata, callback){
    let retrievedMetadataArray = entityMetadata;
    callback(retrievedMetadataArray);
}

function initializer(callback, cb2, cb3){
    chrome.storage.local.get(["apiEndpoint"], function(result){
        callback(result.apiEndpoint, cb2, cb3);
    });
}

function setEntityMetaData(url, callback, cb3){
    url += "/EntityDefinitions?$select=LogicalName, LogicalCollectionName";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    var entityMetadata = JSON.parse(xhttp.response);
    chrome.storage.local.set({"entityMetadataArray": entityMetadata}, function(){
        console.log("entityMetadataArray is set.");
        callback(entityMetadata, cb3);
    });
    }
};
xhttp.open("GET", url, true);
xhttp.send();
}



