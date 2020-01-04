const location = require('./utile/location')
const forecast = require('./utile/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000

//----------------path config

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// ----------------init config

const app = express()
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))
app.set('views', viewsPath)

app.set('view engine', 'hbs')

//-----------------routs

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather page',
        name: 'asad'
    })
})
//----------------------
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        name: 'asad'
    })
})
//----------------------
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About page',
        name: 'asad'
    })
})
//----------------------
app.get('/weather', (req, res)=>{
    if (!req.query.location){
        return res.send({
            error: 'There is no location'
        })
    }
    location(req.query.location, (error, {lat, long, loc} = {})=>{
        if (error) return res.send({error})
        forecast(lat, long, (error, forecastdata) => {
            if (error) return res.send({error})        
            forcastResults = forecastdata
            res.send({
                location: loc,
                forecast: `min : ${forecastdata.min}, max: ${forecastdata.max} and summary: ${forecastdata.sum}`
            })
          })
    })
    
})
//----------------------
app.get('/help/*', (req, res) =>{
    res.render('error',{
        errMsg: 'Help article not found',
        title: 'Error page',
        name: 'asad'
    })

})
//----------------------
app.get('*', (req, res) =>{
    res.render('error',{
        errMsg: 'Page not found',
        title: 'Error page',
        name: 'asad'
    })

})

// --------------------listening to port

app.listen(port, ()=>{
    console.log('server is runnig')
})