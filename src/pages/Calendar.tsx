import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt, FaTasks, FaBirthdayCake } from 'react-icons/fa';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  // Function to add a class to the current date tile
  const tileClassName = ({ date: calendarDate }) => {
    const today = new Date();
    if (
      calendarDate.getDate() === today.getDate() &&
      calendarDate.getMonth() === today.getMonth() &&
      calendarDate.getFullYear() === today.getFullYear()
    ) {
      return 'highlight-today';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Calendar</h1>
      
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 mb-12 max-w-4xl w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center justify-center md:justify-start">
          <FaCalendarAlt className="mr-2 text-blue-500" /> Choose a Date
        </h2>
        <div className="w-full overflow-x-auto">
          <Calendar
            onChange={onDateChange}
            value={date}
            className="border border-gray-300 w-full shadow-md rounded-lg"
            tileClassName={tileClassName}  // Apply the custom class to tiles
          />
        </div>
        <p className="text-gray-700 mt-4 text-center">
          Selected Date: {date.toDateString()}
        </p>
      </div>

      {/* Additional content to make it more attractive */}
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center md:text-left">Upcoming Events</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border border-teal-500 text-gray-800 p-4 rounded-lg">
            <div className="flex items-center">
              <FaTasks className="text-teal-500 text-lg mr-3" />
              <div>
                <p className="font-bold">Team Meeting</p>
                <p className="text-sm">September 15, 2024</p>
              </div>
            </div>
            <span>10:00 AM</span>
          </div>

          <div className="flex items-center justify-between border border-yellow-500 text-gray-800 p-4 rounded-lg">
            <div className="flex items-center">
              <FaBirthdayCake className="text-yellow-500 text-lg mr-3" />
              <div>
                <p className="font-bold">Jane's Birthday</p>
                <p className="text-sm">September 20, 2024</p>
              </div>
            </div>
            <span>All Day</span>
          </div>

          <div className="flex items-center justify-between border border-purple-500 text-gray-800 p-4 rounded-lg">
            <div className="flex items-center">
              <FaTasks className="text-purple-500 text-lg mr-3" />
              <div>
                <p className="font-bold">Project Deadline</p>
                <p className="text-sm">September 30, 2024</p>
              </div>
            </div>
            <span>5:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
