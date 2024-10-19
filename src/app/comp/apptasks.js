import startlogo from './svg/start.svg';
import Image from 'next/image';

export default function AppTask({tasks, pushTimeStamp}){
    // handleStart is a function that takes an id as an argument and pushes a timestamp to the task's timestamp array.
    const handleStart = (id) => {
        pushTimeStamp(id, new Date());
    };

    return(
    <>
    {
        tasks.map((task, index) => {
            return(<>
                <div key={index} style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto 38px",
                    borderBottom: "1px solid #ccc",
                }}>
                    <div>{task.task}</div>
                    <div>{task.duration}</div>
                    <Image src={startlogo} alt="delete" width="38" height="38" onClick={() => handleStart(task.id)}/>
                </div>
                <div>
                    {task.timestamps.map((i)=><div>{i[0]}</div>)}
                </div>
                </>
            )
        })
    }
    </>)
}