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
    // State to check if the component is client-side rendered
    const [isClient, setIsClient] = useState(false);

    // Effect to set the component as client-side rendered
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Callback to append a new task to the tasks list
    const appendTask = useCallback((task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    }, []);

    // Callback to push a timestamp to a specific task
    const pushTimeStamp = useCallback((taskid, timestamp) => {
        setTasks((prevTasks) => {
            const taskIndex = prevTasks.findIndex((t) => t.id === taskid);
            if (taskIndex === -1) return prevTasks;

            const updatedTasks = [...prevTasks];
            const task = { ...updatedTasks[taskIndex] };
            task.timestamps = [...task.timestamps, timestamp];
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
        const csv = json2csvParser.parse(tasks.map(({ task, duration }) => ({ task, duration })));
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

    // Return null if the component is not client-side rendered
    if (!isClient) {
        return null;
    }

    return (
        <>
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

            <AppTask tasks={tasks} pushTimeStamp={pushTimeStamp} setTasks={setTasks} />
        </>
    );
}
