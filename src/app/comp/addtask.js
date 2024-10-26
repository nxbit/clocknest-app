"use client";
import { useState, useCallback, useEffect } from "react";
import styles from "../page.module.css";
import AppTask from "./apptasks";
import { Parser } from "json2csv";

export default function AddTask() {
    // State to store the list of tasks
    const [tasks, setTasks] = useState([]);
    // State to toggle the task input visibility
    const [showTaskInput, setShowTaskInput] = useState(false);
    // State to store the current task name input
    const [taskName, setTaskName] = useState("");
    // State to store the company options
    // TODO: Need to replace with dynamic data
    const [taskgrouping, setTaskGrouping] = useState(["Company A", "Company B", "Company C"]);

    // Callback to append a new task to the tasks list
    const appendTask = useCallback((task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    }, []);

    // Callback to push a timestamp to a specific task
    const pushTimeStamp = useCallback((taskid, timestamp) => {
        setTasks((prevTasks) => {
            // Find the task index in the tasks list
            const taskIndex = prevTasks.findIndex((t) => t.id === taskid);
            // Return the previous tasks list if the task is not found
            if (taskIndex === -1) return prevTasks;

            // Update the task with the new timestamp
            const updatedTasks = [...prevTasks];
            const task = { ...updatedTasks[taskIndex] };
            task.timestamps = [...task.timestamps, timestamp];

            // Calculate the duration of the task from the timestamps
            task.isrunning = true;
            let duration = 0;
            while (task.timestamps.length >= 2) {
                const start = task.timestamps.shift();
                const end = task.timestamps.shift();
                if (end) {
                    task.isrunning = false;
                    duration += (new Date(end) - new Date(start)) / 1000;
                }
            }

            // Update the task duration and the tasks list
            task.duration += duration;
            updatedTasks[taskIndex] = task;
            return updatedTasks;
        });
    }, []);

    // Callback to toggle the task input visibility
    const showTaskInputClick = useCallback(() => {
        setShowTaskInput((prevShowTaskInput) => !prevShowTaskInput);
    }, []);

    // Callback to export tasks as a CSV file
    const exportTasksClick = useCallback(() => {
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(tasks.map(({ company, task, duration }) => ({ company, task, duration })));
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = "tasks.csv";
        document.body.appendChild(a); // Append to body to ensure it works in all browsers
        a.click();
        document.body.removeChild(a); // Clean up after click
        URL.revokeObjectURL(url);
    }, [tasks]);

    // Callback to handle adding a new task
    const handleAddTask = useCallback(() => {
        if (!taskName.trim()) return;

        const task = {
            id: crypto.randomUUID(),
            task: taskName,
            completed: false,
            completeddttm: null,
            duration: 0,
            createddttm: new Date(),
            timestamps: [],
            isrunning: false,
        };
        appendTask(task);
        setTaskName("");
    }, [taskName, appendTask]);

    

    return (
        <>
            <div style={{display: 'grid', gap: '1rem', justifyContent:'center', alignItems: 'center'}} >
                <div className={styles.ctas}>
                    <a
                        className={styles.primary}
                        href="#"
                        rel="noopener noreferrer"
                        onClick={showTaskInputClick}
                    >
                        Add Task
                    </a>
                    <a
                        className={styles.secondary}
                        href="#"
                        rel="noopener noreferrer"
                        onClick={exportTasksClick}
                    >
                        Export Tasks
                    </a>
                </div>
                <div>
                {showTaskInput && (
                    <div className={styles.ctas}>
                        <input
                            type="text"
                            id="task"
                            name="task"
                            placeholder="Set a task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <a className={styles.primary} href="#" onClick={handleAddTask}>
                            Add
                        </a>
                    </div>
                )}
            </div>
            </div>
            <AppTask tasks={tasks} pushTimeStamp={pushTimeStamp} setTasks={setTasks} taskgrouping={taskgrouping} />
        </>
    );
}
