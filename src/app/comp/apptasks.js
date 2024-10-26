import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import startlogo from './svg/start.svg';
import stoplogo from './svg/stop.svg';

// Function to format duration from seconds to HH:MM:SS format
const formatDuration = (seconds) => {
    seconds = parseFloat(Number(seconds).toFixed(1));
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format based on the time ranges
    if (hours > 0) {
        return `${hours.toFixed(0)}h ${minutes.toFixed(0)}m ${remainingSeconds.toFixed(1)}s`;
    } else if (minutes > 0) {
        return `${minutes.toFixed(0)}m ${remainingSeconds.toFixed(1)}s`;
    } else {
        return `${remainingSeconds.toFixed(1)}s`;
    }
}

// Component to display a running timer
function RunningTimer({ intDuration }) {
    const [duration, setDuration] = useState(intDuration);

    useEffect(() => {
        // Update the duration every 100 milliseconds
        const interval = setInterval(() => {
            setDuration(prevDuration => prevDuration + 0.1);
        }, 100);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return <div>{formatDuration(duration.toFixed(2))}</div>;
}

// Component to display either a running timer or a static duration
const DurationDiv = ({ task }) => {
    const taskDuration = task.duration.toFixed(2);

    return task.timestamps.length === 1 ? (
        <RunningTimer intDuration={task.duration} />
    ) : (
        <div>{formatDuration(taskDuration)}</div>
    );
};

// Main component to display tasks and handle start/stop actions
export default function AppTask({ tasks, pushTimeStamp }) {
    
    // Callback to handle start/stop action
    const handleStart = useCallback((id) => {
        pushTimeStamp(id, new Date());
    }, [pushTimeStamp]);

    return (
        <>
            {tasks.map((task, index) => (
                <div
                    key={index}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto 38px',
                        borderBottom: '1px solid #ccc',
                    }}
                >
                    <div>{task.task}</div>
                    <DurationDiv task={task} />
                    <Image
                        src={task.isrunning ? stoplogo : startlogo}
                        alt="toggle"
                        width="38"
                        height="38"
                        onClick={() => handleStart(task.id)}
                    />
                </div>
            ))}
        </>
    );
}