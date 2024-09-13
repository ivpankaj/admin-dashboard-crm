import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the back icon
import { useNavigate } from 'react-router-dom'; // For navigating to the previous page

const api_url = import.meta.env.VITE_API_URL;

const Task_sales_person = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('upcoming');
  const [dueDate, setDueDate] = useState('');
  const [salesPersonId, setSalesPersonId] = useState('');
  const [salesPersons, setSalesPersons] = useState<{ id: string; name: string }[]>([]);

  const navigate = useNavigate(); // Initialize navigate for back navigation

  useEffect(() => {
    const fetchSalesPersons = async () => {
      try {
        const response = await fetch(`${api_url}/api/salespersons/getAll`);
        if (response.ok) {
          const data = await response.json();
          setSalesPersons(data);
        } else {
          console.error('Failed to fetch sales persons');
        }
      } catch (error) {
        console.error('Error fetching sales persons:', error);
      }
    };

    fetchSalesPersons();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      taskName,
      description,
      priority,
      dueDate,
      salesPersonId,
    };

    try {
      const response = await fetch(`${api_url}/api/task_salesperson/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        alert('Task created successfully!');
        // Reset form
        setTaskName('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        setSalesPersonId('');
      } else {
        alert('Error creating task.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating task.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Back button outside the form */}
      <div className="mb-4">
        <button
          className="text-blue-500 hover:text-blue-600 flex items-center"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          <FaArrowLeft className="text-2xl mr-2" />
          <span>Back</span>
        </button>
      </div>

      {/* Form section */}
      <h2 className="text-2xl font-bold mb-4">Create Sales Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="upcoming">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Sales Person</label>
          <select
            value={salesPersonId}
            onChange={(e) => setSalesPersonId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="" disabled>Select a sales person</option>
            {salesPersons.map((salesPerson) => (
              <option key={salesPerson.id} value={salesPerson.id}>
                {salesPerson.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default Task_sales_person;
