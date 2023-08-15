const apiKey = 'bc09abfcbb9ddb01e98b3cd12146b435'; // Replace with your actual API key
const fetchButton = document.getElementById('fetchWeather');
const weatherInfo = document.getElementById('weatherInfo');
const cityInput = document.getElementById('cityInput');

fetchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                
                // Fetch city name and country from the API response
                const cityName = data.name;
                const country = data.sys.country;
                
                // Fetch weather icon code and construct icon URL
                const iconCode = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

                // Construct the HTML to display
                const weatherDataHTML = `
                    <div class="weather-container">
                        <div class="data">
                            <p>City: ${cityName}, ${country}</p>
                            <p>Temperature: ${temperature}°C</p>
                            <p>Description: ${description}</p>
                            <p>Humidity: ${humidity}%</p>
                            <p>Wind Speed: ${windSpeed} m/s</p>
                        </div>
                        <div class="icon">
                            <img src="${iconUrl}" alt="Weather Icon">
                        </div>
                    </div>
                `;

                // Update the weatherInfo element with the HTML
                weatherInfo.innerHTML = weatherDataHTML;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = 'An error occurred while fetching weather data.';
            });
    }
});
