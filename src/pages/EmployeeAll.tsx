import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaEnvelope, FaPhone, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
const api_url = import.meta.env.VITE_API_URL;
interface Employee {
  id: number;
  name: string;
  jobTitle: string;
  department: string;
  email: string;
  contactNumber: string;
  salary: number;
  address: string;
}

const EmployeeAll = () => {
  const [alldata, setData] = useState<Employee[]>([]);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api_url}/api/employee/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: Employee[] = await response.json();
        setData(shuffleArray(data));
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array: Employee[]): Employee[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)} // Navigates to the previous page
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
      <IoMdArrowRoundBack/>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {alldata.length > 0 ? (
          alldata.map((employee) => (
            <div
              key={employee.id}
              className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <FaUserTie className="text-2xl mr-2" />
                <h2 className="text-xl font-bold">{employee.name}</h2>
              </div>
              <p className="text-gray-200 mb-2 flex items-center">
                <FaUserTie className="mr-2" /> {employee.jobTitle} - {employee.department}
              </p>
              <p className="text-gray-200 mb-2 flex items-center">
                <FaEnvelope className="mr-2" /> {employee.email}
              </p>
              <p className="text-gray-200 mb-2 flex items-center">
                <FaPhone className="mr-2" /> {employee.contactNumber}
              </p>
              <p className="text-gray-200 mb-2 flex items-center">
                <FaDollarSign className="mr-2" /> Salary: ₹{employee.salary}
              </p>
              <p className="text-gray-200 text-sm flex items-center mt-4">
                <FaMapMarkerAlt className="mr-2" /> {employee.address}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeAll;
