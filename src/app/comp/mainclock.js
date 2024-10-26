"use client";
import React, { useState, useEffect } from 'react';
import { formatTime } from '../helper';

// MainClock component that displays the current time
const MainClock = () => {
    // State to hold the current time
    const [time, setTime] = useState(new Date());
    // State to check if the component is client-side rendered
    const [isClient, setIsClient] = useState(false);

    // useEffect to set up a timer that updates the time every second
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        setIsClient(true);
        // Cleanup the interval on component unmount
        return () => clearInterval(timerId);
    }, []);

    // Return null if the component is not client-side rendered
    // This is to prevent the component from rendering on the server
    if(!isClient) return null;

    return (
        <div>
            <h1>{formatTime(time)}</h1>
        </div>
    );
};

export default MainClock;
