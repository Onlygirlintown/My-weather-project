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

function degreeConversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = ((temperatureElement - 32) * 5) / 9;
}

let degreeChange = document.querySelector("#degree-celsius");
degreeChange.addEventListener("click", degreeConversion);

function displayTemperature(response) {
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
}
function searchTemperature(event) {
  event.preventDefault();
  let urlRoot = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiKey = "ff603b4615415a7ed5f7b26e07b59db6";
  let cityName = document.querySelector("#city-search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName.value}`;
  let units = "imperial";
  let apiUrl = `${urlRoot}${cityName.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchTemperature);
