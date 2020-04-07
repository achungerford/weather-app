/* nodejs script that will create, configure, and start the server.

run script: node src/app.js
keep server running: nodemon src/app.js
*/

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();  // create app

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');  // absolute path to 'public' directory
const viewsPath = path.join(__dirname, '../templates/views');   // customizing where your 'views' live, i.e. changing the default
const partialsPath = path.join(__dirname, '../templates/partials'); // absolute path to partials

// Setup handlebars engine and views location
app.set('view engine', 'hbs');      // tells express which templating engine we installed (hbs)
app.set('views', viewsPath);        // telling express to use viewsPath (templates)
hbs.registerPartials(partialsPath);     // config rendering of partials

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));   // serve 'public' directory

// set up route to serve up views template, render index.hbs view
// (routes are part of Express pkg)
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John Doe'
    })
});

// render about.hbs view
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'John Doe'
    })
});

// render help view
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'John Doe',
        helpText: 'this is some helpful text'
    })
});

// create a weather route
app.get('/weather', (req, res) => {
    // ensure user provides an address
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!',
        });
    }
    
    // wired up endpoint, empty object default value
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });

    });
});

// create URL that sends back JSON
app.get('/products', (req, res) => {
    // API request from browser to server
    // require 'search'
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }

    console.log(req.query.search);

    // responses from server with data after API request
    res.send({
        products: []
    });
})


// 404 help handling
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        title: 'John Doe',
        errorMessage: 'Help article not found.'
    });
});

// generic 404 handling
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'John Doe',
        errorMessage: 'Page not found.'
    });
});

// port 3000 is common development port, starts server
app.listen(3000, () => {
    console.log('Server is up on port 3000');   // never displays in browser
});