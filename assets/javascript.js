var resultContentEl = document.getElementById('weather-container');
var forecastEl = document.getElementById('forecast-container');
var searchBtn = document.getElementById('btn');
var resultTextEl = document.getElementById('city-name');
var forecastH1El = document.getElementById('forecastH1');
var apiKey = 'd3975cb6a831a386713ebf67ed1e5363';
var cityNameChosen = ''
var dateMoment = moment().format('DD/MM/YYYY')


function searchApi(cityName) {
  if (cityName) {
    var locQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apiKey;
  }

  fetch(locQueryUrl, {
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const lon = data.coord.lon
      const lat = data.coord.lat
      cityNameChosen = data.name
      console.log(cityNameChosen);
      weatherApi()

      function weatherApi() {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + apiKey;

        fetch(apiUrl, {
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            printResults(data)
            printForecastResults(data)
          });
      }
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var cityInputVal = document.getElementById('city-input').value;


  if (!cityInputVal) {
    console.error('You need a search input value!');
    return;
  }

  searchApi(cityInputVal);
}

document.getElementById('user-form').addEventListener('submit', handleSearchFormSubmit)

function printResults(resultObj) {
  console.log(resultObj);
  resultContentEl.innerHTML = ''

  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = cityNameChosen + ' (' + dateMoment + ')'

  var imgEl = document.createElement('img');
  imgEl.src = ("http://openweathermap.org/img/w/" + resultObj.current.weather[0].icon + ".png")

  titleEl.append(imgEl)

  var tempContentEl = document.createElement('p');
  tempContentEl.innerHTML = 'Temp: ' + resultObj.current.temp + ' °C';

  var windContentEl = document.createElement('p');
  windContentEl.innerHTML = 'Wind: ' + resultObj.current.wind_speed + ' MPH';

  var humidityContentEl = document.createElement('p');
  humidityContentEl.innerHTML = 'Humidity: ' + resultObj.current.humidity + '%';

  var uvContentEl = document.createElement('p');
  uvContentEl.innerHTML = 'UV Index: ';

  var uviEl = document.createElement('span');
  if (resultObj.current.uvi < 3) {
    uviEl.classList.add('low')
  } else if (resultObj.current.uvi >= 3 < 7) {
    uviEl.classList.add('mod')
  } else {
    uviEl.classList.add('high')
  }
  uviEl.innerHTML = resultObj.current.uvi;
  uvContentEl.append(uviEl)

  resultBody.append(titleEl, tempContentEl, tempContentEl, windContentEl, humidityContentEl, uvContentEl);
  
  resultContentEl.append(resultCard);
}


function printForecastResults(resultObj) {
  forecastEl.innerHTML = ''
  forecastH1El.classList.remove("hide")
  for (var i = 1; i < 6; i++) {

    var dateMoment1 = moment().add(i, 'd');
    var dateMoment1format = dateMoment1.format('DD/MM/YYYY')

    var resultCard = document.createElement('div');
    resultCard.classList.add('forecast');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = dateMoment1format

    var imgEl = document.createElement('img');
    imgEl.src = ("http://openweathermap.org/img/w/" + resultObj.daily[i].weather[0].icon + ".png")

    var tempContentEl = document.createElement('p');
    tempContentEl.innerHTML = 'Max Temp: ' + resultObj.daily[i].temp.max + ' °C';

    var windContentEl = document.createElement('p');
    windContentEl.innerHTML = 'Wind: ' + resultObj.daily[i].wind_speed + ' MPH';

    var humidityContentEl = document.createElement('p');
    humidityContentEl.innerHTML = 'Humidity: ' + resultObj.daily[i].humidity + '%';

    resultBody.append(titleEl, imgEl, tempContentEl, tempContentEl, windContentEl, humidityContentEl);

    forecastEl.append(resultCard);
  }
}








