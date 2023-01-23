const APIKEY = '4203f43b78f7f3bc4bc6a82d6717846b';

// Current weather API: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Geocoding API: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// country to country code api: https://restcountries.com/v3.1/name/{name}?fullText=true
// Weather icon API: http://openweathermap.org/img/wn/${iconCode}@2x.png

/* getData('weather', 'description');
getData('main', 'temp');
getData('main', 'feels_like');
getData('main', 'temp_max');
getData('main', 'temp_min');
getData('main', 'humidity'); */

async function getCountryCode(countryName) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true)`);
    const data = await response.json();
    const countryCode = data[0].cca2;
    return countryCode;
  } catch {
    alert('Unable to identify country');
    throw (new Error('Unable to identify country'));
  }
}

async function getLongLatLocation(city, countryName = '', stateCode = '') {
  try {
    let countryCode;
    if (countryName.length !== 0) {
      countryCode = await getCountryCode(countryName);
      console.log(`country cooooode: ${countryCode}`);
    }
    let response;

    if (stateCode.length === 0 && countryName.length === 0) {
      response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`);
    } else if (countryName.length === 0) {
      response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode}&limit=1&appid=${APIKEY}`);
    } else if (stateCode.length === 0) {
      response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${APIKEY}`);
    } else {
      response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=1&appid=${APIKEY}`);
    }
    const data = await response.json();
    return data[0];
  } catch {
    alert('Unable to find location');
    throw (new Error('Location is invalid'));
  }
}

async function getData(output, key1, key2) {
  const city = output[0];
  const state = output[1];
  const country = output[2];

  const coords = await getLongLatLocation(city, country, state);
  const { lat } = coords;
  const { lon } = coords;

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKEY}`);
  const data = await response.json();

  if (key1 === 'weather' && key2 !== undefined) {
    return (data[key1][0][key2]);
  } if (key2 !== undefined) {
    return (data[key1][key2]);
  }
  return (data[key1]);
}

async function displayData(output) {
  const splitOutPut = output.split(', ');
  const location = document.querySelector('#location');
  location.innerHTML = output;
  const htmlIDS = ['description', 'temp', 'icon', 'feels_like', 'temp_max', 'temp_min', 'humidity'];

  for (let i = 0; i < htmlIDS.length; i += 1) {
    const key2 = htmlIDS[i];
    let key1;
    if (key2 === 'description' || key2 === 'icon') {
      key1 = 'weather';
    } else {
      key1 = 'main';
    }
    // eslint-disable-next-line no-await-in-loop
    const dataValue = await getData(splitOutPut, key1, key2);
    const html = document.querySelector(`#${key2}`);
    if (key2 === 'icon') {
      html.src = `http://openweathermap.org/img/wn/${dataValue}@2x.png`;
    } else if (key2 === 'description') {
      html.innerHTML = dataValue;
    } else {
      const span = html.querySelector('span.value');
      span.innerHTML = dataValue;
    }
  }
}

/* getData('weather', 'description');
getData('main', 'temp');
getData('main', )
getData('main', 'feels_like');
getData('main', 'temp_max');
getData('main', 'temp_min');
getData('main', 'humidity'); */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = document.querySelector('input');
    const output = input.value;
    displayData(output);
  }
});
