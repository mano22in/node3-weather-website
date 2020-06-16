const request = require('request')

weatherdata = ({latitude, longitude}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=90c3c18196949d6aa0d06b32d91e56e7&query=' + latitude +',' + longitude
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback(`Unable to connect with weather service!`, undefined)
        } else if(response.body.error) {
            callback(`Unable to find location! Possibility of an error in API call!`, undefined)
        } else { 
            callback(undefined, {
                observationtime: response.body.current.observation_time,
                location_name: response.body.location.name,
                region: response.body.location.region,
                country: response.body.location.country,
                temperature: response.body.current.temperature,
                humidity: response.body.current.humidity,
                weatherdescription: response.body.current.weather_descriptions
            })

        }
    })
}

module.exports = weatherdata