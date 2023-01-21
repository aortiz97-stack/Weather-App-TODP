// API key 4203f43b78f7f3bc4bc6a82d6717846b

// Current weather API: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Geocoding API: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

const fetched = fetch('https://api.openweathermap.org/data/2.5/weather?lat=29.7604&lon=-95.3698&units=imperial&appid=4203f43b78f7f3bc4bc6a82d6717846b');

fetched.then((response) => response.json())
  .then((data) => {console.log(data.main.temp)});

/*const geoFetched = fetch('http://api.openweathermap.org/geo/1.0/direct?q=Houston,TX,US&limit=5&appid=4203f43b78f7f3bc4bc6a82d6717846b}');
console.log(geoFetched);*/
