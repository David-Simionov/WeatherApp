const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", getWeather);

function getWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        weatherInfo.innerHTML = "<p>Enter a city name!</p>";
        return;
    }

    fetch(`/.netlify/functions/weather?city=${encodeURIComponent(city)}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === "404") {
                weatherInfo.innerHTML = "<p>City not found!</p>";
            } else {
                const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                weatherInfo.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <img src="${icon}" alt="weather icon">
                    <p>${data.weather[0].description}</p>
                    <h3>${data.main.temp}°C</h3>
                `;
            }
        })
        .catch(() => {
            weatherInfo.innerHTML = "<p>Error loading weather data!</p>";
        });
}
