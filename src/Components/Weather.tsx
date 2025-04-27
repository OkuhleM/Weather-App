/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useRef, useState} from 'react'
import '../App.css';
import Search_Icon from '../assets/Search_Icon.png';
import clear from '../assets/clear.png';
import Wind from '../assets/Wind.png'
import Humidity from '../assets/Humidity.png';
import Cloudy from '../assets/Cloudy.png';
import Rainy from '../assets/Rainy.png';
import snow from '../assets/snow.png';
import thunderstorm from '../assets/thunderstorm.png';
import Mist from '../assets/Mist.png'


function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

const Icons = {
  "01d": clear,
  "01n": clear,
  "02d": Cloudy,
  "02n": Cloudy,
  "03d": clear,
  "03n": clear,
  "04d": Cloudy,
  "04n": Cloudy,
  "09d": Rainy,
  "09n": Rainy,
  "10d": Rainy,
  "10n": Rainy,
  "11d": thunderstorm,
  "11n": thunderstorm,
  "13d": snow,
  "13n": snow,
  "50d": Mist,
  "50n": Mist
}

  const ApiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async (city: unknown) => {

if(city === ""){
alert("City Name cannot be Empty!");
return;
}

try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`

      const response = await fetch(url)
      const fetchData = await response.json();
      const myIcons  = Icons[fetchData.weather[0].icon] || clear;

      setWeatherData({
        humidity: fetchData.main.humidity,
        windSpeed: fetchData.wind.speed,
        temperature: Math.floor(fetchData.main.temp),
        location: fetchData.name,
        icon: myIcons

      })
  
} catch (error) {
setWeatherData(false)
console.error("Error in fetching data")
} 
 }

 console.log("weatherData: ", weatherData)
    
useEffect(()=>{
getWeather("Sandton")
},[])

  return (
    <div className='Container'>
      {/* <h1>Weather</h1> */}
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search'/>
        <img src={Search_Icon} className='searchIcon' onClick={()=>getWeather(inputRef.current.value)} alt='searchIcon'/>
      </div>


      <img src={weatherData.icon} alt='clear' className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>

      <div className='weather-data'>
        <div className="data">
          <img src={Humidity} alt='Wind' className='icon' />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="data">
          <img src={Wind} alt='Wind' className='icon'/>
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
        </div>
      </div>
  )
}

export default Weather;