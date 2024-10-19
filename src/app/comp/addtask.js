"use client";
import { useState } from "react";
import styles from "../page.module.css";
import AppTask from "./apptasks";

export default function AddTask(){

    const [tasks, setTasks] = useState([]);
    // appendTask appends a task to the tasks array
    const appendTask = (task) => {
        setTasks([...tasks, task]);
    };
    // pushTimeStamp pushes a timestamp to a task's timestamps array
    const pushTimeStamp = (taskid, timestamp) => {
        const taskIndex = tasks.findIndex((t) => t.id === taskid);
        const updatedTasks = [...tasks];
        // If the task is found, push the timestamp to the task's timestamps array
        if (taskIndex !== -1) {
            updatedTasks[taskIndex].timestamps.push(timestamp);
            setTasks(updatedTasks);
        }
        // TODO: Add logic to calculate the duration of the task
    }

    // showTaskInput is a boolean that toggles the task input form
    const [showTaskInput, setShowTaskInput] = useState(false);
    // showTaskInputClick toggles the task input form
    const showTaskInputClick = () => {
        setShowTaskInput(!showTaskInput);
    };
    // handleAddTask adds a task to the tasks array
    const handleAddTask = () => {
        const taskname = document.getElementById("task").value;
        var task = {
            id: crypto.randomUUID(),
            task: taskname,
            completed: false,
            completeddttm: null,
            duration: 0,
            createddttm: new Date(),
            timestamps: []
        };
        appendTask(task);
        document.getElementById("task").value = "";
    }
    
    return(<>
        <div className={styles.ctas}>
            <a
                className={styles.primary}
                href="#"
                rel="noopener noreferrer"
                onClick={showTaskInputClick}
            >
                Add Task
            </a>
        </div>

        {showTaskInput && (
        <div
            className={`${styles.ctas}`}
        >
            <input type="text" id="task" name="task" placeholder="Task" />
            <a className={styles.primary} href="#" onClick={handleAddTask}>
            Add
            </a>
        </div>
        )}

        <AppTask tasks={tasks} pushTimeStamp={pushTimeStamp} />
    </>)
}