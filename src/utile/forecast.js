const request = require('request')
const forecast = (a, b, callback) =>{
    const url = 'https://api.darksky.net/forecast/0e3da84073d266a3b3c6df8b0b4e3b01/' + a + ',' + b
    request({url, json: true},(err, {body})=>{
        if (err){
            callback('Please check your internet conection!')

        }else if(body.error){
            callback(body.error)
        }else{
            callback(undefined, {
               sum: body.currently.summary,
               min: body.daily.data[0].temperatureLow,
               max: body.daily.data[0].temperatureHigh,
               chance: body.currently.precipProbability
            })
        }
    })
}
module.exports = forecast