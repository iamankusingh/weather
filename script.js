// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=91588b569e10538682e21bafd21148a9&units=metric

const apiKey = "yourApiKey";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  document.querySelector(".loading").style.display = "block";
  document.querySelector(".weather").style.opacity = "0.4";
  document.querySelector(".error").style.opacity = "0.4";
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "flex";
      var data = await response.json();

      console.log(data);

      document.querySelector(".city").innerHTML =
        data.name + ", " + data.sys.country;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    document.querySelector(".loading").style.display = "none";
    document.querySelector(".weather").style.opacity = "1";
    document.querySelector(".error").style.opacity = "1";
  }
}

checkWeather("delhi");

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
