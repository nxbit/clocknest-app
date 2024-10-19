import { useState, useEffect } from 'react';
import Image from 'next/image';
import startlogo from './svg/start.svg';

// RunningTimer is a component that takes an intDuration as a prop and returns a div that displays the duration of the task.
function RunningTimer({intDuration}) {
    const [duration, setDuration] = useState(intDuration);
    useEffect(() => {
        const interval = setInterval(() => {
            setDuration(prevDuration => prevDuration + 0.1);
        }, 100);

        return () => clearInterval(interval);
    }, []);
    return <div>{duration.toFixed(2)}</div>;
};

export default function AppTask({tasks, pushTimeStamp}){
    // handleStart is a function that takes an id as an argument and pushes a timestamp to the task's timestamp array.
    const handleStart = (id) => {
        pushTimeStamp(id, new Date());
    };
    const DurationDiv = ({task}) => {
        var taskDuration = task.duration.toFixed(2);
        return(
            task.timestamps.length == 1 ? <RunningTimer intDuration={task.duration}/> : <div>{taskDuration}</div>
        )
    }

    return(
    <>
    {
        tasks.map((task, index) => {
            
            
            return(<>
                <div key={index} style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto 38px",
                    borderBottom: "1px solid #ccc",
                }}>
                    <div>{task.task}</div>
                    <DurationDiv task={task}/>
                    <Image src={startlogo} alt="delete" width="38" height="38" onClick={() => handleStart(task.id)}/>
                </div>
                </>
            )
        })
    }
    </>)
}