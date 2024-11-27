'use client'; // Ajout pour activer les hooks côté client
import axiosClient from "../utils/axiosClient";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]); // Liste de tâches
  const [searchQuery, setSearchQuery] = useState(''); // Recherche
  const [filteredTasks, setFilteredTasks] = useState([]); // Tâches filtrées

  // Fonction pour récupérer les tâches
  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get('/tasks'); // Endpoint du backend
      setTasks(response.data); // Assurez-vous que response.data est bien un tableau
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Charger les tâches au montage
  useEffect(() => {
    fetchTasks();
  }, []); // On charge les tâches une seule fois au montage

  // Filtrer les tâches à chaque changement de la recherche ou des tâches
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredTasks(tasks); // Si la recherche est vide, on montre toutes les tâches
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [searchQuery, tasks]); // On filtre chaque fois que searchQuery ou tasks changent

  return (
    <>
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <button className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6h4m-6 4h8m-7 4h6m-9 4h12"
            />
          </svg>
          <span>Filter</span>
        </button>
      </div>

      <div className="min-h-screen bg-gray-100 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Task Dashboard</h1>
          <Link href="/ajout">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
              Add New Task
            </button>
          </Link>
        </header>

        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Liste des tâches avec vérification */}
          {filteredTasks.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600 text-lg font-bold">No Task Found</p>
              <p className="text-gray-400">
                You have not created any task, try adding one using the Add New Task button above.
              </p>
            </div>
          ) : (
            <ul>
              {filteredTasks.map((task) => (
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
          )}
        </div>
      </div>
    </>
  );
}
