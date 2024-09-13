import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [attendance, setAttendance] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Get current date
  const currentDate = new Date().toLocaleDateString();

  const handleAttendanceChange = (userId: string, status: string) => {
    setAttendance(prev => ({ ...prev, [userId]: status }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Filter users based on search term
  const filteredUsers = [...Array(5)].filter((_, index) =>
    `User ${index + 1}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">User {id}</h1>
      <p className="mb-6 text-center text-gray-600">Date: {currentDate}</p>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <FaSearch className="absolute top-3 left-3 w-5 h-5 text-gray-500" />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute top-3 right-3 w-5 h-5 text-gray-500"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        )}
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Fake User List</h2>
      <ul className="space-y-4">
        {filteredUsers.map((_, index) => (
          <li key={index} className="bg-black p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
            <span className="text-gray-700 mb-2 sm:mb-0">User {index + 1}</span>
            <div className="space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row">
              <button
                onClick={() => handleAttendanceChange(`user${index + 1}`, 'Present')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Present
              </button>
              <button
                onClick={() => handleAttendanceChange(`user${index + 1}`, 'Absent')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Absent
              </button>
              <button
                onClick={() => handleAttendanceChange(`user${index + 1}`, 'Half Day')}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Half Day
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Attendance Status</h2>
        <ul className="space-y-2">
          {Object.entries(attendance).map(([userId, status]) => (
            <li key={userId} className="bg-black p-4 rounded-lg shadow-md text-gray-700">
              {userId}: <span className="font-semibold">{status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
