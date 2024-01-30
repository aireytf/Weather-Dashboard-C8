
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


  
  