const request = require('request')

const infoToday = ((lan,lat, callback) => {

       url = 'https://api.darksky.net/forecast/78bb3b121f526d4fdc17f63395a0f247/'+lan+','+lat+'?units=si'

       request({ url, json: true }, (error, {body}) => {
              //#endregion
              
              if (error) {
                   callback('unable to connect ',{})
              }else if(body.error){
                 callback('can not find coordinates',{})
              } else{
                     const {temperature,precipProbability}=body.currently
                     const {temperatureHigh,temperatureLow}=body.daily.data[0]
                     callback('',
                            'Today:  '+body.hourly.summary+
                            '  temperature '+temperature+" degrees out. "+ " There is  "+ 
                            +precipProbability+'% '+ ' chances of rain. '+ "Max temparature is "+temperatureHigh +" degrees and "
                            +" min temperature is "+temperatureLow+" degrees out. "
                           
                     
              )
              }
       })


})
module.exports =infoToday
