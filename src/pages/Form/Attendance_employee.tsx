import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface Employee {
  email: string;
}

interface AttendanceStatus {
  [email: string]: string;
}

const Attendance_employee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState<AttendanceStatus>({});
  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // Hook to navigate to previous page

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${api_url}/api/employee/getAll`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmployees(data);
        // Initialize statuses with default value for each employee
        const initialStatuses: AttendanceStatus = {};
        data.forEach((employee: Employee) => {
          initialStatuses[employee.email] = 'Present';
        });
        setStatuses(initialStatuses);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleStatusChange = (email: string, status: string) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [email]: status,
    }));
  };

  const getCurrentDate = (): string => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const markAttendance = async (email: string) => {
    const status = statuses[email]; // Get the selected status for this employee
    const currentDate = getCurrentDate(); // Get the current date

    try {
      const response = await fetch(`${api_url}/api/attendance/employee/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: currentDate,
          status,
          email,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Attendance marked successfully!');
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      
      <h1 className="text-2xl font-bold mb-6 text-center">Employee Attendance</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200 divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700">Email</th>
              <th className="py-3 px-4 text-left text-gray-700">Status</th>
              <th className="py-3 px-4 text-left text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.email} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{employee.email}</td>
                <td className="py-3 px-4">
                  <select
                    value={statuses[employee.email]}
                    onChange={(e) => handleStatusChange(employee.email, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Half Day">Half Day</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => markAttendance(employee.email)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Mark Attendance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance_employee;
