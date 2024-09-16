import { FaUsers, FaUserPlus, FaTasks, FaList } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom';

const Sales = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Link to='/dashboard/allsales_person'>
          <div className="bg-blue-600 text-white p-6 md:p-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-2xl font-bold">Available Sales Persons</h2>
                <p className="mt-1 text-blue-200 text-sm md:text-base">View all sales persons</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl md:text-4xl text-blue-200">→</span>
          </div> 
        </Link>
        <Link to='/dashboard/sales_personForm'>
          <div className="bg-green-600 text-white p-6 md:p-8 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaUserPlus className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-2xl font-bold">Create New Sales Person</h2>
                <p className="mt-1 text-green-200 text-sm md:text-base">Add a new sales person</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl md:text-4xl text-green-200">+</span>
          </div>
        </Link>
        <Link to='/dashboard/assigntask_sales_person'>
          <div className="bg-yellow-600 text-white p-6 md:p-8 rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaTasks className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">Assign a Task</h2>
                <p className="mt-1 text-yellow-200 text-sm md:text-base">Assign tasks to sales persons</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-yellow-200">→</span>
          </div>
        </Link>
        <Link to='/dashboard/alltasks_sales_person'>
          <div className="bg-purple-600 text-white p-6 md:p-8 rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 flex items-center justify-between transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 cursor-pointer">
            <div className="flex items-center space-x-4">
              <FaList className="text-3xl md:text-4xl" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">All Tasks</h2>
                <p className="mt-1 text-purple-200 text-sm md:text-base">View all tasks</p>
              </div>
            </div>
            <span className="hidden md:inline text-3xl md:text-4xl text-purple-200">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sales;
