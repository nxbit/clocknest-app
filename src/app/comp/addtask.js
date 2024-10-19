"use client";
import { useState } from "react";
import styles from "../page.module.css";
import AppTask from "./apptasks";

export default function AddTask(){
    const [tasks, setTasks] = useState([]);
    const appendTask = (task) => {
        setTasks([...tasks, task]);
    };

    const [showTaskInput, setShowTaskInput] = useState(false);
    const handleAddTaskClick = () => {
        setShowTaskInput(!showTaskInput);
    };
    const handleAddTask = () => {
        const taskname = document.getElementById("task").value;
        var task = {
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

    var task = {
        task: "Build a React app",
        completed: false,
        completeddttm: null,
        duration: 0,
        createddttm: new Date(),
        timestamps: []
    };

    return(<>
        <div className={styles.ctas}>
            <a
                className={styles.primary}
                href="#"
                rel="noopener noreferrer"
                onClick={handleAddTaskClick}
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

        <AppTask tasks={tasks} />
    </>)
}