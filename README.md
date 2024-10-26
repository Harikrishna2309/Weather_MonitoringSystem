# Weather Monitoring App

## Table of Contents
- [Objective](#objective)
- [Features](#features)
- [DataSource](#DataSource)
- [SetupInstructions](#setupinstructions)
- [Steps](#Steps)
- [Dependencies](#dependencies)


## Objective
The Real-Time Data Processing System for Weather Monitoring is designed to monitor weather conditions across major metro cities in India and provide summarized insights based on rolling weather data. The system continuously retrieves weather updates from the OpenWeatherMap API and calculates daily summaries, and alerts on specific weather thresholds.

## Features
- Continuous Data Retrieval: Retrieve weather data at 5 minutes intervals.
- Daily Summaries: Calculate and store daily aggregates for temperature and weather conditions.
- Alerting System: Trigger alerts when given weather thresholds are breached.
- Visualizations: Provide visual insights on daily weather summaries, historical trends, and alerts.

## DataSource
- OpenWeatherMap API: Accesses real-time weather data for Indian metro cities (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).

## SetupInstructions
- Prerequisites
- Java 17 (for backend processing)
- Maven (for building the backend)
- React.js and npm (for frontend)
- MongoDB database for storing daily weather summaries

## Steps
- Clone the Repository
git clone https://github.com/Harikrishna2309/Weather_MonitoringSystem

- Backend Setup
 1) Navigate to the backend (cd weather-monitor)
 2) Install dependencies using Maven:
(mvn clean install)
3) run the application

- Frontend Setup
1) Navigate to the frontend (cd weather-app)
2) Install dependencies (npm install)
3) run the application(npm start)

## Dependencies
- Backend: Java, Spring Boot, MongoDB, OpenWeatherMap API
- Frontend: React (for visualizations), Axios (API calls)