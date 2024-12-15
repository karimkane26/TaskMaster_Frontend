// 'use client'; // Indique que c'est un composant client

// import React, { useState, useEffect } from 'react';
// import axiosClient from '../utils/axiosClient';

// const Page = () => {
//   const [tasks, setTasks] = useState([]); // État pour stocker la liste des tâches

//   // Fonction pour récupérer les tâches
//   const fetchTasks = async () => {
//     try {
//       const response = await axiosClient.get('/tasks');
//       setTasks(response.data); // Assurez-vous que response.data est un tableau
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   // Fonction pour supprimer une tâche
//   const deleteTask = async (id: string) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this task?");
//     if (!confirmDelete) return;

//     try {
//       await axiosClient.delete(`/tasks/${id}`);
//       setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Mettre à jour la liste localement
//       console.log(`Task with ID ${id} deleted`);
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   // Charger les tâches lors du montage du composant
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
//       {tasks.length === 0 ? (
//         <p className="text-gray-500 text-center">No tasks available</p>
//       ) : (
//         <ul>
//           {tasks.map((task) => (
//             <li key={task.id} className="flex items-center justify-between border-b py-4 last:border-none">
//               <div className="flex items-center space-x-4">
//                 <input
//                   type="checkbox"
//                   className="h-5 w-5 text-blue-500 border-gray-300 rounded"
//                 />
//                 <div>
//                   <h2 className="text-lg font-medium">{task.title}</h2>
//                   <p className="text-gray-500 text-sm">
//                     Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
//                   onClick={() => deleteTask(task.id)} // Passe l'ID correct
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Page;
 

'use client'; // Indique que c'est un composant client

import React, { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

interface Task {
  id: string;
  title: string;
  dueDate?: string; // Date d'échéance optionnelle
}

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // État pour stocker la liste des tâches

  // Fonction pour récupérer les tâches
  const fetchTasks = async () => {
    try {
      const response = await axiosClient.get('/tasks');
      setTasks(response.data); // Assurez-vous que response.data est un tableau
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fonction pour supprimer une tâche
  const deleteTask = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Mettre à jour la liste localement
      console.log(`Task with ID ${id} deleted`);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Charger les tâches lors du montage du composant
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task: Task) => (
            <li key={task.id} className="flex items-center justify-between border-b py-4 last:border-none">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-500 border-gray-300 rounded"
                />
                <div>
                  <h2 className="text-lg font-medium">{task.title}</h2>
                  <p className="text-gray-500 text-sm">
                    Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600"
                >
                  Edit
                </button>

                <button
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                  onClick={() => deleteTask(task.id)} // Passe l'ID correct
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
