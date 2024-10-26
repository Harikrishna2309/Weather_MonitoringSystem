// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CurrentWeather from './components/CurrentWeather';
import DailySummary from './components/DailySummary';
import Alert from './components/Alert';
import './App.css'

function App() {
    const temperatureThreshold = 35;
    const [currentTemp, setCurrentTemp] = React.useState(0);

    React.useEffect(() => {
        const fetchCurrentTemperature = async () => {
            const result = await fetch('http://localhost:8080/api/weather/current');
            const data = await result.json();
            if (data.length > 0) {
                setCurrentTemp(data[0].main.temp);
            } 
        };

        fetchCurrentTemperature();
        const intervalId = setInterval(fetchCurrentTemperature, 300000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Router>
            <div className='app-header'>
                <h1 className='head'>Weather App</h1>
                <nav>
                    <ul className='d-flex'>
                        <li><Link to="/">Current Weather</Link></li>
                        <li><Link to="/daily-summary">Daily Summary</Link></li>
                        <li><Link to="/alerts">Alert</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<CurrentWeather />} />
                    <Route path="/daily-summary" element={<DailySummary />} />
                    <Route path="/alerts" element={<Alert threshold={temperatureThreshold} currentTemp={currentTemp} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 
