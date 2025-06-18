'use client';

import React, { useState } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState<string[]>(["Eat Breakfast", "Do Laundry", "Finish Homework"]);
    const [newTask, setNewTask] = useState<string>("");
    
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }
    
    function addTask() {
        const trimmedTask = newTask.trim();
        if(trimmedTask) {
            setTasks(t => [...t, trimmedTask]);
            setNewTask("");
        }
    }
    
    function deleteTask(index: number) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }
    
    function moveTaskUp(index: number) {
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index: number) {
        if(index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">To-Do List</h1>
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && newTask.trim().length > 0) {
                            addTask();
                        }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={addTask}
                    disabled={!newTask.trim()}
                >
                    Add 
                </button>
            </div>
            <ol className="space-y-3">
                {tasks.map((task, index) => 
                    <li key={index} className="flex items-center gap-2 p-3 bg-gray-700 rounded-lg">
                        <span className="flex-1 text-white">{task}</span>
                        <div className="flex gap-1">
                            <button 
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                                onClick={() => deleteTask(index)}
                            >
                                Delete
                            </button>
                            <button 
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                onClick={() => moveTaskUp(index)}
                                disabled={index === 0}
                            >
                                ↑
                            </button>
                            <button 
                                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                onClick={() => moveTaskDown(index)}
                                disabled={index === tasks.length - 1}
                            >
                                ↓
                            </button>
                        </div>
                    </li>
                )}
            </ol>
        </div>
    );
}

export default TodoList; 