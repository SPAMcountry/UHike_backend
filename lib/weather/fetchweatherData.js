'use strict'
const axios = require('axios'); 

const WEATHER_KEY = process.env.REACT_APP_WEATHER_KEY;

// async function fetchWeatherData (lat, lon) {
//     let WeatherData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily/?key=${WEATHER_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`)
//     return WeatherData.data; 

// }
async function fetchWeatherData (lat, lon) {
    let WeatherData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_KEY}`)
    console.log(WeatherData.data.data[0]);
    return WeatherData.data.data.map(day => new Forecast(day));
}
function Forecast(day) {
    this.date = day.datetime;
    this.description = `low of ${day.low_temp} and a high of ${day.high_temp}, with ${day.weather.description}`; 
    this.icon = day.weather.icon;
    this.iconCode = day.weather.code; 
}


module.exports = { 
    fetchWeatherData: fetchWeatherData,
    forecast: Forecast
}

// module.exports = {fetchWeatherData};

