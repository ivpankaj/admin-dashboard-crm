
import { Link, useNavigate } from "react-router-dom";

const Meetings = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4 space-y-6">
      <h1 className="text-3xl font-bold ">Meetings</h1>

      {/* Create a Meeting Div */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-gray-800  rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">Create a Meeting</h2>
        <p className="text-sm text-gray-300">Click here to create a new meeting.</p>
        <Link to='/dashboard/createmeetings'>
          <button className="mt-4 px-4 py-2 bg-black text-gray-800 font-bold rounded-full hover:bg-gray-300 transition">
            Create Meeting
          </button>
        </Link>
      </div>

      {/* List of Meetings Div */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-gray-800  rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">List of Meetings</h2>
        <p className="text-sm text-gray-300">View your scheduled meetings here.</p>
        <Link to='/dashboard/getallmeetings'>
          <button className="mt-4 px-4 py-2 bg-black text-gray-800 font-bold rounded-full hover:bg-gray-300 transition">
            View Meetings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Meetings;
