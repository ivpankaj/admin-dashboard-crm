import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CreateProduct = () => {
  const navigate = useNavigate();
  
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [price, setPrice] = useState('');
  const [totalsale, setTotalsale] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const productData = {
      productName,
      productCategory,
      price,
      totalsale,
      stockQuantity,
      description,
      isAvailable,
    };

    try {
      const response = await fetch('/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Product created successfully!');
        // Reset form
        setProductName('');
        setProductCategory('');
        setPrice('');
        setTotalsale(0);
        setStockQuantity(0);
        setDescription('');
        setIsAvailable(true);
      } else {
        alert('Error creating product.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating product.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-blue-500 mb-4 hover:text-blue-600"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <h2 className="text-2xl font-bold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Total Sales</label>
          <input
            type="number"
            value={totalsale}
            onChange={(e) => setTotalsale(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Stock Quantity</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-700 font-semibold">Available</label>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
