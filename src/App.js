import React, { useState } from 'react';
import './App.css';
import clear_icon from "./Assets/clear.png"
import drizzle_icon from "./Assets/drizzle.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import humidity_icon from "./Assets/humidity_icon.png"
import wind_icon from "./Assets/wind_icon.png";



function App() {
  const [wicon, setWicon] = useState(clear_icon);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperature: '24°C',
    location: 'London',
    humidity: '60%',
    wind: '12 km/h',
  });

  const handleSearch = async () => {
    if (city === '') {
      return;
    }

    const apiKey = "add6ea165451ccafc54b56dd269d6e63";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const { main, name, weather, wind } = data;

      setWeatherData({
        temperature: Math.floor(main.temp) + '°C',
        location: name,
        humidity: main.humidity + '%',
        wind: Math.floor(wind.speed) + ' km/h',
      });

      // weather icon based on the weather condition
      const iconCode = weather[0].icon;
      setWicon(getWeatherIcon(iconCode));
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherIcon = (iconCode) => {
    // icon mappings are
    if (iconCode === '01d' || iconCode === '01n') {
      return clear_icon;
    } else if (iconCode === '02d' || iconCode === '02n') {
      return clear_icon;
    } else if (iconCode === '03d' || iconCode === '03n') {
      return drizzle_icon;
    } else if (iconCode === '04d' || iconCode === '04n') {
      return drizzle_icon;
    } else if (iconCode === '09d' || iconCode === '09n') {
      return rain_icon;
    } else if (iconCode === '10d' || iconCode === '10n') {
      return rain_icon;
    } else if (iconCode === '13d' || iconCode === '13n') {
      return snow_icon;
    } else {
      return clear_icon;
    }
  };

  return (
    
    <div className="app-container">
      <div className="search-container">
        <input 
          type="text"
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="weather-container">
      <img src={wicon} alt="Weather Icon" />
        <div className="weather-temp">{weatherData.temperature}</div>
        <div className="location">{weatherData.location}</div>
      </div>
    
      <div className="weather-details">
        <div className="data">
          <div>
            <img src={humidity_icon} alt="Humidity Icon" />
            <div className='text'>Humidity</div>
            <div className="humidity">{weatherData.humidity}</div>
          </div>
          <div>
            <img src={wind_icon} alt="Wind Icon" />
            <div className='text'>Wind Speed</div>
            <div className="wind">{weatherData.wind}</div>
          </div>
        </div>
      </div>
    </div>
   
  );
}

export default App;
