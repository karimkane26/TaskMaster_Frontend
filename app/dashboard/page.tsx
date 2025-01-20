/* eslint-disable @typescript-eslint/no-explicit-any */
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

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  progress: number;
  status: "To Do" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  assignee?: string;
  comments?: { user: string; message: string; timestamp: string }[];
  history?: { action: string; timestamp: string; user: string }[];
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
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

  useEffect(() => {
    fetchTasks();
  }, []);

  // Mise à jour du statut de la tâche
  const updateTaskStatus = async (id: string, newStatus: "To Do" | "In Progress" | "Done") => {
    try {
      const response = await axiosClient.patch(`/tasks/${id}`, { status: newStatus });
      const updatedTask = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  // Catégoriser les tâches par statut
  const categorizedTasks = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Done: tasks.filter((task) => task.status === "Done"),
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-3 gap-4">
        {Object.keys(categorizedTasks).map((status) => (
          <div key={status} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">{status}</h2>
            <ul>
              {categorizedTasks[status as keyof typeof categorizedTasks].map((task) => (
                <li key={task.id} className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <p className="text-sm">
                    <strong>Priority:</strong> {task.priority}
                  </p>
                  <p className="text-sm">
                    <strong>Assignee:</strong> {task.assignee || "Unassigned"}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    {["To Do", "In Progress", "Done"]
                      .filter((s) => s !== task.status)
                      .map((newStatus) => (
                        <button
                          key={newStatus}
                          onClick={() => updateTaskStatus(task.id, newStatus as any)}
                          className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Move to {newStatus}
                        </button>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
