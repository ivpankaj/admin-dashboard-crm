import { useEffect, useState } from "react";
import { FaUserTie, FaEnvelope } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;

interface SalesPerson {
  sales_personId: number;
  name: string;
  email: string;
}

const SalesPersonAll = () => {
  const [alldata, setData] = useState<SalesPerson[]>([]);
  const [profilePics, setProfilePics] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/api/sales_person/getall`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data: SalesPerson[] = await response.json();
          setData(shuffleArray(data));
          fetchProfilePictures(data);
        } else {
          console.error("Failed to fetch sales persons data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchProfilePictures = async (salesPersons: SalesPerson[]) => {
    try {
      const profilePicPromises = salesPersons.map(async (salesPerson) => {
        const response = await fetch(
          `${api_url}/api/sales_person/get/profilepic/${salesPerson.sales_personId}`
        );
        if (response.ok) {
          const { profilePicture } = await response.json();
          return {
            id: salesPerson.sales_personId,
            profilePicture: `http://localhost:5000${profilePicture}`,
          };
        } else {
          console.error(
            `Failed to fetch profile picture for sales person ${salesPerson.sales_personId}`
          );
          return { id: salesPerson.sales_personId, profilePicture: "" }; // Default empty string for missing profile pic
        }
      });

      const results = await Promise.all(profilePicPromises);
      const newProfilePics = results.reduce((acc, { id, profilePicture }) => {
        acc[id] = profilePicture;
        return acc;
      }, {} as { [key: number]: string });

      setProfilePics(newProfilePics); // Update state with fetched profile pictures
    } catch (error) {
      console.error("Error fetching profile pictures:", error);
    }
  };

  const shuffleArray = (array: SalesPerson[]): SalesPerson[] => {
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
          alldata.map((salesPerson) => (
            <div
              key={salesPerson.sales_personId}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {profilePics[salesPerson.sales_personId] ? (
                  <img
                    src={profilePics[salesPerson.sales_personId]}
                    alt={`${salesPerson.name}'s profile`}
                    className="w-16 h-16 rounded-full mr-3"
                  />
                ) : (
                  <FaUserTie className="text-3xl mr-3" />
                )}
                <h2 className="text-2xl font-bold">{salesPerson.name}</h2>
              </div>

              <p className="text-white mb-2 flex items-center">
                <FaEnvelope className="mr-2" /> {salesPerson.email}
              </p>
              <button
                onClick={() => navigate(`/dashboard/salesprofile/${salesPerson. sales_personId}`)}
               className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
                View All Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SalesPersonAll;
