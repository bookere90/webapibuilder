$(document).ready(function(){;
    // 
    initializer(formatUrl);

    $("#queryExecute").click(function(){
        $("#mainFrame").attr("src", "querypage.html")
    })

});

function initializer(callback){
    // pulls the URL from the tab that the extension is opened from
    // sets the main API endpoint and saves it to chrome storage for other pages to access
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        tabUrl = tabs[0].url;
        callback(tabUrl);
    });
}

function formatUrl(tabUrl){
//     // this function needs to get the environment URL and appends 'api/data/v9.1' to it
//     let tabUrl = getTabUrl;
    // ensure that the url is a Dynamics environment
    let regex = /https:\/\/.*\.crm\.dynamics\.com.*/;

    if(regex.test(tabUrl)){
        // set regex1 to match only the envName.crm.dynamics.com portion of the URL
        let regex1 = /https:\/\/.*\.crm\.dynamics\.com/;
        // remove everything after the regex1 matched portion
        let subString = tabUrl.split(regex1);
        // go back to original URL and remove everything after dynamics.com
        let formattedUrl = tabUrl.replace(subString[1], "");
        // take original environment domain and append API endpoint to it
        apiEndpoint = formattedUrl + "/api/data/v9.1";
        // store this in local storage for later use
        chrome.storage.local.set({"apiEndpoint": apiEndpoint}, function(){
            console.log("apiEndpoint set to ", apiEndpoint);
        });
    }
    else{
        console.log("This extension can only be used in a Dynamics environment.");
    }
}

