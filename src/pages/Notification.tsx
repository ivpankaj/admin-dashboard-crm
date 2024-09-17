import React, { useState } from 'react';
import { FaBell, FaUser, FaCommentDots, FaPaperPlane } from 'react-icons/fa'; // FontAwesome icons

const Notification: React.FC = () => {
  const [sendBy, setSendBy] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const api_url = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${api_url}/api/notifications/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: sendBy, type: sendTo, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }

      const result = await response.json();
      setSuccess('Notification sent successfully!');
      // Clear fields after successful submission
      setSendBy('');
      setSendTo('');
      setMessage('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold mb-4 text-center text-indigo-600">Send Notification</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Send By (Title) */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Title</label>
            <input
              type="text"
              value={sendBy}
              onChange={(e) => setSendBy(e.target.value)}
              placeholder="Enter title"
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <FaUser className="absolute left-3 top-11 text-indigo-500 text-xl" />
          </div>

          {/* Notification Type */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Notification Type</label>
            <select
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>Select Type</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>
            <FaBell className="absolute left-3 top-11 text-indigo-500 text-xl" />
          </div>

          {/* Message */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
              required
            />
            <FaCommentDots className="absolute left-3 top-11 text-indigo-500 text-xl" />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center shadow-lg"
              disabled={loading}
            >
              <FaPaperPlane className="mr-2" /> {loading ? 'Sending...' : 'Send Notification'}
            </button>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notification;
