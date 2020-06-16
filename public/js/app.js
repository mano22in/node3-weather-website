const weatherFormEl = document.querySelector('form')
const searchEl = document.querySelector('input')
const message1El = document.getElementById('message-1')
const message2El = document.getElementById('message-2')

weatherFormEl.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const location = searchEl.value
    message1El.textContent = `Loading.....`
    message2El.textContent = ` `

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                message1El.textContent = data.error
            } else {
                var weatherdataheading = `<strong>Observation Time: </strong>${data.observationtime}
                <strong>Location: </strong>${data.location}`
                var weatherdata = `<h2>Temperature: </h2>${data.temperature} degrees centigrade 
                <h2>Humidity: </h2>${data.humidity}`
                
                message1El.innerHTML = weatherdataheading
                message2El.innerHTML = weatherdata

            }
        })
    })
    console.log('Form submitted')
})