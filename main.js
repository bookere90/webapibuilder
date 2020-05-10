$(document).ready(function(){
    
    getTabUrl(formatUrl);


});

function getTabUrl(callback){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0].url;
        return formatUrl(currentTab);
    });
}

function formatUrl(getTabUrl){
    // this function needs to get the environment URL and appends 'api/data/v9.1' to it
    let tabUrl = getTabUrl;
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
        let apiEndpoint = formattedUrl + "/api/data/v9.1";
        // store this in local storage for later use
        chrome.storage.local.set({"apiEndpoint": apiEndpoint}, function(){
            console.log("apiEndpoint set to ", apiEndpoint);
        });
    }
    else{
        console.log("This extension can only be used in a Dynamics environment.");
    }
}