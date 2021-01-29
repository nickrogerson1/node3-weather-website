const axios = require('axios');

const forecast = (lon, lat, cb) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=7aba03ff03d08be1f7b18c5b731f148b`;
    
    axios.get(url)
    .then( ({data}) => {
        const degrees = data.main.temp;
        const desc = data.weather[0].description;
            
         cb(undefined, 
         `It is currently ${degrees} degrees Celcius with ${desc}.`
        )
     }
    )
    .catch ( ({response}) => {
        if(response === undefined) {
        cb("Unable to connect to location services")
        } else if (response.status === 400) {
            cb("Something went wrong. Please check the coordinates you entered.")
        } else {
            cb("Something went wrong.")
        }
  });
}

module.exports = forecast;