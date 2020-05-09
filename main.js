$(document).ready(function(){
    getTabs();
});


function getTabs(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        if(currentTab){
            let tabUrl = currentTab.url;
            console.log(tabUrl);
            return tabUrl;
        }
    });
}
