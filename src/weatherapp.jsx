import { useState } from "react";
import "./assets/weather.css";
import './assets/weather.css'; 



function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const apiKey = "c65fd4c1c944882aa4c0d3964f6f4df0";

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="weather-card">
    <h1>Weather App 🌤️</h1>

    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>

    <div id="result">
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p><strong>Temp:</strong> {weather.main.temp}°C</p>
          <p><strong>Condition:</strong> {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  </div>
);
}
export default WeatherApp;