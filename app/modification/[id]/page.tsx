'use client'; // Active les hooks React côté client
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosClient from "../../utils/axiosClient";

const EditTaskPage = () => {
  const params = useParams(); // useParams retourne une promesse
  const [id, setId] = useState<string | null>(null); // État pour stocker l'ID après déballage
  const router = useRouter();

  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    isCompleted: false,
  });

  useEffect(() => {
    // Déballer la promesse params.id
    async function resolveParams() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }

    resolveParams();
  }, [params]);

  // Fonction pour récupérer les détails de la tâche
  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (id) {
        try {
          const response = await axiosClient.get(`/tasks/${id}`);
          setTask(response.data);
        } catch (error) {
          console.error("Error fetching task details:", error);
        }
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosClient.patch(`/tasks/${id}`, task);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Task</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={(e) => setTask({ ...task, isCompleted: e.target.checked })}
            className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-700">Mark as Completed</label>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskPage;
