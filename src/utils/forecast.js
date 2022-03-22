const request = require('postman-request');


const accessKey = 'b6858e356edcdb77ef72bfdf8515f97e';
const query = 'Kathmandu';
const tempUnit = 'f';

const forecast=(lat,long,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${lat},${long}&units=${tempUnit}`;

request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!',undefined);
    } else if (response.body.error) {
      callback('Unable to find location!',undefined);
    } else {
      const { body } = response;
      const { current } = body;
      const { temperature, feelslike, weather_descriptions } = current;
  
      const description=weather_descriptions[0];
  
      callback(undefined,{
          description,
          temperature,
          tempUnit,
          feelslike,
        })
    }
  });
}


module.exports=forecast;