const APIKEY = '4203f43b78f7f3bc4bc6a82d6717846b';

// Current weather API: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Geocoding API: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

async function getData(key1, key2 = undefined) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=29.7604&lon=-95.3698&units=imperial&appid=${APIKEY}`);
  const data = await response.json();

  if (key1 === 'weather' && key2 !== undefined) {
    console.log(data[key1][0][key2]);
  } else if (key2 !== undefined) {
    console.log(data[key1][key2]);
  } else {
    console.log(data[key1]);
  }
}

/*getData('weather', 'description');
getData('main', 'temp');
getData('main', 'feels_like');
getData('main', 'temp_max');
getData('main', 'temp_min');
getData('main', 'humidity');*/

async function getLongLatLocation(city, country = 'USA', stateCode = 'TX') {
  const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}},${stateCode},${country}&limit=1&appid=${APIKEY}`);
  const data = await response.json();
  return data;
}

const locationPromise = getLongLatLocation('Houston');

console.log(Promise.resolve(locationPromise.lat));
