import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  taskName: string;
  description: string;
  priority: string;
  dueDate: string;
  sales_personId: string;
}

const TaskallSalesPerson: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const api_url = import.meta.env.VITE_API_URL; // Ensure this is set correctly

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${api_url}/api/tasks/sales_person/getall`, {
          method: 'GET', // Use GET to fetch data
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [api_url]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Salesperson Tasks</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200 divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700">Task Name</th>
              <th className="py-3 px-4 text-left text-gray-700">Description</th>
              <th className="py-3 px-4 text-left text-gray-700">Priority</th>
              <th className="py-3 px-4 text-left text-gray-700">Due Date</th>
              <th className="py-3 px-4 text-left text-gray-700">SalesID</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{task.taskName}</td>
                <td className="py-3 px-4 text-gray-700">{task.description}</td>
                <td className="py-3 px-4 text-gray-700">{task.priority}</td>
                <td className="py-3 px-4 text-gray-700">{task.dueDate}</td>
                <td className="py-3 px-4 text-gray-700">{task.sales_personId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskallSalesPerson;
