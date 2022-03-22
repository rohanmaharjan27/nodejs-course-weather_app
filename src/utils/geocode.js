const request = require('postman-request');

const mapboxAccessToken =
  'pk.eyJ1Ijoicm9oYW5tYWhhcmphbjI3IiwiYSI6ImNrMXlzdWNlaDBxdG4zbXFvd2FkYmQwYXIifQ.6junG8I2vm--1DebTkX8tw';
const mapboxLimit = 1;

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapboxAccessToken}&limit=${mapboxLimit}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location!', undefined);
    } else {
      const { body } = response;
      const { features } = body;
      const { center, place_name } = features[0];

      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        place_name,
      });
    }
  });
};

module.exports = geocode;
