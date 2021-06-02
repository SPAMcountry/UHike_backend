'use strict'; 

require('dotenv').config(); 
const axios = require('axios');
const express = require('express'); 
const cors = require('cors');
const PORT = process.env.PORT; 


const app = express();
app.use(cors()); 

const location = require('./lib/location/fetchLocationData.js');
const weather = require('./lib/weather/fetchweatherData.js');
// const trail = require('./lib/trails/fetchTrail');
const { ResponsiveEmbed } = require('react-bootstrap');


app.get('/location', async (request, response) => {
    let searchQuery = request.query.search;
    let locationData = await location.fetchLocationData(searchQuery); 
    console.log(locationData[0]);
    response.send(locationData); 
})

app.get('/weather', async (request, response) => {
    let lat = request.query.lat;
    let lon = request.query.lon;
    console.log(lat, lon); 
    let weatherData = await weather.fetchWeatherData(lat, lon);
    console.log(weatherData[0])
    response.send(weatherData);
});
// app.get('/trail', async (request, response) => {
//     let lat = request.query.lat; 
//     let lon = request.query.lon;
//     console.log(lat, lon, 'trail data'); 
//     let trailData = await trail.fetchTrail(lat, lon);
//     console.log(trialData[0]);
//     response.send(trailData); 
// })

app.listen(PORT, () => console.log(`listening on ${PORT}`));