"use client";
import React, { useState, useEffect } from 'react';
import { formatTime } from '../helper';

const MainClock = () => {
    // State to hold the current time
    const [time, setTime] = useState(new Date());

    // useEffect to set up a timer that updates the time every second
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        // Cleanup the interval on component unmount
        return () => clearInterval(timerId);
    }, []);

    return (
        <div>
            <h1>{formatTime(time)}</h1> {/* Display the formatted time */}
        </div>
    );
};

export default MainClock;
