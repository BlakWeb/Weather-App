const apiKey =  
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
             document.querySelector(".weather").style.display = "none";
        } 

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    
        if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            }
            else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            }
            else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain .png";
            }
            else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle .png";
            }
            else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist .png";
            }

        document.querySelector(".weather").style.display = "block";
         document.querySelector(".error").style.display = "none";
            

        

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}



