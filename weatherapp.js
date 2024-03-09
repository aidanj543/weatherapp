function updateClock(){
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    //this will add zeros to single digit numbers
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes <10) ? "0" + minutes: minutes;
    seconds = (seconds <10) ? "0" + seconds: seconds;

    //this line of code is basically the format of the clock
    let timeString = hours + ":" + minutes + ":" + seconds;

    //this will update the current clock div I put on the html code
    document.getElementById("clock").textContent = timeString;

    //this will call this function to update every second
    setTimeout(updateClock, 1000);
}

//this will call the updateClock function for the first time
updateClock();



document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'bce24c864075f7f5d1cb599c4383865d';
    const apiUrlCurrent = 'https://api.openweathermap.org/data/2.5/weather';
    const apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast';

    const weatherForm = document.getElementById('weather-form');
    const weatherInfo = document.getElementById('weather-info');

    async function getWeather(city) {
        try {
            // Fetch current weather
            const currentResponse = await fetch(`${apiUrlCurrent}?q=${city}&appid=${apiKey}&units=imperial`);
            const currentData = await currentResponse.json();

            // Fetch 5-day forecast
            const forecastResponse = await fetch(`${apiUrlForecast}?q=${city}&appid=${apiKey}&units=imperial`);
            const forecastData = await forecastResponse.json();

            displayWeather(currentData, forecastData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = '<p>Please Try Again</p>';
        }
    }
    function displayWeather(currentData, forecastData) {
        weatherInfo.innerHTML = `
            <h2 class="text-2xl font-semibold mb-2">${currentData.name}, ${currentData.sys.country}</h2>
            <p class="mb-4">Current Temperature: ${currentData.main.temp}°F</p>
            <p class="mb-4">Current Weather: ${currentData.weather[0].description}</p>
            <h3 class="text-xl font-semibold mb-2">5-Day Forecast:</h3>
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weather</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${forecastData.list.map(day => `
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap"><strong>${new Date(day.dt * 1000).toLocaleDateString()}</strong></td>
                            <td class="px-6 py-4 whitespace-nowrap"><strong>${day.main.temp}°F</strong></td>
                            <td class="px-6 py-4 whitespace-nowrap">${day.weather[0].description}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    

    weatherForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const cityInput = document.getElementById('city');
        const city = cityInput.value.trim();

        if (city) {
            getWeather(city);
        } else {
            weatherInfo.innerHTML = '<p>Please enter a city</p>';
        }
    });
});

