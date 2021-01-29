const path = require('path');
const express = require('express');
const hbs = require('hbs');



const geocode = require('./utils');
const forecast = require('./forecast');

const app = express();
const port = process.env.PORT || 3000;

//Set up for static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

//Handlesbars set up
app.set('view engine', 'hbs');
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath);


app.get('', (req,res) => {
    res.render('index', {
        title: "Weather App",
        name: "Nick"
    })
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: "About Nick's App",
        name: "Nick"
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        help: "This is our Help Page",
        title: 'Help Page',
        name: "Nick"
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    } 
    //console.log(req.query.address)

geocode(req.query.address, (err, {latitude, longitude, location} = {})=> {
    if (err) {
        return res.send( { err})
    }

    forecast(latitude, longitude, (err, forecastData) => {
        if (err) {
            return res.send({ err})
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.adddress
        })
    })
 })
})


app.get('/products', (req, res)=> {
    if(!req.query.search) {
    return res.send({
        error: "You must provide a search term"
    })
    } 
        console.log(req.query.search)
    res.send({
        products: []
    })
 
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "Help 404 Page",
        content: "Help article not found",
        name: "Nick"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: "404 Page",
        content: "Page not found",
        name: "Nick"
    })
})

app.listen(port, () => {
    console.log('Server is up and running on ' + port)
})