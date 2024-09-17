import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaCalendar,
  FaUserTie,
  FaUser,
  FaArrowLeft,
  FaClipboardList,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaPhoneAlt,
  FaComments,
} from 'react-icons/fa';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { PiCurrencyInrBold } from 'react-icons/pi';
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLElement | null>(null);
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-auto bg-white dark:bg-black duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <FaArrowLeft size={24} />
        </button>
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="block lg:hidden absolute top-5 left-5 z-50 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaArrowLeft size={24} />
          </button>
        )}
      </div>
      <div className="flex flex-col overflow-y-auto">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard' && 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaHome className="text-lg text-blue-600 dark:text-blue-400" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/calendar"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/calendar' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaCalendar className="text-lg text-green-600 dark:text-green-400" />
                  Calendar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/employee"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/employee' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaClipboardList className="text-lg text-purple-600 dark:text-purple-400" />
                  Employee
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/counselor"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/counselor' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaChalkboardTeacher className="text-lg text-orange-600 dark:text-orange-400" />
                  Counselor
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/sales"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/sales' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaMoneyBillWave className="text-lg text-yellow-600 dark:text-yellow-400" />
                  Sales Person
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/attendance"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/attendance' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaUserTie className="text-lg text-teal-600 dark:text-teal-400" />
                  Attendance
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/profile' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaUser className="text-lg text-pink-600 dark:text-pink-400" />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/products"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/allproducts' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <MdOutlineProductionQuantityLimits className="text-lg text-purple-400 dark:text-purple-400" />
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/calls"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/calls' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaPhoneAlt className="text-lg text-indigo-600 dark:text-indigo-400" />
                  Calls
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/sales"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/chat' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <PiCurrencyInrBold className="text-lg text-green-400 dark:text-green-400" />
                  Sales
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/chat"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 dark:text-gray-100 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/chat' &&
                    'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <FaComments className="text-lg text-gray-600 dark:text-gray-400" />
                  Chat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/meetings"
                  onClick={handleMenuClick}
                  className={`group relative flex items-center gap-2.5 rounded-3xl py-2 px-4 font-medium text-gray-900 duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    pathname === '/dashboard/meetings' &&
                    'bg-gray-100 dark:bg-bg-gray-700'
                  }`}
                >
                  <FaCalendarAlt className="text-lg text-gray-600 dark:text-gray-400" />
                  Meetings
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
