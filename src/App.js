import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = "9334f65eac03523d11970a00b1a5db7c";

  const fetchWeather = () => {
    if (!city) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          setError("Please enter a valid city 😔.");
          setWeather(null);
        } else {
          setWeather(data);
          setError("");
        }
      })
      .catch(() => {
        setError("Failed to find ⚠️.");
        setWeather(null);
      });
  };

  return (
    <div className="container">
      <h1>⛺ Weather Finder</h1>
      <input
        type="text"  placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {error && <p className="error">{error}</p>}
      {weather && !error && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p> ♨️ Temperature: {weather.main.temp}°C</p>
          <p> ♾️ Description: {weather.weather[0].description}</p>
          <p> 🍃 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;