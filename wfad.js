// creating variables

const search = document.querySelector("#search");
const searchField = document.querySelector("#city");
const searchbtn = document.querySelector("#searchbtn");
const searchbar = document.querySelector("#form");
const content = document.querySelector("#content");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind");
const location1 = document.querySelector("#location");
const day1 = document.querySelector("#d1");
const day2 = document.querySelector("#d2");
const day3 = document.querySelector("#d3");
const day4 = document.querySelector("#d4");
const day5 = document.querySelector("#d5");
const day6 = document.querySelector("#d6");
const day7 = document.querySelector("#d7");
const body = document.querySelector("#mainCard");
const condition = document.querySelector("#condition");
const recentCitiesDropdown = document.querySelector("#suggestionsContainer");
const showForecast = document.querySelector("#forecast");
const showForecastbtn = document.querySelector("#forecastbtn");
const hideForecastbtn = document.querySelector("#hideforecastbtn");
const mbody = document.querySelector("#body");

const APIkey = "e1cfcbdeb8634f3b94862203241309";
const URL = "https://api.weatherapi.com/v1/forecast.json?";

// 

showForecast.classList.add("hidden");
hideForecastbtn.classList.add("hidden");
searchbar.classList.add("hidden");

showForecastbtn.addEventListener("click", () => {
    showForecast.classList.remove("hidden");
    hideForecastbtn.classList.remove("hidden");
    showForecastbtn.classList.add("hidden");
})

hideForecastbtn.addEventListener("click", () => {
    showForecast.classList.add("hidden");
    hideForecastbtn.classList.add("hidden");
    showForecastbtn.classList.remove("hidden");
})

searchbtn.addEventListener("click", () => {
    searchbar.classList.remove("hidden");
})


content.innerHTML = `<div class="loader">Loading...</div>`;

// Geolocation-based weather on initial load

fetch("http://ip-api.com/json/")
    .then(res => res.json())
    .then(data => {
        fetch(`${URL}key=${APIkey}&q=${data.lat},${data.lon}&days=8`)
        .then(res => res.json())
        .then(position => {
            sessionStorage.setItem(data.city, JSON.stringify(position));
            displayWeather(position);
        })
        .catch(error => console.error('Error fetching weather:', error));
    })
    .catch(error => {
        console.error('Error fetching geolocation:', error);
        content.innerHTML = "Unable to get your location.";
    });

// function for displaying weather

function displayWeather(data) {
    
    function setBackground(condition) {  // For background images based on weather
        const conditionLower = condition.toLowerCase();
        let backgroundUrl = '';
    
        if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
            backgroundUrl = 'url(./assets/sunny.gif)';
        } 
        else if (conditionLower.includes("partly cloudy")) {
            backgroundUrl = 'url(./assets/partlycloudy.gif)';
        } 
        else if (conditionLower.includes("cloudy") || conditionLower.includes("overcast")) {
            backgroundUrl = 'url(./assets/cloudy.gif)';
        } 
        else if (conditionLower.includes("rain") || conditionLower.includes("thunderstorm")) {
            backgroundUrl = 'url(./assets/Thunderstorm.gif)';
        } 
        else if (conditionLower.includes("snow")) {
            backgroundUrl = 'url(./assets/snow.gif)'; 
        } 
        else {
            return 'background-image: url(./assets/weather.gif) background-size: cover;';
        }
    
        // Return the style property string
        return `background-image: ${backgroundUrl}; background-size: cover;`;
    }
    mbody.style = setBackground(data.forecast.forecastday[0].day.condition.text);

    // function for background of cards based on weather

    function getBackgroundColor(condition) {
        const conditionLower = condition.toLowerCase();
        if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
            return 'linear-gradient(to top, #ffaf07, #e9e4f0)';
        } else if (conditionLower.includes("partly cloudy")) {
            return 'linear-gradient(to top, #ffb91a, #a6c1ee)';
        } else if (conditionLower.includes("cloudy") || conditionLower.includes("overcast")) {
            return 'linear-gradient(to bottom, #757f9a, #d7dde8)';
        } else if (conditionLower.includes("rain") || conditionLower.includes("thunderstorm")) {
            return 'linear-gradient(to top, #bdc3c7, #2c3e50)';
        } else if (conditionLower.includes("snow")) {
            return 'linear-gradient(to top, #e0eafc, #cfdef3)';
        } else {
            return 'linear-gradient(to top, #ffffff, #cccccc)';
        }
    }
    
    // Displaying values in web page

    content.innerHTML = `<img src="https:${data.forecast.forecastday[0].day.condition.icon}"> City: ${data.location.name}`;
    temp.innerHTML = `<i class="wi wi-thermometer text-3xl"></i>${Math.round(data.current.temp_c)}°C`;
    humidity.innerHTML = `Humidity: ${data.current.humidity} %`;
    windSpeed.innerHTML = `windSpeed: ${data.current.wind_kph} Kph`;
    location1.innerHTML = `Latitude: ${data.location.lat} <br> Longitude: ${data.location.lon}`;
    condition.innerHTML = `${data.forecast.forecastday[0].day.condition.text}`;

    // Function for iterating every day.

    const days = [day1, day2, day3, day4, day5, day6, day7];
    days.forEach((day, index) => {
        const forecastingOf = data.forecast.forecastday[index + 1];
        day.innerHTML = `<img src="https:${forecastingOf.day.condition.icon}">
        <br> Forecast Date: <strong>${forecastingOf.date}</strong>
        <br> Avg temp: <strong>${Math.round(forecastingOf.day.avgtemp_c)} °C </strong>
        <br> Avg Wind speed: <strong>${forecastingOf.day.maxwind_kph} Kph </strong>
        <br> Avg Humidity: <strong>${forecastingOf.day.avghumidity} % </strong>
        <br> Day's Condition: <strong>${forecastingOf.day.condition.text} </strong>`;
        day.style.background = getBackgroundColor(forecastingOf.day.condition.text);
        body.style.background = getBackgroundColor(data.forecast.forecastday[0].day.condition.text);
        
    });
}

// Add a city to sessionStorage for recent searches
function addCityToStorage(cityName) {
    let cities = JSON.parse(sessionStorage.getItem('recentCities')) || [];

    if (!cities.includes(cityName)) {
        cities.push(cityName);
        sessionStorage.setItem('recentCities', JSON.stringify(cities));
        updateDropdown(); // Update the suggestions dropdown
    }
}

// Show the dropdown when the search bar is focused and recent cities are available
searchField.addEventListener('focus', () => {
    let cities = JSON.parse(sessionStorage.getItem('recentCities')) || [];
    if (cities.length > 0) {
        recentCitiesDropdown.classList.remove('hidden'); // Show the dropdown
        updateDropdown(); // Call the function to update the dropdown content
    }
});

// Hide the dropdown when the search bar loses focus (after a small delay to allow for selection)
searchField.addEventListener('blur', () => {
    setTimeout(() => {
        recentCitiesDropdown.classList.add('hidden'); // Hide the dropdown
    }, 200); // Small delay to allow clicking on a suggestion
});

// Function to update the dropdown with recent cities
function updateDropdown() {
    let cities = JSON.parse(sessionStorage.getItem('recentCities')) || [];
    recentCitiesDropdown.innerHTML = ''; // Clear the existing list

    if (cities.length > 0) {
        cities.forEach(city => {
            let li = document.createElement('li');
            li.textContent = city;
            li.classList.add('cursor-pointer', 'p-2', 'hover:bg-gray-200');
            li.addEventListener('click', () => {
                searchField.value = city; // Set the input to the clicked city
                search.click(); // Trigger the search button
                searchField.value = ""; // Clear the search field after selection
                recentCitiesDropdown.classList.add('hidden'); // Hide dropdown after selecting
            });
            recentCitiesDropdown.appendChild(li);
        });
    }
}


// Trigger recent search suggestions as the user enters data
searchField.addEventListener('input', () => {
    const query = searchField.value.toLowerCase();
    let cities = JSON.parse(sessionStorage.getItem('recentCities')) || [];

    if (query.length > 0) {
        const filteredCities = cities.filter(city => city.toLowerCase().includes(query));
        displayFilteredSuggestions(filteredCities);
    } else {
        updateDropdown();
    }
});

// Display filtered city suggestions
function displayFilteredSuggestions(cities) {
    recentCitiesDropdown.innerHTML = ''; 

    if (cities.length > 0) {
        recentCitiesDropdown.classList.remove('hidden');
        cities.forEach(city => {
            let li = document.createElement('li');
            li.textContent = city;
            li.classList.add('cursor-pointer', 'p-2', 'hover:bg-gray-200');
            li.addEventListener('click', () => {
                searchField.value = city;
                search.click();
                recentCitiesDropdown.classList.remove('hidden');
                searchField.value = '';
            });
            recentCitiesDropdown.appendChild(li);
        });
    } else {
        recentCitiesDropdown.classList.add('hidden');
    }
}

// code for the functionality 
search.addEventListener('click', (event) => {
    event.preventDefault();
    const city = searchField.value;
    const storedData = sessionStorage.getItem(city);
    searchField.value = '';

    if (city === '') {
        alert("Please enter a city name");
    } 
    else if (!/^[a-zA-Z\s]+$/.test(city)) {
        alert("City name shouldn't contain any special characters");
    } 
    else if (storedData) {
        const data = JSON.parse(storedData);
        displayWeather(data);
    } 
    else {
        const apiUrl = `${URL}key=${APIkey}&q=${city}&days=8&aqi=no&alerts=no`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem(city, JSON.stringify(data));
                addCityToStorage(city); // Add city to recent searches
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error:', error);
                content.innerHTML = `Unable to find weather for "${searchField.value}"`;
                temp.innerHTML = `Not available !!!`;
                humidity.innerHTML = `Not available !!!`;
                windSpeed.innerHTML = `Not available !!!`;
                location1.innerHTML = `Not available !!!`;
                condition.innerHTML = `Not available !!!`;
                const days = [day1, day2, day3, day4, day5, day6, day7];
                days.forEach((day) => {
                    day.innerHTML = `Not available !!!`;
                    day.style.background = "linear-gradient(to top, blue, white)";
                    body.style.background = "linear-gradient(to top, white, blue)";
                });
            });
    }
});

// Update suggestions on page load
window.onload = updateDropdown;
