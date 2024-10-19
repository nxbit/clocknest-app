/**
 * AddTask component allows users to add and manage tasks.
 * 
 * @component
 * @example
 * return (
 *   <AddTask />
 * )
 */
"use client";
import { useState, useCallback } from "react";
import styles from "../page.module.css";
import AppTask from "./apptasks";
import { Parser } from "json2csv";

/**
 * Custom hook to manage the state of tasks.
 * 
 * @returns {Array} An array containing the tasks state and a function to update it.
 */
export default function AddTask() {
    const [tasks, setTasks] = useState([]);
    const [showTaskInput, setShowTaskInput] = useState(false);
    const [taskName, setTaskName] = useState("");

    /**
     * Appends a new task to the tasks state.
     * 
     * @param {Object} task - The task object to be added.
     */
    const appendTask = useCallback((task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    }, []);

    /**
     * Adds a timestamp to a specific task and calculates the duration.
     * 
     * @param {string} taskid - The ID of the task to update.
     * @param {string} timestamp - The timestamp to be added.
     */
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

    /**
     * Toggles the visibility of the task input field.
     */
    const showTaskInputClick = useCallback(() => {
        setShowTaskInput((prevShowTaskInput) => !prevShowTaskInput);
    }, []);

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

    /**
     * Handles the addition of a new task.
     */
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

            <AppTask tasks={tasks} pushTimeStamp={pushTimeStamp} />
        </>
    );
}