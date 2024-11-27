"use client";

import React, { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const Page = () => {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [newTask, setNewTask] = useState(''); // Nouvelle tâche (titre)
  const [newDescription, setNewDescription] = useState(''); // Nouvelle description

  // Charger les tâches au montage
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fonction pour récupérer les tâches
  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get('/tasks'); // Endpoint du backend
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fonction pour ajouter une tâche
  const addTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!newTask.trim() || !newDescription.trim()) return; // Vérifie que le titre et la description ne sont pas vides

    try {
      const response = await axiosClient.post('/tasks/addtask', {
        title: newTask,
        description: newDescription,
      });
      setTasks([...tasks, response.data]); // Ajouter la nouvelle tâche à la liste
      setNewTask(''); // Réinitialiser le champ du titre
      setNewDescription(''); // Réinitialiser le champ de description
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>

      {/* Formulaire d'ajout de tâche */}
      <div className="mb-6">
        <form onSubmit={addTask} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)} // Met à jour le titre
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Task Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)} // Met à jour la description
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

      {/* Liste des tâches */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between border-b py-4 last:border-none"
            >
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
                <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
