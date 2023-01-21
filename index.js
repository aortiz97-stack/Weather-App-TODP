const APIKEY = '4203f43b78f7f3bc4bc6a82d6717846b';

// Current weather API: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Geocoding API: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

async function getData(object) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=29.7604&lon=-95.3698&units=imperial&appid=${APIKEY}`);
  const data = await response.json();

  for (let i = 0; i < Object.keys(object).length; i += 1) {
    const firstKey = Object.keys(object)[i];
    const valueObj = object[firstKey];
    const secondKey = Object.values(valueObj)[0];

    const answer = data[firstKey][secondKey];

    console.log(answer);
  }
}

const temperValueObj = {
  key1: 'temp',
};
const temperKeyObj = {
  main: temperValueObj,
};

getData(temperKeyObj);

/* const geoFetched = fetch('http://api.openweathermap.org/geo/1.0/direct?q=Houston,TX,USA&limit=5&appid=4203f43b78f7f3bc4bc6a82d6717846b}');
console.log(geoFetched); */
