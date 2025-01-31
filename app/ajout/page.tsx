"use client";

import React, { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import Link from 'next/link';

// Définir un type pour les tâches
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
}

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get<Task[]>('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim() || !newDescription.trim()) return;

    try {
      const response = await axiosClient.post('/tasks/addtask', {
        title: newTask,
        description: newDescription,
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask('');
      setNewDescription('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
      <div className="mb-6">
        <form onSubmit={addTask} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Task Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between border-b py-4 last:border-none">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-blue-500 border-gray-300 rounded"
                  />
                  <h2 className="text-lg font-medium">{task.title}</h2>
                </div>
                <p className="text-gray-700">{task.description}</p>
                {task.dueDate && (
                  <p className="text-gray-500 text-sm">
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                <Link href="suppression">
                  <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </Link>
                <Link href={`/modification/${task.id}`}>
                  <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                    Edit
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
