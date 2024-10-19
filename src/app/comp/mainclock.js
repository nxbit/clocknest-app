"use client";
import React, { useState, useEffect } from 'react';

const MainClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;
        return strTime;
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1>
        </div>
    );
};

export default MainClock;