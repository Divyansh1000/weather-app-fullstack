import React, { useState } from "react";
import axios from "axios";

import "../components/WeatherComponent.css";

const WeatherComponent = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/weather/${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>

      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter the name of a city.."
      />

      <button onClick={fetchWeatherData}>Get Weather</button>

      {weatherData && (
        <div>
          <h2>{weatherData.name} </h2>

          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="img"
          />

          <h3>Weather : {weatherData.weather[0].description} </h3>

          <h3>Temperature : {weatherData.main.temp}°C</h3>

          <h3>Humidity : {weatherData.main.humidity}%</h3>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
