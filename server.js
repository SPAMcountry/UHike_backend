'use strict'; 

require('dotenv').config(); 
const axios = require('axios');
const express = require('express'); 
const cors = require('cors');
const PORT = process.env.PORT; 


const app = express();
app.use(cors()); 

const location = require('./lib/location/fetchLocationData');
const weather = require('./lib/weather/fetchweatherData');



app.get('/location', async (request, response) => {
    let searchQuery = request.query.search;
    let locationData = await location.fetchLocationData(searchQuery); 
    console.log(locationData);
    response.send(locationData); 
})

app.get('/weather', weatherHandler); 
function weatherHandler(request, response) {
    const {lat, lon} = request.query; 
    weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
        console.error(error); 
        response.status(200).send('Sorry, something went wrong')
    })
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));