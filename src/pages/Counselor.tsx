import { FaUsers, FaUserPlus, FaTasks, FaList } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom';

const Counselor = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Available Counselors Card */}
        <Link to='/dashboard/allcounselor'>
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 cursor-pointer flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">Available Counselors</h2>
                <p className="mt-1 text-blue-200 text-sm">View all counselors</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-blue-200">→</span>
          </div>
        </Link>

        {/* Create New Counselor Card */}
        <Link to='/dashboard/counselorform'>
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 cursor-pointer flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaUserPlus className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">Create New Counselor</h2>
                <p className="mt-1 text-green-200 text-sm">Add a new counselor</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-green-200">+</span>
          </div>
        </Link>

        {/* Assign a Task Card */}
        <Link to='/dashboard/assigntask_counselor'>
          <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-500 cursor-pointer flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaTasks className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">Assign a Task</h2>
                <p className="mt-1 text-yellow-200 text-sm">Assign tasks to counselors</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-yellow-200">→</span>
          </div>
        </Link>

        {/* All Tasks Card */}
        <Link to='/dashboard/alltasks_counselor'>
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg hover:bg-purple-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 cursor-pointer flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaList className="text-4xl md:text-5xl" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">All Tasks</h2>
                <p className="mt-1 text-purple-200 text-sm">View all tasks</p>
              </div>
            </div>
            <span className="hidden lg:inline text-3xl md:text-4xl text-purple-200">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Counselor;
