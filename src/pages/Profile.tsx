import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userSix from '../images/user/user-06.png';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const api_url = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [admindata, setData] = useState<any>(null);

  const handleEmailClick = () => {
    if (admindata?.email) {
      window.location.href = `mailto:${admindata.email}`;
    }
  };

  const handlePhoneClick = () => {
    if (admindata?.contactNumber) {
      window.location.href = `tel:${admindata.contactNumber}`;
    }
  };

  const handleAddressClick = () => {
    if (admindata?.address) {
      window.open(`https://www.google.com/maps?q=${admindata.address}`, '_blank');
    }
  };

  const adminId = Cookies.get('admin');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${api_url}/api/admin/get/${adminId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          console.error('Failed to fetch admin data');
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    if (adminId) {
      fetchAdminData();
    }
  }, [adminId]);

  return (
    <>
      <Breadcrumb pageName="Profile" />

      {admindata ? (
        <div className="rounded-3xl border border-gray-300 bg-gray-900 shadow-lg">
          <div className="px-6 pb-8 text-center">
            <div className="relative mx-auto -mt-16 h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full border-4 border-gray-700 p-2">
              <div className="relative drop-shadow-lg">
                <img src={userSix} alt="profile" className="rounded-full" />
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300"
                >
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <div className="mt-4 md:mt-6">
              <h3 className="mb-1 sm:mb-2 text-2xl sm:text-3xl font-bold text-gray-200">
                {admindata.name}
              </h3>
              <p className="text-md sm:text-lg font-medium text-gray-400">
                Admin
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {admindata && (
        <div className="mt-8 p-4 sm:p-6 md:p-8 bg-gray-800 rounded-3xl shadow-lg border border-gray-700">
          <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-200">
            Admin Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md sm:text-lg animate-fadeIn">
            {[
              { label: 'Full Name', value: admindata.name, icon: <FaUser /> },
              { label: 'Email', value: admindata.email, icon: <FaEnvelope />, onClick: handleEmailClick },
              { label: 'Phone', value: admindata.contactNumber, icon: <FaPhone />, onClick: handlePhoneClick },
              { label: 'Department', value: 'Design', icon: <FaBuilding /> },
              { label: 'Hire Date', value: 'January 1, 2020', icon: <FaCalendarAlt /> },
              { label: 'Address', value: 'New Delhi', icon: <FaMapMarkerAlt />, onClick: handleAddressClick },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 sm:p-4 rounded-md bg-gray-700 border border-gray-600 hover:bg-gray-600 transition duration-300 cursor-pointer"
                onClick={item.onClick}
              >
                <span className="mr-3 sm:mr-4 text-gray-400 text-lg sm:text-xl">{item.icon}</span>
                <span className="font-medium text-gray-300 mr-auto">
                  {item.label}:
                </span>
                <span className="text-gray-100">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
