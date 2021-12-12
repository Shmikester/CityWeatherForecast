//Third version: encompasses input city autocomplete text box, pulling API info for places, and mapping said places.
let map;
let autocomplete;
let service;
let cityCenterObj;
let mapMarkers = [];

initAutoComplete();

//creates the autocomplete input text box functionality
function initAutoComplete()
{
    autocomplete = new google.maps.places.Autocomplete(document.getElementById("citySearch"), {
        types: ["(cities)"],
        componentRestrictions: { "country": ["US"] },
        fields: ["name", "geometry"]
    });

    //adds listener if the city is changed
    autocomplete.addListener("place_changed", valueChanged);
}

//event listener to call map and places change if a city is entered/selected
function valueChanged()
{
    var city = autocomplete.getPlace();
    $("#weatherTodaySection").empty();
    $("#weather").empty();

    if (!city.geometry)
    {
        document.getElementById("citySearch").placeholder = "Enter City Name";
    }
    else
    {
        document.getElementById("citySearch").innerHTML = city.name;
        getDailyWeather(city.geometry.location.lat(), city.geometry.location.lng(), city.name);
    }
}