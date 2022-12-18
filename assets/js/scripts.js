// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}


var apiKey = '90f53e4b76bf31d91f16549c1f6c4b8f';
var city = 'London';
var cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast&appid=${apiKey}`;

$.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
.then(function(currentData){
    var lat= currentData.coord.lat;
    var lon= currentData.coord.lon;
    console.log(currentData);
    console.log(`
    --------CURRENT CONDITIONS---------
        Temp: ${Math.round(currentData.main.temp)} C°
        Wind: ${currentData.wind.speed} M/S
        Humidity: ${currentData.main.humidity}%
    `);

    $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function(forecastData){
        console.log(forecastData);
    })
});

