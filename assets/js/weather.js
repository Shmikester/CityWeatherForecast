// runs current weather api call with city lat/long
var getDailyWeather = function (lat, lon, city)
{
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=a1364c280dc3fda0fe7ee53a8dbd7bbf";
    fetch(forecastApiUrl).then(function (response)
    {
        if (response.ok)
        {
            response.json().then(function (data)
            {
                displayDailyWeather(data, city);
            });
        };
    });

};

// receives data parameter from getDailyWeather function and will dynamically display data to page
var displayDailyWeather = function (data, city)
{
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    for (var i = 0; i < 6; i++)
    {
        var dailyUnixTime = data.daily[i].dt;
        var millisecond = dailyUnixTime * 1000;
        var dailyDate = new Date(millisecond);
        var dailyDate = dailyDate.toLocaleString("en-US", options);

        var weatherList = $("<div>").addClass("columns");
        var cityTemp = $("<div>").text("Temprature: " + data.daily[i].temp.day + "F");
        var cityWind = $("<div>").text("Wind: " + data.daily[i].wind_speed + " Mph");
        var cityHumid = $("<div>").text("Humidity: " + data.daily[i].humidity + "%");

        if (i === 0)
        {
            console.log(data.daily[i].uvi);
            var date = $("<h2>").text(`${city} (${dailyDate})`);
            var uvi = $("<div>").text("UVI: " + data.daily[i].uvi);
            weatherList.append(date, cityTemp, cityWind, cityHumid, uvi);
            $("#weatherTodaySection").append(weatherList);
        }
        else
        {
            var date = $("<div>").text(dailyDate);
            var cityImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
            weatherList.append(date, cityImage, cityTemp, cityWind, cityHumid);
            $("#forecastSection").append(weatherList);
        }
    };
};