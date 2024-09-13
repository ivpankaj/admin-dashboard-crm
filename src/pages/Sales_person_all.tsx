import { useEffect, useState } from "react";
import { FaUserTie, FaEnvelope, FaPhone, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;
interface sales_person {
  id: number;
  name: string;
  jobTitle: string;
  department: string;
  email: string;
  contactNumber: string;
  salary: number;
  address: string;
}

const Sales_personAll = () => {
  const [alldata, setData] = useState<sales_person[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api_url}/api/salespersons/getall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: sales_person[] = await response.json();
        setData(shuffleArray(data));
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array: sales_person[]): sales_person[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center space-x-2"
      >
        <IoMdArrowRoundBack className="text-lg" />
        <span>Go Back</span>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {alldata.length > 0 ? (
          alldata.map((sales_person) => (
            <div
              key={sales_person.id}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <FaUserTie className="text-3xl mr-3" />
                <h2 className="text-2xl font-bold">{sales_person.name}</h2>
              </div>

              <p className="text-white mb-2 flex items-center">
                <FaUserTie className="mr-2" /> {sales_person.jobTitle} - {sales_person.department}
              </p>
              <p className="text-white mb-2 flex items-center">
                <FaEnvelope className="mr-2" /> {sales_person.email}
              </p>
              <p className="text-white mb-2 flex items-center">
                <FaPhone className="mr-2" /> {sales_person.contactNumber}
              </p>
              <p className="text-white mb-2 flex items-center">
                <FaDollarSign className="mr-2" /> Salary: ₹{sales_person.salary.toLocaleString('en-IN')}
              </p>
              <p className="text-white flex items-center mt-4">
                <FaMapMarkerAlt className="mr-2" /> {sales_person.address}
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

export default Sales_personAll;
