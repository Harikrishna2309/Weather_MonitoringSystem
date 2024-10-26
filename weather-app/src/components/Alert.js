// src/components/Alert.js
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Alert.css';

const Alert = ({ threshold, currentTemp }) => {
    const [showAlert, setShowAlert] = useState(true);
    const [email, setEmail] = useState('');
    const [previousTemp, setPreviousTemp] = useState(null);
    const [alertCount, setAlertCount] = useState(0);

    useEffect(() => {
        if (currentTemp > threshold) {
            if (previousTemp !== null && previousTemp > threshold) {
                setAlertCount((prevCount) => prevCount + 1);
            } else {
                setAlertCount(1);
            }
            setShowAlert(true);
            sendEmailAlert(currentTemp);
        } else {
            setAlertCount(0); // Reset alert count
        }
        setPreviousTemp(currentTemp); // Update previous temperature
    }, [currentTemp, threshold, previousTemp]);

    const sendEmailAlert = (currentTemp) => {
        console.log("emailsender");
        if (alertCount === 2) { // Check if alert count reaches 2
            const templateParams = {
                to_email: email,
                message: `Alert! Temperature exceeds ${threshold}°C! Current temperature is ${currentTemp}°C.`,
            };
    
            console.log("Sending email with parameters:", templateParams); // Log template parameters
    
            emailjs.send('service_bpd1xw3', 'template_pok6ndk', templateParams, 'XZabijVthBu8EUUFC')
                .then((response) => {
                    console.log('Email sent successfully!', response.status, response.text);
                })
                .catch((err) => {
                    console.error('Failed to send email. Error:', err);
                });
        }
    };
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
            />
            <button onClick={() => sendEmailAlert(currentTemp)}>Alert</button>
            {currentTemp > threshold && (
                <div className="alert-box alert-exceeds">
                    <strong>Alert!</strong> Temperature exceeds {threshold}°C!
                </div>
            )}
            {currentTemp <= threshold && showAlert && (
                <div className="alert-box alert-safe">
                    <strong>Temperature is below {threshold} degrees.</strong>
                </div>
            )}
        </div>
    );
};

export default Alert;
