import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaEnvelope, FaPhone, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
const api_url = import.meta.env.VITE_API_URL;

interface Employee {
  employeeId: number;
  name: string;
  jobTitle: string;
  department: string;
  email: string;
  contactNumber: string;
  salary: number;
  address: string;
}

interface ProfilePics {
  [key: number]: string; // Stores profile picture URLs by employee ID
}

const EmployeeAll = () => {
  const [alldata, setData] = useState<Employee[]>([]);
  const [profilePics, setProfilePics] = useState<ProfilePics>({});
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

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
        fetchProfilePictures(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Fetch profile pictures for all employees
  const fetchProfilePictures = async (employees: Employee[]) => {
    const newProfilePics: ProfilePics = {};

    for (const employee of employees) {
      const response = await fetch(`${api_url}/api/employee/get/profilepic/${employee.employeeId}`);
      if (response.ok) {
        const { profilePicture } = await response.json();
        newProfilePics[employee.employeeId] = `http://localhost:5000${profilePicture}`;
      }
    }

    setProfilePics(newProfilePics);
  };

  const shuffleArray = (array: Employee[]): Employee[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  const toggleDetails = (employeeId: number) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [employeeId]: !prevState[employeeId],
    }));
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-300 shadow-md"
      >
        <IoMdArrowRoundBack />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : alldata.length > 0 ? (
          alldata.map((employee) => (
            <div
              key={employee.employeeId}
              className="bg-white text-gray-800 shadow-xl rounded-xl p-6 hover:shadow-2xl transform transition-all duration-300"
            >
              <div className="flex flex-col items-center mb-4">
                {/* Display profile picture if available, else show default icon */}
                {profilePics[employee.employeeId] ? (
                  <img
                    src={profilePics[employee.employeeId]}
                    alt={`${employee.name}'s profile`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 shadow-lg mb-4"
                  />
                ) : (
                  <FaUserTie className="text-4xl text-gray-600 mb-4" />
                )}
                <h2 className="text-xl font-semibold">{employee.name}</h2>
                <p className="text-gray-600 flex items-center mt-2">
                  <FaEnvelope className="mr-2 text-gray-500" /> {employee.email}
                </p>
              </div>

              {/* Button to toggle details */}
              <button
                onClick={() => toggleDetails(employee.employeeId)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                {showDetails[employee.employeeId] ? "Hide Details" : "View All Details"}
              </button>

              {/* Details section - visible only when "View All Details" is clicked */}
              {showDetails[employee.employeeId] && (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-600 flex items-center">
                    <FaUserTie className="mr-2 text-gray-500" /> 
                    {employee.jobTitle} - {employee.department}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaPhone className="mr-2 text-gray-500" /> {employee.contactNumber}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaDollarSign className="mr-2 text-gray-500" /> Salary: ₹{employee.salary}
                  </p>
                  <p className="text-gray-600 flex items-center mt-2">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" /> {employee.address}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeAll;
