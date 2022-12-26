var apiKey = '90f53e4b76bf31d91f16549c1f6c4b8f';

var searchInput = $('#city-search');

var todayIcon = $('.today-wicon');
var todayDate = $('#today');
var todayTemp = $('.today-data .temp');
var todayWind = $('.today-data .wind');
var todayHumidity = $('.today-data .humidity');

var fiveDaysForecast = [];
var forecastWrapper = $('#forecast-container');

var searchHistory = $('.search-history');
var localSearches = [];
var cityListed = $('.city-explored');

var city = '';
var cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
var forecastURL = `https://api.openweathermap.org/data/2.5/forecast&appid=${apiKey}`;

var todayCity = $('.todays-weather h2');

var emptyContent = $('.empty');

var contentWeather = $('#content-weather');

//Get local IP and location with external API

var localCity = '';

function json(url) {
    return fetch(url).then(function(res) {
      return res.json();
    });
  }
  
var apiKeyIP = 'be05c2ac1abfca28d8c91e722892ef960cdcf09eec575743b6f65c18';


if (JSON.parse(localStorage.getItem('cities')) != null) {
    localSearches = JSON.parse(localStorage.getItem('cities'));
    $(localSearches).each(function(i, city){
        searchHistory.append(`
        <li class="city-explored">${city}</li>
        `)
    });
    // emptyContent.addClass('hide');
    weatherDashboard(localSearches[localSearches.length-1]);
}else{
    json(`https://api.ipdata.co?api-key=${apiKeyIP}`).then(data => {
        localCity = data.city;
        weatherDashboard(localCity);
        console.log(localCity);
    });
}

searchHistory.on( "click", function(event) {
    weatherDashboard($(event.target).text());
  });

var cityListed = $('.city-explored');

function weatherDashboard(city){

    $.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)

    .catch(function(event){
        if(event.status == 404){
            alert ('This City could not be found, please try another one');
            return;
        }
        
    })

    .then(function(currentData){
        
        var lat= currentData.coord.lat;
        var lon= currentData.coord.lon;
        var icon = currentData.weather[0].icon;
        // console.log(icon);
        todayCity.text(city);
        todayDate.text(moment().format('DD/MM/YY'));
        todayTemp.text(`${Math.round(currentData.main.temp)} C°`);
        todayWind.text(`${Math.round((currentData.wind.speed)*1.6)} Km/H`);
        todayHumidity.text(`${currentData.main.humidity}%`);

        $(todayIcon).attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);  
    
        $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(function(forecastData){
            // console.log(forecastData.list);
            fiveDaysForecast.push(forecastData.list);
            // console.log(fiveDaysForecast);
            

            $(fiveDaysForecast[0]).each(function(i, day){

                var dayTime = day.dt_txt;

                // console.log(value.dt_txt);
                if(dayTime.includes('15:00')){
                    // console.log(day);

                    var forecastIco = day.weather[0].icon
                    var forecastDay = dayTime.split(' ');
                    var forecastDay = moment(forecastDay[0], 'YYYY MM DD').format('DD/MM/YY');
                    // console.log(forecastDay);
                    var forecastTemp = day.main.temp;
                    var forecastWind = day.wind.speed;
                    var forecastHumidity= day.main.humidity;
                
                    

                    forecastWrapper.append(`
                    <div class="daily-forecast">
                    <img src="http://openweathermap.org/img/wn/${forecastIco}@2x.png">
                    <h4>${forecastDay}</h4>
                    <p class="forecast-data">
                      Temp: ${Math.round(forecastTemp)} C° <br>
                      Wind: ${Math.round((forecastWind)*1.6)} KPH<br>
                      Humidity: ${forecastHumidity}%
                    </p>
                 </div>
                    
                    `);
                }
            });

        })
        emptyContent.addClass('hide');
        contentWeather.removeClass('hide');
        searchInput.val('');
        forecastWrapper.html('');
    });
}

function fetchWeather(event){
    var keyCode = event.keyCode;


    if (keyCode === 13){
        forecastWrapper.html('');
        city = searchInput.val().toUpperCase();
        
        weatherDashboard(city);
        
        if(!localSearches.includes(city)){
            localSearches.push(city);
            console.log(localSearches);
            searchHistory.append(`
            <li class="city-explored">${city}</li>
            `)
        }

        localStorage.setItem('cities', JSON.stringify(localSearches));


    }
}


function init(){
    searchInput.keydown(fetchWeather)
}

init();


