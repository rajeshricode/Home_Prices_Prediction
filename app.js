function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
        if(uiBHK[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1; //Invalid value
}

function getBathValue() {
    var uiBath = document.getElementsByName("uiBath");
    for(var i in uiBath) {
        if(uiBath[i].checked) {
            return parseInt(i)+1;
        }
    }
    return -1; //Invalid value
}



function EstimatePrice(){
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bath = getBathValue();
    var location = document.getElementById("uilocation");
    var estPrice = document.getElementById("uiEstimatePrice");

    var url = "http://127.0.0.1:5000/predict_home_price";
    //var url ="/api/predict_home_price";
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bath,
        location: location.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + "Lakh </h2>";
        console.log(status);
    });

    estPrice.innerHTML = "<h2>" + 219.14 + "Lakh </h2>";
}



function onPageLoad() {
    console.log("Document loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    //var url ="/api/get_location_names";
    $.get(url,function(data, status) {
        console.log("got response from get_location_names request");
        if(data) {
            var locations = data.locations;
            var uilocation = document.getElementById("uilocation");
            $('#uilocation').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uilocation').append(opt);
            }
        }
    });




}

window.onload = onPageLoad;
