let now = new Date();
let weekDay = document.querySelector("#day-of-week");
let time = document.querySelector("#time-of-day");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${hours}:${minutes}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
weekDay.innerHTML = `${day}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "sunday",
    "monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#week-forecast");
  let forecastHtml = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <li class="row forecast-days">
              <span class="col days" id="days">${formatDay(
                forecastDay.dt
              )}</span>
              <span class="col"> <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="42" /> </span>
              <span class="col forecast-temp-max"> max: ${Math.round(
                forecastDay.temp.max
              )}°F</span>
              <span class="col forecast-temp-min"> min: ${Math.round(
                forecastDay.temp.min
              )}°F</span>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coord) {
  let apiKey = "ff603b4615415a7ed5f7b26e07b59db6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  document.querySelector("#degree").innerHTML = ` ${Math.round(
    response.data.main.temp
  )}°`;

  document.querySelector(
    "#weather-description"
  ).innerHTML = `weather: ${response.data.weather[0].description}`;
  document.querySelector("#wind-element").innerHTML = `wind speed: ${Math.round(
    response.data.wind.speed
  )} mph`;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function celsiusConverter(event) {
  event.preventDefault();
  let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;
  console.log(celsiusTemperature);
  document.querySelector("#degree").innerHTML = `${Math.round(
    celsiusTemperature
  )}°`;
}

function searchTemperature(cityName) {
  let urlRoot = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiKey = "ff603b4615415a7ed5f7b26e07b59db6";
  let units = "imperial";
  let apiUrl = `${urlRoot}${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName.value}`;

  searchTemperature(cityName.value);
}

let farenheitTemperature = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", citySubmit);

let celsiusElement = document.querySelector("#degree-celsius");
celsiusElement.addEventListener("click", celsiusConverter);

searchTemperature("San Diego");
