import { useEffect, useState } from "react";
import { FaUserTie, FaEnvelope } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;

type Counselor = {
  counselorId: number;
  name: string;
  email: string;
  // Removed other fields for simplicity
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
      try {
        const response = await fetch(`${api_url}/api/counselor/getAll`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data: Counselor[] = await response.json();
          setData(data); // Set data without shuffling
          await fetchProfilePictures(data); // Fetch profile pictures after counselor data is loaded
        } else {
          console.error('Failed to fetch counselor data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched or error occurs
      }
    };

    fetchData();
  }, []);

  // Fetch profile pictures for all counselors
  const fetchProfilePictures = async (counselors: Counselor[]) => {
    try {
      const profilePicPromises = counselors.map(async (counselor) => {
        const response = await fetch(`${api_url}/api/counselor/get/profilepic/${counselor.counselorId}`);
        if (response.ok) {
          const { profilePicture } = await response.json();
          return { counselorId: counselor.counselorId, profilePicture: `http://localhost:5000${profilePicture}` };
        } else {
          console.error(`Failed to fetch profile picture for counselor ${counselor.counselorId}`);
          return { counselorId: counselor.counselorId, profilePicture: '' }; // Default empty string for missing profile pic
        }
      });

      const results = await Promise.all(profilePicPromises);
      const newProfilePics: ProfilePics = results.reduce((acc, { counselorId, profilePicture }) => {
        acc[counselorId] = profilePicture;
        return acc;
      }, {} as ProfilePics);

      setProfilePics(newProfilePics); // Update state with fetched profile pictures
    } catch (error) {
      console.error('Error fetching profile pictures:', error);
    }
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
              key={counselor.counselorId}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center mb-4">
                {/* Display profile picture */}
                {profilePics[counselor.counselorId] ? (
                  <img
                    src={profilePics[counselor.counselorId]}
                    alt={`${counselor.name}'s profile`}
                    className="w-16 h-16 rounded-full object-cover mb-4"
                  />
                ) : (
                  <FaUserTie className="text-5xl mb-4" />
                )}
                <h3 className="text-2xl font-bold mb-2">{counselor.name}</h3>
                <p className="text-sm mb-4">{counselor.email}</p>
                <button
                  onClick={() => navigate(`/dashboard/counselorprofile/${counselor.counselorId}`)} // Navigate to detail page
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  View All Details
                </button>
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
