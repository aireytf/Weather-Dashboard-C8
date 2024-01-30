
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
  