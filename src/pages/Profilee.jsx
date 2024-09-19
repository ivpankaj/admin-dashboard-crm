return (
    <>
      <Breadcrumb pageName="Employee Profiles" />

      <div className="min-h-screen p-8 bg-gray-900">
        {employees.map((employee) => (
          <div key={employee.employeeId} className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative -mt-16 h-32 w-32 rounded-full overflow-hidden border-4 border-gray-700">
                <img
                  src={`http://localhost:5000${employee.profilePicture}`} // Ensure proper path for profile picture
                  alt={`${employee.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-3xl font-bold text-gray-200">{employee.name}</h3>
                <p className="text-lg font-medium text-gray-400">{employee.jobTitle}</p>
              </div>
            </div>

            {/* Employee Information Section */}
            <div className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4 text-gray-200 text-center">Employee Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md">
                {[{
                  label: 'Email',
                  value: employee.email,
                  icon: <FaEnvelope />,
                  onClick: () => window.location.href = `mailto:${employee.email}`,
                }, {
                  label: 'Phone',
                  value: employee.contactNumber,
                  icon: <FaPhone />,
                  onClick: () => window.location.href = `tel:${employee.contactNumber}`,
                }, {
                  label: 'Department',
                  value: employee.department,
                  icon: <FaBuilding />,
                }, {
                  label: 'Hire Date',
                  value: new Date(employee.hireDate).toLocaleDateString(),
                  icon: <FaCalendarAlt />,
                }, {
                  label: 'Address',
                  value: employee.address,
                  icon: <FaMapMarkerAlt />,
                  onClick: () => window.open(`https://www.google.com/maps?q=${employee.address}`, '_blank'),
                }, {
                  label: 'Salary',
                  value: `₹${employee.salary}`,
                  icon: <FaDollarSign />,
                }, {
                  label: 'Attendance Count',
                  value: employee.attendanceCount,
                  icon: <FaCalendarAlt />,
                }, {
                  label: 'Status',
                  value: employee.isActive ? 'Active' : 'Inactive',
                  icon: <FaUserTie />,
                  className: employee.isActive ? 'text-green-500' : 'text-red-500'
                }].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-4 rounded-md bg-gray-600 border border-gray-500 hover:bg-gray-500 transition duration-300 cursor-pointer ${item.className}`}
                    onClick={item.onClick}
                  >
                    <span className="mr-3 text-gray-400 text-xl">{item.icon}</span>
                    <span className="font-medium text-gray-300">{item.label}:</span>
                    <span className="text-gray-100 ml-2">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );