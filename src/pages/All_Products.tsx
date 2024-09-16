import { useEffect, useState } from "react";
import { FaShoppingCart, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const api_url = import.meta.env.VITE_API_URL;

type Product = {
  id: number;
  productName: string;
  productCategory: string;
  price: number;
  totalsale: number;
  stockQuantity: number;
  description: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

const All_Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api_url}/api/products/getall`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center space-x-2"
      >
        <IoMdArrowRoundBack className="text-lg" />
        <span>Go Back</span>
      </button>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            <div className="p-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-blue-800">
                {product.productName}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base">{product.productCategory}</p> 
              <p className="text-gray-900 font-bold text-sm sm:text-base md:text-lg mb-2">
                ${product.price}
              </p>
              <p className="text-gray-800 text-sm sm:text-base mb-4">{product.description}</p>
              <div className="flex items-center mb-4">
                <FaShoppingCart className="text-gray-500 mr-2" />
                <p className="text-gray-700 text-sm sm:text-base">Sold: {product.totalsale}</p>
              </div>
              <button
                className={`w-full py-2 text-white font-semibold rounded ${
                  product.isAvailable
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } flex items-center justify-center text-sm sm:text-base`}
                disabled={!product.isAvailable}
              >
                {product.isAvailable ? (
                  <>
                    <FaRegCheckCircle className="mr-2 " />
                    Available
                  </>
                ) : (
                  <>
                    <FaRegTimesCircle className="mr-2" />
                    Out of Stock
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All_Products;
