import React, { useState, useEffect } from 'react';
import {
  FaUserTie,
  FaDollarSign,
  FaUsers,
  FaUserFriends,
  FaCalendar,
  FaCashRegister,
  FaClipboardList,
  FaChartLine,
  FaBell,
  FaChartBar,
} from 'react-icons/fa';
import MapOne from '../../components/Maps/MapOne';
import { Link } from 'react-router-dom';

const ECommerce: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const dayName = dayNames[now.getDay()];
      const timeString = now.toLocaleString();
      setCurrentTime(`${dayName}, ${timeString}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Date and Time Display */}
      <div className="dark:bg-black text-gray-100 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-lg text-center flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <FaCalendar className="text-xl sm:text-2xl md:text-3xl text-green-400" />
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-base md:text-lg font-medium">{currentTime}</p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 mt-6">
        {/* Card 1 - Total Counselors */}
        <Link to="/dashboard/allcounselor">
          <div className="dark:bg-black rounded-3xl shadow-md p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaUserTie className="text-3xl mb-4 mx-auto text-blue-400" />
            <h3 className="text-md font-semibold">Total Counselors</h3>
            <p className="text-xl font-bold">50</p>
          </div>
        </Link>

        {/* Card 2 - Total Products */}
        <Link to="/dashboard/allproducts">
          <div className="dark:bg-black rounded-3xl shadow-md p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaDollarSign className="text-3xl mb-4 mx-auto text-yellow-400" />
            <h3 className="text-md font-semibold">Total Products</h3>
            <p className="text-xl font-bold">05</p>
          </div>
        </Link>

        {/* Card 3 - Total Salespersons */}
        <Link to="/dashboard/allsales_person">
          <div className="dark:bg-black rounded-3xl shadow-md p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaUserFriends className="text-3xl mb-4 mx-auto text-purple-400" />
            <h3 className="text-md font-semibold">Total Salespersons</h3>
            <p className="text-xl font-bold">30</p>
          </div>
        </Link>

        {/* Card 4 - Total Employees */}
        <Link to="/dashboard/allemployee">
          <div className="dark:bg-black rounded-3xl shadow-md p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaUsers className="text-3xl mb-4 mx-auto text-pink-400" />
            <h3 className="text-md font-semibold">Total Employees</h3>
            <p className="text-xl font-bold">100</p>
          </div>
        </Link>

        {/* Card 5 - Total Sales */}
        <Link to="/dashboard/totalsales">
          <div className="dark:bg-black rounded-3xl shadow-md p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaCashRegister className="text-3xl mb-4 mx-auto text-red-400" />
            <h3 className="text-md font-semibold">Total Sales</h3>
            <p className="text-xl font-bold">$120,000</p>
          </div>
        </Link>

        {/* Card 6 - Attendance System */}
        <Link to="/dashboard/attendance">
          <div className="dark:bg-black rounded-3xl shadow-md p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaClipboardList className="text-3xl mb-4 mx-auto text-indigo-400" />
            <h3 className="text-md font-semibold">Attendance System</h3>
            <p className="text-xl font-bold">On Track</p>
          </div>
        </Link>

        {/* Card 7 - Revenue Growth */}
        <Link to="/dashboard/revenuegrowth">
          <div className="dark:bg-black rounded-3xl shadow-md p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaChartLine className="text-3xl mb-4 mx-auto text-green-400" />
            <h3 className="text-md font-semibold">Revenue Growth</h3>
            <p className="text-xl font-bold">10%</p>
          </div>
        </Link>

        {/* Card 8 - Active Users */}
        <Link to="/dashboard/customerengagement">
          <div className="dark:bg-black rounded-3xl shadow-md p-6 text-center hover:shadow-2xl transition-shadow duration-300">
            <FaUsers className="text-3xl mb-4 mx-auto text-teal-400" />
            <h3 className="text-md font-semibold">Active Users</h3>
            <p className="text-xl font-bold">2,000</p>
          </div>
        </Link>
      </div>

      {/* Activity Log & Notifications */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dark:bg-black rounded-3xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Updated product catalog - 1 hour ago</li>
            <li>Completed sales meeting - 2 hours ago</li>
            <li>Generated weekly sales report - 5 hours ago</li>
          </ul>
        </div>

        <div className="dark:bg-black rounded-3xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="flex items-center space-x-4">
            <FaBell className="text-3xl text-orange-400" />
            <p className="text-gray-400">3 new notifications</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 dark:bg-black rounded-3xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <MapOne />
        </div>

        {/* Performance Chart */}
        <div className="xl:col-span-8 dark:bg-black rounded-3xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
          {/* Placeholder for Chart */}
          <div className="h-64 flex items-center justify-center text-gray-400">
            <FaChartBar className="text-6xl text-gray-400" />
            <p className="ml-4">Chart coming soon...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ECommerce;
