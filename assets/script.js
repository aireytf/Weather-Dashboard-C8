
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


});