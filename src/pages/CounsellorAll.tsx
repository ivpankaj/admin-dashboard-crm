import { useEffect, useState } from "react";
import { FaUserTie, FaEnvelope, FaPhone, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;

type Counselor = {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  jobTitle: string;
  department: string;
  hireDate: string;
  salary: number;
  address: string;
  isActive: boolean;
  attendanceCount: number;
  qualifications: string | null;
  yearsOfExperience: number | null;
  specialty: string | null;
  counselingSessionsConducted: number;
  feedbackRating: number | null;
};

type ProfilePics = {
  [key: number]: string; // Store profile picture URLs by counselor ID
};

const CounselorAll = () => {
  const [alldata, setData] = useState<Counselor[]>([]);
  const [profilePics, setProfilePics] = useState<ProfilePics>({});
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api_url}/api/counselor/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: Counselor[] = await response.json();
        console.log(data);
        setData(shuffleArray(data));
        fetchProfilePictures(data); // Fetch profile pictures after counselor data is loaded
      }
      setLoading(false); // Stop loading when data is fetched
    };

    fetchData();
  }, []);

  // Fetch profile pictures for all counselors
  const fetchProfilePictures = async (counselors: Counselor[]) => {
    const newProfilePics: ProfilePics = {};

    for (const counselor of counselors) {
      const response = await fetch(`http://localhost:5000/employee/get/profilepic/${counselor.id}`);
      if (response.ok) {
        const { profilePicture } = await response.json();
        newProfilePics[counselor.id] = profilePicture;
      }
    }

    setProfilePics(newProfilePics); // Update state with fetched profile pictures
  };

  const shuffleArray = (array: Counselor[]): Counselor[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)} // Navigates to the previous page
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
      >
        <IoMdArrowRoundBack className="mr-2" /> Back
      </button>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : alldata.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {alldata.map((counselor) => (
            <div
              key={counselor.id}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                {/* Display profile picture */}
                {profilePics[counselor.id] ? (
                  <img
                    src={profilePics[counselor.id]}
                    alt={`${counselor.name}'s profile`}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                ) : (
                  <FaUserTie className="text-5xl mr-4" />
                )}
                <div>
                  <h3 className="text-2xl font-bold">{counselor.name}</h3>
                  <p className="text-sm">
                    {counselor.jobTitle} - {counselor.department}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-base">
                <p className="flex items-center">
                  <FaEnvelope className="mr-2" /> {counselor.email}
                </p>
                <p className="flex items-center">
                  <FaPhone className="mr-2" /> {counselor.contactNumber}
                </p>
                <p className="flex items-center">
                  <FaDollarSign className="mr-2" /> Salary: ₹{counselor.salary.toLocaleString()}
                </p>
                <p className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> {counselor.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No counselors found.</p>
      )}
    </div>
  );
};

export default CounselorAll;
