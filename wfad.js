console.log('working');

const search = document.querySelector("#search");
const searchField = document.querySelector("#city");
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


const APIkey = "e1cfcbdeb8634f3b94862203241309";
const URL = "https://api.weatherapi.com/v1/forecast.json?";

// Function to display weather data
function displayWeather(data) { 

    function getBackgroundColor(condition) {
        const conditionLower = condition.toLowerCase(); // make condition lowercase
        if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
            return '#FFD700'; // Light yellow for sunny/clear
        } else if (conditionLower.includes("partly cloudy")) {
            return '#B0C4DE'; // Light grayish blue for partly cloudy
        } else if (conditionLower.includes("cloudy") || conditionLower.includes("overcast")) {
            return '#A9A9A9'; // Dark gray for cloudy/overcast
        } else if (conditionLower.includes("rain") || conditionLower.includes("thunderstorm")) {
            return '#4682B4'; // Dark blue for rain/thunderstorms
        } else if (conditionLower.includes("snow")) {
            return '#F0FFFF'; // Light blue for snow
        } else {
            return '#FFFFFF'; // Default white background for unknown conditions
        }
    }

    content.innerHTML = `<img src="https:${data.forecast.forecastday[0].day.condition.icon}"> City: ${searchField.value}`;
    temp.innerHTML = `${Math.round(data.current.temp_c)}°C`;
    humidity.innerHTML = `${data.current.humidity} %`;
    windSpeed.innerHTML = `${data.current.wind_kph} Kph`;
    // Correcting latitude and longitude display
    location1.innerHTML = `Latitude: ${data.location.lat} <br> Longitude: ${data.location.lon}`;

    day1.innerHTML = `<img src="https:${data.forecast.forecastday[1].day.condition.icon}">
    <br> Forecast Date: ${data.forecast.forecastday[1].date} 
    <br> Avg temp: ${Math.round(data.forecast.forecastday[1].day.avgtemp_c)} °C 
    <br> Avg Wind speed: ${data.forecast.forecastday[1].day.maxwind_kph} Kph 
    <br> Avg Humidity: ${data.forecast.forecastday[1].day.avghumidity} % 
    <br> Day's Condition: ${data.forecast.forecastday[1].day.condition.text}`;
    day1.style.backgroundColor = getBackgroundColor(data.forecast.forecastday[1].day.condition.text)
    
    day2.innerHTML = `<img src="https:${data.forecast.forecastday[2].day.condition.icon}">
    <br> Forecast Date: ${data.forecast.forecastday[2].date}
    <br> Avg temp: ${Math.round(data.forecast.forecastday[2].day.avgtemp_c)} °C 
    <br> Avg Wind speed: ${data.forecast.forecastday[2].day.maxwind_kph} Kph 
    <br> Avg Humidity: ${data.forecast.forecastday[2].day.avghumidity} % 
    <br> Day's Condition: ${data.forecast.forecastday[2].day.condition.text}`;
    day2.style.backgroundColor = getBackgroundColor(data.forecast.forecastday[2].day.condition.text)

    day3.innerHTML = `<img src="https:${data.forecast.forecastday[3].day.condition.icon}">
    <br> Forecast Date: ${data.forecast.forecastday[3].date} 
    <br> Avg temp: ${Math.round(data.forecast.forecastday[3].day.avgtemp_c)} °C 
    <br> Avg Wind speed: ${data.forecast.forecastday[3].day.maxwind_kph} Kph 
    <br> Avg Humidity: ${data.forecast.forecastday[3].day.avghumidity} % 
    <br> Day's Condition: ${data.forecast.forecastday[3].day.condition.text}`;
    day3.style.backgroundColor = getBackgroundColor(data.forecast.forecastday[3].day.condition.text)

    day4.innerHTML = `<img src="https:${data.forecast.forecastday[4].day.condition.icon}">
    <br> Forecast Date: ${data.forecast.forecastday[4].date} 
    <br> Avg temp: ${Math.round(data.forecast.forecastday[4].day.avgtemp_c)} °C 
    <br> Avg Wind speed: ${data.forecast.forecastday[4].day.maxwind_kph} Kph 
    <br> Avg Humidity: ${data.forecast.forecastday[4].day.avghumidity} % 
    <br> Day's Condition: ${data.forecast.forecastday[4].day.condition.text}`;
    day4.style.backgroundColor = getBackgroundColor(data.forecast.forecastday[4].day.condition.text)

    day5.innerHTML = `<img src="https:${data.forecast.forecastday[5].day.condition.icon}">
    <br> Forecast Date: ${data.forecast.forecastday[5].date} 
    <br> Avg temp: ${Math.round(data.forecast.forecastday[5].day.avgtemp_c)} °C 
    <br> Avg Wind speed: ${data.forecast.forecastday[5].day.maxwind_kph} Kph 
    <br> Avg Humidity: ${data.forecast.forecastday[5].day.avghumidity} % 
    <br> Day's Condition: ${data.forecast.forecastday[5].day.condition.text}`;
    day5.style.backgroundColor = getBackgroundColor(data.forecast.forecastday[5].day.condition.text)

    day6.innerHTML = `<img src="https:${data.forecast.forecastday[6].day.condition.icon}">
    <br> Forecast Date: ${data.forecast.forecastday[6].date} 
    <br> Avg temp: ${Math.round(data.forecast.forecastday[6].day.avgtemp_c)} °C 
    <br> Avg Wind speed: ${data.forecast.forecastday[6].day.maxwind_kph} Kph 
    <br> Avg Humidity: ${data.forecast.forecastday[6].day.avghumidity} % 
    <br> Day's Condition: ${data.forecast.forecastday[6].day.condition.text}`;
    day6.style.backgroundColor = getBackgroundColor(data.forecast.forecastday[6].day.condition.text)

    day7.innerHTML = `<img src="https:${data.forecast.forecastday[7].day.condition.icon}">
    <br> Forecast Date: ${data.forecast.forecastday[7].date} 
    <br> Avg temp: ${Math.round(data.forecast.forecastday[7].day.avgtemp_c)} °C 
    <br> Avg Wind speed: ${data.forecast.forecastday[7].day.maxwind_kph} Kph 
    <br> Avg Humidity: ${data.forecast.forecastday[7].day.avghumidity} % 
    <br> Day's Condition: ${data.forecast.forecastday[7].day.condition.text}`;
    day7.style.backgroundColor = getBackgroundColor(data.forecast.forecastday[7].day.condition.text)

    console.log(data);

    if (data.forecast.forecastday[7].day.condition.text.trim().toLowerCase() === "partly cloudy") {
        day7.style.backgroundColor = 'Red';
        day7.innerHTML += " Working";
    }
}

// Event listener for the search button
search.addEventListener('click', (event) => {
    event.preventDefault();

    const city = searchField.value;
    // Check if weather data for this city is already stored
    const storedData = sessionStorage.getItem(city);

    if (city ===''){
        alert("Please Enter city Name")
    }

    else if (storedData) {
        // If data is stored, parse and display it
        const data = JSON.parse(storedData);
        displayWeather(data);
    } else {
        const apiUrl = `${URL}key=${APIkey}&q=${city}&days=8&aqi=no&alerts=no`;

        fetch("http://ip-api.com/json/")
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

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
