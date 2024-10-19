"use client";
import React, { useState, useEffect } from 'react';

const MainClock = () => {
    // State to hold the current time
    const [time, setTime] = useState(new Date());

    // useEffect to set up a timer that updates the time every second
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        // Cleanup the interval on component unmount
        return () => clearInterval(timerId);
    }, []);

    // Function to format the time as a string
    const formatTime = (date) => {
        const hours = date.getHours() % 12 || 12; // Convert 24-hour time to 12-hour time
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero to minutes
        const seconds = date.getSeconds().toString().padStart(2, '0'); // Add leading zero to seconds
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM
        return `${hours}:${minutes}:${seconds} ${ampm}`; // Return formatted time string
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1> {/* Display the formatted time */}
        </div>
    );
};

export default MainClock;
