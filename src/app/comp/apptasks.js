import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import startlogo from './svg/start.svg';
import stoplogo from './svg/stop.svg';
import { formatDuration } from '../helper';
import styles from "../page.module.css";

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
    return <div className={styles.centerItems}>{formatDuration(duration.toFixed(2))}</div>;
};

// Component to display either a running timer or a static duration
const DurationDiv = ({ task }) => {
    const taskDuration = task.duration.toFixed(2);
    return task.timestamps.length === 1 ? (
        <RunningTimer intDuration={task.duration} />
    ) : (
        <div className={styles.centerItems}>{formatDuration(taskDuration)}</div>
    );
};

// Main component to display tasks and handle start/stop actions
export default function AppTask({ tasks, pushTimeStamp, setTasks, taskgrouping }) {
    // Callback to handle start/stop action
    const handleStart = useCallback((id) => {
        pushTimeStamp(id, new Date());
    }, [pushTimeStamp]);

    const handleCompany = useCallback((id, company) => {
        setTasks((prevTasks) => {
            const taskIndex = prevTasks.findIndex((t) => t.id === id);
            if (taskIndex === -1) return prevTasks;

            const updatedTasks = [...prevTasks];
            const task = { ...updatedTasks[taskIndex] };
            task.company = company;
            updatedTasks[taskIndex] = task;
            return updatedTasks;
        });
    }, [setTasks]);

    return (
        <>
            {tasks.map((task, index) => (
                <div
                    key={index}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto 38px',
                        borderBottom: '1px solid #ccc',
                        padding: '1rem'
                    }}
                    className={styles.ctas}
                >
                    <div className={styles.centerItems}>{task.task}</div>
                    <DurationDiv task={task} />
                    <select
                        value={task.company || ""}
                        onChange={(e) => handleCompany(task.id, e.target.value)}
                    >
                        <option className={styles.options} value="" disabled>Company</option>
                        {taskgrouping.map((group, index) => (
                            <option key={index} className={styles.options} value={group}>{group}</option>
                        ))}
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
