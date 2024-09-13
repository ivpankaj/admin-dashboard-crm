import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
const api_url = import.meta.env.VITE_API_URL;
interface Meeting {
  meetingId: string;
  topic: string;
  meetingDate: string | null;
  startTime: string;
  endTime: string;
  isOnline: boolean;
  location: string;
}

const MeetingList = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch(
          `${api_url}/api/meetings/getall`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const data = result.data; // Access the data property

        // Map API data to the Meeting interface structure
        const formattedData = data.map((meeting: any) => ({
          meetingId: meeting.id.toString(), // Convert id to string
          topic: meeting.topic,
          meetingDate: meeting.meetingDate, // Handle null values if needed
          startTime: meeting.startTime,
          endTime: meeting.endTime,
          isOnline: meeting.isOnline,
          location: meeting.location,
        }));

        setMeetings(formattedData);
      } catch (error) {
        setError('Failed to fetch meetings');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className=" mx-auto p-4 md:p-6 bg-white shadow-md rounded-lg overflow-x-auto">
        <button
        onClick={() => navigate(-1)} // Navigates to the previous page
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
      <IoMdArrowRoundBack/>
      </button>
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Meetings List</h2>
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-2 py-3 md:px-6 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              Meeting ID
            </th>
            <th className="px-2 py-3 md:px-6 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              Topic
            </th>
            <th className="px-2 py-3 md:px-6 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-2 py-3 md:px-6 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-2 py-3 md:px-6 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              End Time
            </th>
            <th className="px-2 py-3 md:px-6 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              Is Online?
            </th>
            <th className="px-2 py-3 md:px-6 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {meetings.map((meeting) => (
            <tr key={meeting.meetingId}>
              <td className="px-2 py-4 md:px-6 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                {meeting.meetingId}
              </td>
              <td className="px-2 py-4 md:px-6 whitespace-nowrap text-xs md:text-sm text-gray-500">
                {meeting.topic}
              </td>
              <td className="px-2 py-4 md:px-6 whitespace-nowrap text-xs md:text-sm text-gray-500">
                {meeting.meetingDate || 'N/A'}
              </td>
              <td className="px-2 py-4 md:px-6 whitespace-nowrap text-xs md:text-sm text-gray-500">
                {meeting.startTime}
              </td>
              <td className="px-2 py-4 md:px-6 whitespace-nowrap text-xs md:text-sm text-gray-500">
                {meeting.endTime}
              </td>
              <td className="px-2 py-4 md:px-6 whitespace-nowrap text-xs md:text-sm text-gray-500">
                {meeting.isOnline ? 'Yes' : 'No'}
              </td>
              <td className="px-2 py-4 md:px-6 whitespace-nowrap text-xs md:text-sm text-gray-500">
                {meeting.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingList;
