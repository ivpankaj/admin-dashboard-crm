import { useState } from "react";
import { FaPlus, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const MSales = () => {
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "" });

  const handleAddLead = () => {
    if (newLead.name && newLead.email && newLead.phone) {
      setLeads([...leads, newLead]);
      setNewLead({ name: "", email: "", phone: "" });
    }
  };

  const handleDeleteLead = (index: number) => {
    const updatedLeads = leads.filter((_, i) => i !== index);
    setLeads(updatedLeads);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold text-gray-700">CRM - Manage Leads</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
          onClick={() => document.getElementById("create-lead")?.scrollIntoView()}
        >
          <FaPlus className="mr-2" /> Create New Lead
        </button>
      </div>

      {/* Create Lead Section */}
      <div
        id="create-lead"
        className="bg-white shadow-md rounded-lg p-5 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Create a New Lead</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Lead Name"
            className="p-2 border border-gray-300 rounded-md"
            value={newLead.name}
            onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Lead Email"
            className="p-2 border border-gray-300 rounded-md"
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Lead Phone"
            className="p-2 border border-gray-300 rounded-md"
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
          />
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={handleAddLead}
        >
          Add Lead
        </button>
      </div>

      {/* Leads List Section */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-4">All Leads</h2>
        {leads.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{lead.name}</td>
                  <td className="py-2 px-4 border-b">{lead.email}</td>
                  <td className="py-2 px-4 border-b">{lead.phone}</td>
                  <td className="py-2 px-4 border-b flex justify-center space-x-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEye />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700">
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteLead(index)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No leads available. Start by adding some!</p>
        )}
      </div>
    </div>
  );
};

export default MSales;
