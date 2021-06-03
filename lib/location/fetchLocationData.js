'use strict'; 

const axios = require('axios'); 
const API_KEY = process.env.REACT_APP_LOCATION_KEY; 


async function fetchLocationData (searchQuery) {
    let LocationData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`)
    return LocationData.data; 

}




module.exports = {fetchLocationData}; 