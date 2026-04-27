/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "../App.css";
import Search_Icon from "../assets/Search_Icon.png";
import clear from "../assets/clear.png";
import Wind from "../assets/Wind.png";
import Humidity from "../assets/Humidity.png";
import Cloudy from "../assets/Cloudy.png";
import Rainy from "../assets/Rainy.png";
import snow from "../assets/snow.png";
import thunderstorm from "../assets/thunderstorm.png";
import Mist from "../assets/Mist.png";

function Weather() {
  type WeatherData = {
    temperature: number;
    humidity: number;
    windSpeed: number;
    location: string;
    icon: any;
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const Icons: Record<number, string> = {
    0: clear,
    1: clear,
    3: Cloudy,
    45: Cloudy,
    48: clear,
    51: clear,
    53: Cloudy,
    55: Cloudy,
    61: Rainy,
    63: Rainy,
    65: Rainy,
    71: Rainy,
    73: thunderstorm,
    75: thunderstorm,
    80: snow,
    81: snow,
    82: Mist,
    95: Mist,
  };

  const getWeather = async (city: string) => {
    if (city === "") {
      alert("City Name cannot be Empty!");
      return;
    }

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
      );

      const geoData = await geoRes.json();
      console.log("geoData", geoData);

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found");
        return;
      }

      const place = geoData.results[0];
      const { latitude, longitude, name } = place;

      const url = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`,
      );

      const weatherData = await url.json();
      console.log("weatherData", weatherData);

      const code = weatherData.current.weather_code;
      const icon = Icons[code] || clear;

      setWeatherData({
        temperature: Math.floor(weatherData.current.temperature_2m),
        windSpeed: weatherData.current.wind_speed_10m,
        humidity: weatherData.current.relative_humidity_2m,
        location: name,
        icon: icon,
      });

      console.log("weatherData", weatherData);
    } catch (error) {
      console.log("error", error);
      console.error("Error in fetching data");
    }
  };

  useEffect(() => {
    getWeather("Sandton");
  }, []);

  if (!weatherData) {
    return (
      <div className="Container">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="Container">
      {/* <h1>Weather</h1> */}
      <div className="weather-card">


      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={Search_Icon}
          className="searchIcon"
          onClick={() => getWeather(inputRef.current?.value || "")}
          alt="searchIcon"
        />
      </div>

      <img src={weatherData.icon} alt="Weather" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>

      <div className="weather-data">
        <div className="data">
          <img src={Humidity} alt="Wind" className="icon" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="data">
          <img src={Wind} alt="Wind" className="icon" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Weather;
