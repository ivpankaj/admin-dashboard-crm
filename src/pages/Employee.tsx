import { FaUsers, FaUserPlus, FaTasks, FaList } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom';

const Employee = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to='/dashboard/allemployee'>
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-4xl" />
              <div>
                <h2 className="text-xl font-bold">Available Employees</h2>
                <p className="mt-1 text-blue-200">View all employees</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl text-blue-200">→</span>
          </div>
        </Link>

        <Link to='/dashboard/employeeform'>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaUserPlus className="text-4xl" />
              <div>
                <h2 className="text-xl font-bold">Create New Employee</h2>
                <p className="mt-1 text-green-200">Add a new employee</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl text-green-200">+</span>
          </div>
        </Link>
        
        <Link to='/dashboard/assigntask_employee'>
          <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaTasks className="text-4xl" />
              <div>
                <h2 className="text-xl font-bold">Assign a Task</h2>
                <p className="mt-1 text-yellow-200">Assign tasks to counselors</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl text-yellow-200">→</span>
          </div>
        </Link>
        
        <Link to='/dashboard/alltasks_employee'>
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaList className="text-4xl" />
              <div>
                <h2 className="text-xl font-bold">All Tasks</h2>
                <p className="mt-1 text-purple-200">View all tasks</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl text-purple-200">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Employee;
