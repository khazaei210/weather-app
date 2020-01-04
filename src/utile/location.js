const request = require('request')
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXNhZGtoYXphZWkiLCJhIjoiY2s0dHh1c3VyMDhlbjNtbXJtY3VkZjd4ZSJ9.zae9WTmkeDOwexCzzzEcBA
const geopoint = (add, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(add) + '.json?access_token=pk.eyJ1IjoiYXNhZGtoYXphZWkiLCJhIjoiY2s0dHh1c3VyMDhlbjNtbXJtY3VkZjd4ZSJ9.zae9WTmkeDOwexCzzzEcBA'
    request({url, json: true}, (err, {body})=>{
        if (err){
            callback('Check your internet conection')
        }else if (body.features.length === 0){
            callback('Error in location name')
        }else{
            callback(undefined, {
                lat:body.features[0].center[1],
                long: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}
module.exports = geopoint