import React, { useState } from 'react';

const Notification: React.FC = () => {
  const [sendBy, setSendBy] = useState('');
  const [sendTo, setSendTo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Notification sent:', { sendBy, sendTo, message });
    // You can implement your submit logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Send Notification</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Send By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Send By</label>
            <input
              type="text"
              value={sendBy}
              onChange={(e) => setSendBy(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          {/* Send To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
            <input
              type="text"
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              placeholder="Enter recipient name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={5}
              required
            ></textarea>
          </div>
          {/* Send Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors"
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Notification;
