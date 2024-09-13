import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaMoneyBill, FaHome, FaLock } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

const api_url = import.meta.env.VITE_API_URL; 

const Sales_personForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    jobTitle: '',
    department: '',
    hireDate: startDate.toISOString().slice(0, 10),
    salary: '',
    address: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    contactNumber: '',
    password: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (contactNumber: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(contactNumber);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { email: '', contactNumber: '', password: '' };

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Validate phone number
    if (!validatePhoneNumber(formData.contactNumber)) {
      newErrors.contactNumber = 'Phone number must be 10 digits';
      valid = false;
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, and a number';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await fetch(`${api_url}/api/salesperson/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            hireDate: startDate.toISOString().slice(0, 10),
          }),
        });

        if (response.ok) {
          Swal.fire({
            title: "Yayy, sales_person created",
            width: 600,
            padding: "3em",
            color: "#716add",
            background: "#fff url(/images/trees.png)",
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `,
            confirmButtonText: "Okay"
          });
          const data = await response.json();
          console.log(data); // Handle success
        } else {
          Swal.fire({
            title: "Error!",
            text: "sales_person already registered",
            icon: "error",
            confirmButtonText: "Okay"
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error); // Handle error
      }
    }
  };

  return (
    <div className=" ">
      <Breadcrumb pageName="sales_person Form" />
      <button
        onClick={() => navigate(-1)} // Navigates to the previous page
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
   <IoMdArrowRoundBack/>
      </button>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg border border-gray-300 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-300 py-4 px-6 bg-gradient-to-r from-blue-500 to-green-500 text-white dark:border-gray-700 dark:bg-gradient-to-r dark:from-blue-700 dark:to-green-700">
            <h3 className="text-2xl font-semibold">sales_person Personal Information</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
                      Name
                    </label>
                    <div className="relative mt-1">
                      <FaUser className="absolute top-3 left-3 text-blue-500 dark:text-blue-400" />
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-black focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Ayush2"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="contactNumber">
                      Contact Number
                    </label>
                    <div className="relative mt-1">
                      <FaPhone className="absolute top-3 left-3 text-blue-500 dark:text-blue-400" />
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-black focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="9911064727"
                        value={formData.contactNumber}
                        onChange={handleChange}
                      />
                      {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative mt-1">
                      <FaEnvelope className="absolute top-3 left-3 text-blue-500 dark:text-blue-400" />
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-black focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="ayush3@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="jobTitle">
                      Job Title
                    </label>
                    <div className="relative mt-1">
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-4 pr-4 text-black focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        placeholder="IT"
                        value={formData.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="department">
                      Department
                    </label>
                    <div className="relative mt-1">
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-4 pr-4 text-black focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                        type="text"
                        name="department"
                        id="department"
                        placeholder="Software"
                        value={formData.department}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="hireDate">
                      Hire Date
                    </label>
                    <div className="relative mt-1">
                      <FaCalendarAlt className="absolute top-3 left-3 text-blue-500 dark:text-blue-400" />
                      <DatePicker
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-black focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="salary">
                      Salary
                    </label>
                    <div className="relative mt-1">
                      <FaMoneyBill className="absolute top-3 left-3 text-blue-500 dark:text-blue-400" />
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-black focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                        type="number"
                        name="salary"
                        id="salary"
                        placeholder="25000"
                        value={formData.salary}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="address">
                      Address
                    </label>
                    <div className="relative mt-1">
                      <FaHome className="absolute top-3 left-3 text-blue-500 dark:text-blue-400" />
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-black focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Rajhans Plaza"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <FaLock className="absolute top-3 left-3 text-blue-500 dark:text-blue-400" />
                    <input
                      className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-black focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-600 dark:focus:ring-blue-600"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>
                </div>

                <button
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales_personForm;
