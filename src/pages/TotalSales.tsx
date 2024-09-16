import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Import the back arrow icon

// Define the sales data type
interface Sale {
  id: number;
  productName: string;
  amount: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  salesAmount:number;
  quantitySold:number;
}

const TotalSales: React.FC = () => {
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch sales data from the API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sales/getall', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data: Sale[] = await response.json();
          setSalesData(data);
        } else {
          console.error('Failed to fetch sales data');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

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

      {loading ? (
        <p>Loading sales data...</p>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Amount ($)
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity Sold
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Email
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Phone
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-sm text-gray-700">{sale.productName}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{sale. salesAmount}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{sale. quantitySold}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{sale.customerName}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{sale.customerEmail}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{sale.customerPhone}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleViewDetails(sale.id)}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TotalSales;
