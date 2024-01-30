// Event listener for search form
document.getElementById('search-form').addEventListener('submit', function (event) {
   // Prevent the default form submission behavior
   event.preventDefault();
    
   // Extract the city name from the search input field
   const cityName = document.getElementById('search-input').value.trim();
   
   // Check for a blank search
   if (cityName === '') {
     console.error('City name cannot be empty.');
     return;
}
// Define the API key and URLs for current weather and forecast data retrieval
const apiKey = '7ff53766b4708fd0cfee8f689f8f7438';
const apiUrlData = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

// Fetch current weather data
fetch(apiUrlData)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Current weather data:', data);
    displayCurrentWeather(data);
    // Add the city to the search history
    addToSearchHistory(cityName);
    // Update the search history UI
    updateSearchHistoryUI();
  })
  .catch(error => {
    console.error('Error fetching current weather:', error);
  });

// Fetch 5-day forecast data
fetch(apiUrlForecast)
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log('5-Day forecast data:', data);
  // Extract data for every 8th entry to get daily forecast
  const fiveDayForecast = data.list.filter((item, index) => index % 8 === 0);
  displayFiveDayForecast(fiveDayForecast);
})
.catch(error => {
  console.error('Error fetching 5-day forecast:', error);
});

});

// Function to display current weather data
function displayCurrentWeather(weatherData) {
    const cityNameElement = document.getElementById('today');
    cityNameElement.innerHTML = `<h2>${weatherData.name} (${getCurrentDate()})</h2>`;
    // Append weather icon element
    const iconElement = document.createElement('img');
    const iconCode = weatherData.weather[0].icon;
    iconElement.src = `https://openweathermap.org/img/w/${iconCode}.png`;
    iconElement.alt = `Weather Icon: ${weatherData.weather[0].description}`;
    cityNameElement.appendChild(iconElement);
  
    // Convert temp to celsius from kelvin and display
    const celsius = weatherData.main.temp - 273.15;
    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${celsius.toFixed(2)} °C`;
    cityNameElement.appendChild(temperatureElement);
  
    // Display weather description summary
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Weather: ${weatherData.weather[0].description}`;
    cityNameElement.appendChild(descriptionElement);
  
    // Converting wind speed to miles per hour and display
    const windSpeedInMph = (weatherData.wind.speed * 2.23694).toFixed(2);
    const windSpeedElement = document.createElement('p');
    windSpeedElement.textContent = `Wind Speed: ${windSpeedInMph} mph`;
    cityNameElement.appendChild(windSpeedElement);
  
    // Display percentage humidity
    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${weatherData.main.humidity}%`;
    cityNameElement.appendChild(humidityElement);
  }

// Function to display 5-day forecast data
function displayFiveDayForecast(fiveDayForecast) {
    const forecastSection = document.getElementById('forecast');
    forecastSection.innerHTML = '<h2>5-Day Forecast</h2>';
  
    // Iterate through each day in the forecast data
    fiveDayForecast.forEach(day => {
      const forecastCard = document.createElement('div');
      forecastCard.classList.add('forecast-card');
  
      // Display relevant data for each day
      const dateElement = document.createElement('p');
      dateElement.textContent = getCurrentDate(day.dt_txt);
      forecastCard.appendChild(dateElement);
  
      // Create and append weather icon element
      const iconElement = document.createElement('img');
      const iconCode = day.weather[0].icon;
      iconElement.src = `https://openweathermap.org/img/w/${iconCode}.png`;
      iconElement.alt = `Weather Icon: ${day.weather[0].description}`;
      forecastCard.appendChild(iconElement);
  
      // Calculate temperature in Celsius and display
      const celsius = day.main.temp - 273.15;
      const temperatureElement = document.createElement('p');
      temperatureElement.textContent = `Temperature: ${celsius.toFixed(2)} °C`;
      forecastCard.appendChild(temperatureElement);
  
      // Display weather description
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = `Weather: ${day.weather[0].description}`;
      forecastCard.appendChild(descriptionElement);
  
      // Display wind speed in mph
      const windSpeedInMph = (day.wind.speed * 2.23694).toFixed(2);
      const windSpeedElement = document.createElement('p');
      windSpeedElement.textContent = `Wind Speed: ${windSpeedInMph} mph`;
      forecastCard.appendChild(windSpeedElement);
  
      // Display humidity percentage
      const humidityElement = document.createElement('p');
      humidityElement.textContent = `Humidity: ${day.main.humidity}%`;
      forecastCard.appendChild(humidityElement);
  
      // Append the forecast card to the forecast section
      forecastSection.appendChild(forecastCard);
    });

}

// Function to get the current date in the specified format
function getCurrentDate(dateTimeString) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
  
    // Pad month and day with leading zeros if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    return `${day}/${month}/${year}`;
  }
