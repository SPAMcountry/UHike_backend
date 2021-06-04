'use strict'; 

require('dotenv').config(); 
// const axios = require('axios');
const express = require('express'); 
const cors = require('cors');
const PORT = process.env.PORT; 
const mongoose = require('mongoose');
// const TrailModel = require('./lib/model/Model'); 

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

// const 


app.get('/trail', Trail.getAllTrail);
app.post('/trail', Trail.AddTrail);
app.post('/users', Trail.addUser);


// app.delete('/trail/:id', getTrails, async (req, res) => {
//     try{
//         await res.item0.remove()
//         res.json({message:'deleted'})
//     }catch(err){
//         res.status(500).json({message: err.message})
//     }
// });

// async function getTrails(req, res, next) {
//     let itemO
//     try {
//     itemO = await TrailModel.findById(req.params._id)
//     if (itemO == null) {
//     return res.status(404).json({ message: 'Cannot find' })
//     }
// } catch (err) {
//     return res.status(500).json({ message: err.message })
// }
// res.itemO = itemO
// next()
// }

// app.post('/trail', Trail.addTrailData);
// app.delete('/trail/:index', Trail.deleteTrail);

// app.get('/trail', async (request, response) => {
//     let lat = request.query.lat; 
//     let lon = request.query.lon;
//     console.log(lat, lon, 'trail data'); 
//     let trailData = await trail.fetchTrail(lat, lon);
//     console.log(trialData[0]);
//     response.send(trailData); 
// })
app.listen(PORT, () => console.log(`SERVER IS UP on ${PORT}`));