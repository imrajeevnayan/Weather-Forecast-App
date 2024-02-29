function getWeather() {
    const cityInput = document.getElementById("cityInput").value;

    if (cityInput.trim() === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "ff2ed63375f53baee78d3b1d241f6fb2"; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`);
        })
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again.");
        });
}

function displayCurrentWeather(data) {
    const currentWeatherContainer = document.getElementById("current-weather");
    currentWeatherContainer.innerHTML = "";

    const weatherCard = document.createElement("div");
    weatherCard.classList.add("weather-card");

    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    weatherCard.innerHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Description: ${weatherDescription}</p>
    `;

    currentWeatherContainer.appendChild(weatherCard);
}

function displayForecast(data) {
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = "";

    const forecastList = data.list;

    for (let i = 0; i < forecastList.length; i += 8) {
        const forecastItem = forecastList[i];

        const weatherCard = document.createElement("div");
        weatherCard.classList.add("weather-card");

        const date = new Date(forecastItem.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "long" });
        const temperature = forecastItem.main.temp;
        const weatherDescription = forecastItem.weather[0].description;

        weatherCard.innerHTML = `
            <h2>${day}</h2>
            <p>Temperature: ${temperature} °C</p>
            <p>Description: ${weatherDescription}</p>
        `;

        forecastContainer.appendChild(weatherCard);
    }
}
