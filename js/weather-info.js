var apiKey = "dc34a3ba73e8c4598f81979f8d09201d"; //API KEY to validly work;
var apiReq = new XMLHttpRequest();
var weatherApiResp;

var stringUS = ",us";
var stringMetric = "&units=metric";
var stringAppId = "&appid=";

//search by city name
document.getElementById('getWeather-btn').addEventListener('click', function(event){
    if(document.getElementById('weatherZip').value !== ""){ //if zip request only;
        var url = "http://api.openweathermap.org/data/2.5/weather?zip="
            + document.getElementById('weatherZip').value
            + stringUS
            + stringMetric
            + stringAppId
            + apiKey;


    } else{ //city request
        var url = "http://api.openweathermap.org/data/2.5/weather?q="
            + document.getElementById('weatherCity').value
            + stringMetric
            + stringAppId
            + apiKey;
    }
//asynchronous request
    apiReq.open('GET', url, true);
    apiReq.addEventListener('load', function(){
        //making sure that the status code is between 200 and 400.
        //>400 is generally errors.
        if(apiReq.status >= 200 && apiReq.status < 400){
            weatherApiResp = JSON.parse(apiReq.responseText);

            //display the temp
            document.getElementById('weatherImg').src = "http://openweathermap.org/img/w/" + weatherApiResp.weather[0].icon + ".png"; //gets photo
            document.getElementById('temperature').textContent = weatherApiResp.main.temp + " degrees *C";
            document.getElementById('humidity').textContent = weatherApiResp.main.humidity + "%";
            document.getElementById('city').textContent = weatherApiResp.name;

            document.getElementById('weatherZip').value = null;
            document.getElementById('weatherCity').value = null;
        } else {
            console.log("Error: " + apiReq.status + apiReq.statusText);
        }

    });
    apiReq.send(null);

    //button doesnt refresh the page
    event.preventDefault();
});
