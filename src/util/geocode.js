const request = require('request')
const geocode = (data, callback) => {
       const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + data + ".json?access_token=pk.eyJ1Ijoic2FuZGVlcGdvcmUiLCJhIjoiY2pzdmU4aW5iMDJsYjQ0b2Z3bTA3YjliayJ9.X7Qd5LcAhcnR3mo4gB29Tw"
       request({ url, json: true }, (error, {body}) => {
              if(error){
                     callback('unable to connect',{})
              }else if(body.features.length===0){
                     callback('can not find the location',{})
              }
              else{
                     const { center, place_name } = body.features[0]
                     callback('',{
                            'longitude':center[1],
                            'latitude':center[0],
                            'location':place_name
                     })
              }
 })


}

module.exports= geocode