# Weather-Forecast-Application Overview
This Weather Forecast Application provides weather updates based on user input and geolocation. It features a 7-day weather forecast and background animations that change depending on weather conditions (rain, sunny, cloudy, etc.). Additionally, the app stores recent searches and provides suggestions when typing city names in the search bar.

Weather Forecast Application

Introduction: This is a simple and responsive weather forecast application built using HTML, Tailwind CSS, and JavaScript. It provides current weather information and a 7-day forecast based on user input or their geolocation. The background changes dynamically depending on the weather conditions.

Features: Displays current weather and 7-day forecast for any city. Geolocation-based weather information on page load. Dynamic background that changes with the weather. Caches recent searches in sessionStorage and suggests recent cities while typing. Handles invalid city inputs with error messages.

Setup Instructions: 1.Clone the Repository: git clone https://github.com/asheedh/Weather-Forecast-Application.git

2.Navigate to the Project Directory: cd weather-app

3.Install Dependencies (if using Tailwind CSS with PostCSS): npm install

4.Run the Application: Open index.html in your browser. Make sure to have an active internet connection since this app fetches weather data using a weather API.

5.Configure Weather API: Obtain an API key from WeatherAPI. Add your API key in the wfad.js file by setting the APIkey variable:

const APIkey = 'your-api-key-here';

Usage: Enter a city name in the search bar and press the search button. The app will display the current weather and a 7-day forecast for the city. Recent searches are stored and suggested as you type in the search bar.

Customization: You can customize the background images for different weather conditions by adding new .gif files in the assets/ folder and updating the setBackground function in the wfad.js file.

Credits: Weather data is provided by WeatherAPI. Icons from Weather Icons and Font Awesome.
