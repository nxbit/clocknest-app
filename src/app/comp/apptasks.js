import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import startlogo from './svg/start.svg';
import stoplogo from './svg/stop.svg';

// Function to format duration from seconds to HH:MM:SS format
const formatDuration = (seconds) => {
    const totalSeconds = parseFloat(Number(seconds).toFixed(1));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = (totalSeconds % 60).toFixed(1);

    if (hours > 0) {
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`;
    } else {
        return `${remainingSeconds}s`;
    }
};

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
export default function AppTask({ tasks, pushTimeStamp, setTasks }) {
    
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
                    <select
                        value={task.company || ""}
                        onChange={(e) => {
                            const updatedTasks = tasks.map(t => 
                                t.id === task.id ? { ...t, company: e.target.value } : t
                            );
                            // Assuming you have a function to update the tasks state
                            setTasks(updatedTasks);
                        }}
                    >
                        <option value="" disabled>Company</option>
                        <option value="Babybots">Babybots</option>
                        <option value="TSP">TSP</option>
                        <option value="ACS">ACS</option>
                        <option value="Vantage">Vantage</option>
                        <option value="Alliance">Alliance</option>
                    </select>
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