import { FaClipboardCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Attendance = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-8">Mark Attendance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employee */}
        <Link to='/dashboard/attendance_employee'>
          <div className="bg-gray-100 border-2 border-purple-500 p-6 rounded-3xl shadow-lg hover:shadow-xl transform transition duration-300 cursor-pointer">
            <h3 className="text-2xl font-semibold mb-4">Employee</h3>
            <p>Mark attendance for employees.</p>
            <button className="flex items-center justify-center mt-4 bg-white text-gray-800 font-semibold py-2 px-4 rounded-3xl border-2 border-purple-500 hover:bg-gray-200 transition duration-300">
              <FaClipboardCheck className="mr-2 text-purple-500" />
              Mark Attendance
            </button>
          </div>
        </Link>

        {/* Counselor */}
        <Link to='/dashboard/attendance_counselor'>
          <div className="bg-gray-100 border-2 border-green-500  p-6 rounded-3xl shadow-lg hover:shadow-xl transform transition duration-300 cursor-pointer">
            <h3 className="text-2xl font-semibold mb-4">Counselor</h3>
            <p>Mark attendance for counselors.</p>
            <button className="flex items-center justify-center mt-4 bg-white text-gray-800 font-semibold py-2 px-4 rounded-3xl border-2 border-green-500 hover:bg-gray-200 transition duration-300">
              <FaClipboardCheck className="mr-2 text-green-500" />
              Mark Attendance
            </button>
          </div>
        </Link>

        {/* Sales Person */}
        <Link to='/dashboard/attendance_sales_person'>
          <div className="bg-gray-100 border-2 border-yellow-500  p-6 rounded-3xl shadow-lg hover:shadow-xl transform transition duration-300 cursor-pointer">
            <h3 className="text-2xl font-semibold mb-4">Sales Person</h3>
            <p>Mark attendance for salespersons.</p>
            <button className="flex items-center justify-center mt-4 bg-white text-gray-800 font-semibold py-2 px-4 rounded-3xl border-2 border-yellow-500 hover:bg-gray-200 transition duration-300">
              <FaClipboardCheck className="mr-2 text-yellow-500" />
              Mark Attendance
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Attendance;
