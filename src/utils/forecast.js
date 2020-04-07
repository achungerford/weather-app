// // npm modules
const request = require('request');
require('dotenv').config();
const weather_api_key = process.env.WEATHER_API_KEY;

// Weather request: Lat/Long -> city & weather
const forecast = (latitude, longitude, callback) => {
    
    const url = `https://api.darksky.net/forecast/${weather_api_key}/${latitude},${longitude}`;
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.');
        }
    });
}


module.exports = forecast;