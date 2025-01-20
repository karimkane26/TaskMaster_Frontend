/* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client'; // Activer les hooks côté client
// import axiosClient from "../utils/axiosClient";
// import { useState, useEffect } from "react";
// import Link from "next/link";

// // Définir le type pour les tâches
// type Task = {
//   id: string; // ou number selon votre backend
//   title: string;
//   description: string;
//   dueDate?: string; // `dueDate` est optionnel
// };

// export default function Dashboard() {
//   const [tasks, setTasks] = useState<Task[]>([]); // Liste de tâches
//   const [searchQuery, setSearchQuery] = useState(''); // Recherche
//   const [filteredTasks, setFilteredTasks] = useState<Task[]>([]); // Tâches filtrées

//   // Fonction pour récupérer les tâches
//   const fetchTasks = async () => {
//     try {
//       const response = await axiosClient.get('/tasks'); // Endpoint du backend
//       if (Array.isArray(response.data)) {
//         setTasks(response.data); // On suppose que le backend renvoie des tâches correctement typées
//       } else {
//         console.error('Invalid response format:', response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   // Charger les tâches au montage
//   useEffect(() => {
//     fetchTasks();
//   }, []); // On charge les tâches une seule fois au montage

//   // Filtrer les tâches à chaque changement de la recherche ou des tâches
//   useEffect(() => {
//     if (searchQuery === '') {
//       setFilteredTasks(tasks); // Si la recherche est vide, on montre toutes les tâches
//     } else {
//       const filtered = tasks.filter((task) =>
//         task.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredTasks(filtered);
//     }
//   }, [searchQuery, tasks]); // On filtre chaque fois que searchQuery ou tasks changent

//   return (
//     <>
//       <div className="flex items-center space-x-4 mb-6">
//         <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-full">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full focus:outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-5 h-5 text-gray-400"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </button>
//         </div>
//         <button className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-5 h-5"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M10 6h4m-6 4h8m-7 4h6m-9 4h12"
//             />
//           </svg>
//           <span>Filter</span>
//         </button>
//       </div>

//       <div className="min-h-screen bg-gray-100 p-6">
//         <header className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Task Dashboard</h1>
//           <Link href="/ajout">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600">
//               Add New Task
//             </button>
//           </Link>
//         </header>

//         <div className="bg-white shadow-lg rounded-lg p-6">
//           {/* Liste des tâches avec vérification */}
//           {filteredTasks.length === 0 ? (
//             <div className="text-center">
//               <p className="text-gray-600 text-lg font-bold">No Task Found</p>
//               <p className="text-gray-400">
//                 You have not created any task, try adding one using the Add New Task button above.
//               </p>
//             </div>
//           ) : (
//             <ul>
//               {filteredTasks.map((task) => (
//                 <li
//                   key={task.id}
//                   className="flex items-center justify-between border-b py-4 last:border-none"
//                 >
//                   <div className="flex flex-col space-y-2">
//                     <div className="flex items-center space-x-4">
//                       <input
//                         type="checkbox"
//                         className="h-5 w-5 text-blue-500 border-gray-300 rounded"
//                       />
//                       <h2 className="text-lg font-medium">{task.title}</h2>
//                     </div>
//                     <p className="text-gray-700">{task.description}</p>
//                     {task.dueDate && (
//                       <p className="text-gray-500 text-sm">
//                         Due Date: {new Date(task.dueDate).toLocaleDateString()}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex space-x-2">
//                     <Link href="suppression">
//                       <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600">
//                         Delete
//                       </button>
//                     </Link>
//                     <Link href={`/modification/${task.id}`}>
//                       <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600">
//                         Edit
//                       </button>
//                     </Link>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

'use client'; // Activer les hooks côté client
import axiosClient from "../utils/axiosClient";
import { useState, useEffect } from "react";
import Link from "next/link";

type Task = {
  id: string; // ou number selon votre backend
  title: string;
  description: string;
  dueDate?: string;
  progress: number; // `dueDate` est optionnel
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les tâches depuis le backend
  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get('/tasks');
      if (Array.isArray(response.data)) {
        setTasks(response.data);
        setError(null); // Réinitialiser les erreurs
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError('Failed to fetch tasks. Please try again.');
    }
  };

  // Mettre à jour la progression d'une tâche
  const updateTaskProgress = async (id: string, progress: number) => {
    try {
      const response = await axiosClient.patch(`/tasks/${id}`, { progress });
      const updatedTask = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError('Failed to update task progress.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [searchQuery, tasks]);

  const calculateRemainingDays = (dueDate?: string) => {
    if (!dueDate) return null;
    const today = new Date();
    const deadline = new Date(dueDate);
    const difference = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return difference > 0 ? `${difference} days left` : `Overdue`;
  };

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

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white shadow-lg rounded-lg p-6">
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
                  className="flex flex-col border-b py-4 last:border-none space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-medium">{task.title}</h2>
                      <p className="text-gray-700">{task.description}</p>
                      {task.dueDate && (
                        <p className="text-gray-500 text-sm">
                          Due Date: {new Date(task.dueDate).toLocaleDateString()} (
                          {calculateRemainingDays(task.dueDate)})
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 w-40">
                      <p className="text-sm font-medium text-gray-600">Progress:</p>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={task.progress}
                        className="w-full"
                        onChange={(e) =>
                          updateTaskProgress(task.id, Number(e.target.value))
                        }
                      />
                      <p className="text-sm text-gray-500">{task.progress}% completed</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link href="suppression">
                      <button
                        className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                        title="Delete this task"
                      >
                        Delete
                      </button>
                    </Link>
                    <Link href={`/modification/${task.id}`}>
                      <button
                        className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                        title="Edit this task"
                      >
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
