const axios = require('axios');

const geocode = async (addr, cb) => {
    const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?access_token=pk.eyJ1Ijoibmlja3JvZ2Vyc29uIiwiYSI6ImNranhhNjZ4ZTBxYWEydmxzaXdsMTdrNmgifQ.zCsAPXlT1T61XIwhAbq7tQ&limit=1`    
        try {
          const res = await axios.get(mapbox);
          if (await res.data.features.length === 0) {
                console.log("Ooops, looks like you made a typo!")
                } else {
                    cb(undefined, {
                        latitude: await res.data.features[0].center[0],
                        longitude: await res.data.features[0].center[1],
                        location: await res.data.features[0].place_name
                    })
             }
        } catch (err) {
            cb("Unable to connect to location services")
        }
    }

module.exports = geocode;