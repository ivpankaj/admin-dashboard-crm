import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4 space-y-6">
      <h1 className="text-3xl font-bold ">Products Dashboard</h1>

      {/* Create Product Div */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-gray-800 rounded-3xl shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">Create a Product</h2>
        <p className="text-sm text-gray-300">Click here to create a new product and manage your inventory.</p>
        <Link to='/dashboard/createproducts'>
          <button className="mt-4 px-4 py-2 bg-black font-bold rounded-full hover:bg-gray-300 transition">
            Create Product
          </button>
        </Link>
      </div>

      {/* View Sales Div */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-gray-800  rounded-3xl shadow-md hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
        <p className="text-sm text-gray-300">Click here to view total sales and product performance.</p>
        <Link to='/dashboard/allproducts'>
          <button className="mt-4 px-4 py-2 bg-black  font-bold rounded-full hover:bg-gray-300 transition">
            View Sales
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Products;
