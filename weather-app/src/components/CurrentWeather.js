// src/components/CurrentWeather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CurrentWeather.css';

const CurrentWeather = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8080/api/weather/current');
                setWeatherData(result.data);
            } catch (error) {
                console.error("Error fetching weather data", error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 300000); // Fetch data every 5 minutes

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="weather-container">
            <h2 className="weather-title">Current Weather</h2>
            <ul className="weather-list">
                {weatherData.map((city) => (
                    <li className="weather-item" key={city.id}>
                        <span className="city-name">{city.name}</span>
                        <span className="weather-main">Condition: {city.main.temp > 30 ? 'Hot' : 'Normal'}</span>
                        <span className="temp-info">
                            Temperature: {city.main.temp.toFixed(1)}°C (Feels Like: {city.main.feels_like.toFixed(1)}°C)
                        </span>
                        <span className="timestamp">
                            Updated: {new Date(city.timestamp).toLocaleString()}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CurrentWeather;
