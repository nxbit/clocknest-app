import startlogo from './svg/start.svg';
import Image from 'next/image';

export default function AppTask({tasks}){

    return(
    <>
    {
        tasks.map((task, index) => {
            return(
                <div key={index} style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto 38px",
                    borderBottom: "1px solid #ccc",
                }}>
                    <div>{task.task}</div>
                    <div>00:00:00</div>
                    <Image src={startlogo} alt="delete" width="38" height="38" />
                </div>
            )
        })
    }
    </>)
}