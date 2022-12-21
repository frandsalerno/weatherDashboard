var apiKey = '90f53e4b76bf31d91f16549c1f6c4b8f';

var searchInput = $('#city-search');

var todayIcon = $('.today-wicon');
var todayDate = $('#today');
var todayTemp = $('.today-data .temp');
var todayWind = $('.today-data .wind');
var todayHumidity = $('.today-data .humidity');

var city = '';
var cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast&appid=${apiKey}`;

var todayCity = $('.todays-weather h2')

function fetchWeather(event){
    var keyCode = event.keyCode;

    if (keyCode === 13){

        city = searchInput.val().toUpperCase();
        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(function(currentData){
            var lat= currentData.coord.lat;
            var lon= currentData.coord.lon;
            var icon = currentData.weather[0].icon;
            console.log(icon);
            todayCity.text(city);
            todayDate.text(moment().format('DD/MM/YY'));
            todayTemp.text(`${Math.round(currentData.main.temp)} C°`);
            todayWind.text(`${Math.round(currentData.wind.speed)*1.6} Km/H`);
            todayHumidity.text(`${currentData.main.humidity}%`);

            $(todayIcon).attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);  
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

    }
}

// $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
// .then(function(currentData){
//     var lat= currentData.coord.lat;
//     var lon= currentData.coord.lon;
//     console.log(currentData);
//     console.log(`
//     --------CURRENT CONDITIONS---------
//         Temp: ${Math.round(currentData.main.temp)} C°
//         Wind: ${currentData.wind.speed} M/S
//         Humidity: ${currentData.main.humidity}%
//     `);

//     $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
//     .then(function(forecastData){
//         console.log(forecastData);
//     })
// });

function init(){
    searchInput.keydown(fetchWeather)
}

init();