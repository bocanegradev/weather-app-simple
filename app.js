// APIKEY: 82005d27a116c2880c8f0fcb866998a0

//!Selecting elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//! Data app
//! Objeto weather
const weather = {};

weather.temperature = {
    unit: "celcius"
}

//! Constants and variables
const KELVIN = 273;
const apikey = "4d225a9af7f9ef7f837f396ba13f2de5";
//ORIGINAL: const apikey = "82005d27a116c2880c8f0fcb866998a0";

//! Geolocation validation on browser
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Tu dispositivo no soporta la Geolocalización :(</p>";
}

//! Set user position
function setPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeather(lat, lon);
}

//! Show error wiht location issue
function showError(e) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${e.message}</p>`;
}

//! Get weather data
function getWeather(lat, lon) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
    // console.log(api);
    fetch(api).then(function (response) {
        let data = response.json();
        return data;
    }).then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then(function () {
        console.log(weather);
        displayWeather();
    })
}

//! Showing weather to user
function displayWeather() {
    iconElement.innerHTML = `<img src='src/icons/${weather.iconId}.png'/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//! Celsius to Fahrenheit conversion
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

//! Conversion event
tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined)
        return
    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});