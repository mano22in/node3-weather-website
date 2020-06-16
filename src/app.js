const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherdata = require('./utils/weatherdata')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,`../public`)
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manoranjan Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Manoranjan Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'We are here to help you! Please write to us at 83473043948',
        name: 'Manoranjan Kumar'
    })
})

app.get(`/weather`, (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: `Please input the address!`
        })
    }

    geocode(req.query.address, (error, {latitude, longitude} = {}) => { //Object deconstrcution and default param example
        if(error) {
            return res.send({
                error
            })
        }
        //console.log(data)
        // const latitude = data.latitude
        // const longitude = data.longitude
        weatherdata({latitude, longitude}, (error, weatherdata) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                //weatherdata,
                observationtime: weatherdata.observationtime,
                location: `${weatherdata.location_name}, ${weatherdata.region}, ${weatherdata.country}`,
                temperature: weatherdata.temperature,
                humidity: weatherdata.humidity
            })
        })
    } )
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            message: `Please enter the seach option!`
        })
    }

    console.log(req.query.search)
    console.log(req.query.rating)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port 3000.`)
})



// console.log(__dirname)
// console.log(path.join(__dirname, `../public`))

// app.get('', (req, res) => {
//     res.send(`<h1>Hello Express!</h1>`)

// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Manoranjan Kumar',
//         age: 41
//     },
//     {
//         name: 'Vidisha Kumar',
//         age: 40
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send(`<h1>About us</h1>`)
// })
