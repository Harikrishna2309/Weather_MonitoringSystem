// src/components/DailySummary.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DailySummary.css';

const DailySummary = () => {
    const [dailySummaries, setDailySummaries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost:8080/api/weather/summary');
            
            // Group summaries by date
            const summariesByDate = result.data.reduce((acc, summary) => {
                const dateKey = summary.date; // Use date as the key

                if (!acc[dateKey]) {
                    acc[dateKey] = {}; // Create an object for this date
                }

                // Store the summary only if the city has not been added yet
                if (!acc[dateKey][summary.city]) {
                    acc[dateKey][summary.city] = summary; // Add summary keyed by city
                }
                
                return acc;
            }, {});

            // Convert the grouped summaries back to an array
            setDailySummaries(summariesByDate);
        };

        fetchData();
    }, []);

    return (
        <div className="daily-summary">
            <h2>Daily Weather Summary</h2>
            {Object.entries(dailySummaries).map(([date, citySummaries]) => (
                <div key={date} className="summary-by-date">
                    <h3>{new Date(date).toLocaleDateString()}</h3>
                    <ul>
                        {Object.values(citySummaries).map((summary) => (
                            <li key={summary.id}>
                                <span className="city">{summary.city}</span>: 
                                <span className="temp">Avg Temp: {summary.avgTemp.toFixed(1)}°C</span>, 
                                <span className="temp">Max Temp: {summary.maxTemp.toFixed(1)}°C</span>, 
                                <span className="temp">Min Temp: {summary.minTemp.toFixed(1)}°C</span>, 
                                <span className="condition">Condition: {summary.dominantCondition}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default DailySummary;
