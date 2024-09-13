import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Import the back arrow icon

// Fake sales data
const salesData = [
  { id: 1, product: 'Laptop', salesPersonId: 'SP101', amount: 1200 },
  { id: 2, product: 'Smartphone', salesPersonId: 'SP102', amount: 800 },
  { id: 3, product: 'Headphones', salesPersonId: 'SP103', amount: 150 },
  { id: 4, product: 'Smartwatch', salesPersonId: 'SP104', amount: 250 },
  { id: 5, product: 'Monitor', salesPersonId: 'SP105', amount: 300 },
];

const TotalSales: React.FC = () => {
  const navigate = useNavigate();

  // Function to navigate to the sale detail page
  const handleViewDetails = (id: number) => {
    navigate(`/sales/${id}`);
  };

  // Function to go back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Back Button */}
      <button 
        onClick={handleGoBack} 
        className="self-start mb-4 text-blue-600 hover:text-blue-800 flex items-center"
      >
        <FiArrowLeft className="mr-2" /> Back
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Total Sales</h2>
      <div className="w-full max-w-4xl overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salesperson ID
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount ($)
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesData.map((sale) => (
              <tr key={sale.id}>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{sale.id}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{sale.product}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{sale.salesPersonId}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{sale.amount}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-blue-500">
                  <button
                    onClick={() => handleViewDetails(sale.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalSales;
