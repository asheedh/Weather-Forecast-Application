console.log('working');

const search = document.querySelector("#search");
const searchField = document.querySelector("#city");
const content = document.querySelector("#content");
const temp = document.querySelector("#temp")
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind");
const location1 = document.querySelector("#location")

const APIkey = "e1cfcbdeb8634f3b94862203241309";
const URL = "https://api.weatherapi.com/v1/current.json?";

// Function to display weather data
function displayWeather(data) {
    content.innerHTML = `City: ${searchField.value}`;
    temp.innerHTML += `${data.current.temp_c}°C`;
    humidity.innerHTML += `${data.current.humidity} %`;
    windSpeed.innerHTML += `${data.current.wind_kph} Kph`;
    location1.innerHTML += `latitude : ${data.location.lat} <br> longitude : ${data.location.lat}`;
    console.log(data);
    
    
}

// Event listener for the search button
search.addEventListener('click', (event) => {
    event.preventDefault();

    const city = searchField.value;

    // Check if weather data for this city is already stored
    const storedData = sessionStorage.getItem(city);

    if (storedData) {
        // If data is stored, parse and display it
        const data = JSON.parse(storedData);
        displayWeather(data);
    } else {
        const apiUrl = `${URL}key=${APIkey}&q=${city}&aqi=no`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                // Store the data in sessionStorage
                sessionStorage.setItem(city, JSON.stringify(data));

                // Display the weather data
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error:', error);
                content.innerHTML = "Failed to retrieve weather data.";
            });
    }
});
