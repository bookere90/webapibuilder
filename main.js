$(document).ready(function(){
    function getEnvironment(){
        let tabUrl = window.location.toString();
        alert(tabUrl);
    }

    $("#body").load(function() {
        getEnvironment();
    });

});
