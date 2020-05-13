$(document).ready(function(){;


});


function getEntityList(url){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       entityList = xhttp.response;
       return entityList;
    }
};
xhttp.responseType = "json";
xhttp.open("GET", url, true);
xhttp.send();
}