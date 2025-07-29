const API_KEY = 'b0404fd6fc5cba5d272ef5b5f8d1ad92'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

document.getElementById('search-btn').addEventListener('click', searchWeather);

async function searchWeather() {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        // Fetching current weather
        const currentWeather = await fetchWeather('weather', { q: city });
        displayCurrentWeather(currentWeather);

        // Fetching 5-day forecast
        const forecast = await fetchWeather('forecast', { q: city });
        displayForecast(forecast);

        // Clearing any previous errors
        clearError();
    } catch (error) {
        showError('Failed to fetch weather data. Please try again.');
        console.error('Error fetching weather data:', error);
    }
}

async function fetchWeather(endpoint, params) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    url.search = new URLSearchParams({
        ...params,
        appid: API_KEY,
        units: 'metric' 
    }).toString();

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json();
}

function displayCurrentWeather(data) {
    const weatherCard = document.getElementById('current-weather');
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherCard.innerHTML = `
        <h2>Current Weather in ${data.name}, ${data.sys.country}</h2>
        <div class="weather-info">
            <img src="${iconUrl}" alt="${data.weather[0].description}">
            <div class="weather-details">
                <p>Temperature: ${Math.round(data.main.temp)}°C</p>
                <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind: ${data.wind.speed} m/s</p>
                <p>Conditions: ${data.weather[0].description}</p>
            </div>
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');

    // Grouping forecast by day 
    const dailyForecast = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyForecast[date]) {
            dailyForecast[date] = item;
        }
    });

    // Displaying one forecast per day
    Object.values(dailyForecast).slice(0, 5).forEach(day => {
        const date = new Date(day.dt * 1000);
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <h3>${date.toLocaleDateString('en-US', { weekday: 'short' })}</h3>
            <img src="${iconUrl}" alt="${day.weather[0].description}">
            <p>High: ${Math.round(day.main.temp_max)}°C</p>
            <p>Low: ${Math.round(day.main.temp_min)}°C</p>
            <p>${day.weather[0].main}</p>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
}

function clearError() {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = '';
}