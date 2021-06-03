'use strict'; 

require('dotenv').config(); 
const axios = require('axios');
const express = require('express'); 
const cors = require('cors');
const PORT = process.env.PORT; 
const mongoose = require('mongoose');

const app = express();
app.use(cors()); 
const Trail = require('./lib/trails/fetchTrail.js');

const location = require('./lib/location/fetchLocationData.js');
const weather = require('./lib/weather/fetchweatherData.js');
// const trail = require('./lib/trails/fetchTrail');
// const { ResponsiveEmbed } = require('react-bootstrap');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error',(error)=> console.error(error))
db.once('open', () => {
    // app.listen(PORT, () => console.log(`Server up, listening on ${PORT}`));
    console.log('Connected to Database');
  });

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

app.post('/trail', Trail.addTrailData);

// app.get('/trail', async (request, response) => {
//     let lat = request.query.lat; 
//     let lon = request.query.lon;
//     console.log(lat, lon, 'trail data'); 
//     let trailData = await trail.fetchTrail(lat, lon);
//     console.log(trialData[0]);
//     response.send(trailData); 
// })
