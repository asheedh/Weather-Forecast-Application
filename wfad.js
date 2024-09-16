const search = document.querySelector("#search");
const searchField = document.querySelector("#city");
const content = document.querySelector("#content");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind");
const location1 = document.querySelector("#location");
let day1 = document.querySelector("#d1");
let day2 = document.querySelector("#d2");
let day3 = document.querySelector("#d3");
let day4 = document.querySelector("#d4");
let day5 = document.querySelector("#d5");
let day6 = document.querySelector("#d6");
let day7 = document.querySelector("#d7");
const body = document.querySelector("#mainCard");
const condition = document.querySelector("#condition")



const APIkey = "e1cfcbdeb8634f3b94862203241309";
const URL = "https://api.weatherapi.com/v1/forecast.json?";

content.innerHTML = `<div class="loader">Loading...</div>`;

fetch("http://ip-api.com/json/")
    .then(res => res.json())
    .then(data => {
    console.log(data)

    fetch(`${URL}key=${APIkey}&q=${data.lat},${data.lon}&days=8`)
    .then(res => res.json())
            .then(position => {
                // Store the data in sessionStorage
                sessionStorage.setItem(city, JSON.stringify(position));

                // Display the weather data
                displayWeather(position);
                content.innerHTML = `<img src="https:${position.forecast.forecastday[0].day.condition.icon}"> City: ${position.location.name}`;
                
            })
            .catch(error => {
                console.error('Error:', error);
                
            });
            
    })

   
// Function to display weather data
function displayWeather(data) { 
    function getBackgroundColor(condition) {
        const conditionLower = condition.toLowerCase(); // make condition lowercase
        if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
            return 'linear-gradient(to top, #ffaf07, #e9e4f0)'; // Gradient for sunny/clear
        } 
        else if (conditionLower.includes("partly cloudy")) {
            return 'linear-gradient(to top, #ffb91a, #a6c1ee)'; // Gradient for partly cloudy
        } 
        else if (conditionLower.includes("cloudy") || conditionLower.includes("overcast")) {
            return 'linear-gradient(to bottom, #757f9a, #d7dde8)'; // Gradient for cloudy/overcast
        } 
        else if (conditionLower.includes("rain") || conditionLower.includes("thunderstorm")) {
            return 'linear-gradient(to top, #bdc3c7, #2c3e50)'; // Gradient for rain/thunderstorm
        } 
        else if (conditionLower.includes("snow")) {
            return 'linear-gradient(to top, #e0eafc, #cfdef3)'; // Gradient for snow
        } 
        else {
            return 'linear-gradient(to top, #ffffff, #cccccc)'; // Default gradient for unknown conditions
        }
    }
    
    
    content.innerHTML = `<img src="https:${data.forecast.forecastday[0].day.condition.icon}"> City: ${searchField.value}`;
    temp.innerHTML = `<i class="wi wi-thermometer text-3xl"></i>${Math.round(data.current.temp_c)}°C`;
    humidity.innerHTML = `${data.current.humidity} %`;
    windSpeed.innerHTML = `${data.current.wind_kph} Kph`;
    location1.innerHTML = `Latitude: ${data.location.lat} <br> Longitude: ${data.location.lon}`;
    condition.innerHTML = `${data.forecast.forecastday[0].day.condition.text}`

    const days = [day1, day2, day3, day4, day5, day6, day7];
    days.forEach((day, index) => {
        const forecastingOf = data.forecast.forecastday[index + 1];
        day.innerHTML = `<img src="https:${forecastingOf.day.condition.icon}">
        <br> Forecast Date: <strong>${forecastingOf.date}</strong>
        <br> Avg temp: <strong>${Math.round(forecastingOf.day.avgtemp_c)} °C </strong>
        <br> Avg Wind speed: <strong>${forecastingOf.day.maxwind_kph} Kph </strong>
        <br> Avg Humidity: <strong>${forecastingOf.day.avghumidity} % </strong>
        <br> Day's Condition: <strong>${forecastingOf.day.condition.text} </strong>`;
        day.style.background = getBackgroundColor(forecastingOf.day.condition.text)
        body.style.background = getBackgroundColor(data.forecast.forecastday[0].day.condition.text)
    })

}

// Event listener for the search button
search.addEventListener('click', (event) => {
    event.preventDefault();

    const city = searchField.value;
    // Check if weather data for this city is already stored
    const storedData = sessionStorage.getItem(city);

    if (city === '') {
        alert("Please enter a city name");

    } 
    else if (!/^[a-zA-Z\s]+$/.test(city)) {
        alert("City name shouldn't contain any special characters ");

    }
    

    else if (storedData) {
        // If data is stored, parse and display it
        const data = JSON.parse(storedData);
        displayWeather(data);
        
    } 
    else {
        const apiUrl = `${URL}key=${APIkey}&q=${city}&days=8&aqi=no&alerts=no`;

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
                content.innerHTML = `Unable to find Users location "${searchField.value}"`;
                temp.innerHTML = `Not available !!!`;
                humidity.innerHTML = `Not available !!!`;
                windSpeed.innerHTML = `Not available !!!`;
                location1.innerHTML = `Not available !!!`;
                condition.innerHTML = `Not available !!!`;

                const days = [day1, day2, day3, day4, day5, day6, day7];
                days.forEach((day, index) => {
                    day.innerHTML = `Not available !!!`
                    day.style.background = "linear-gradient(to top, blue, white)"
                    body.style.background = "linear-gradient(to top, white, blue)"
                    searchField.innerHTML = '';
                })
             });
    }
});
