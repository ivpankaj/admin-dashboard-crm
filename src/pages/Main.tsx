import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PageTitle from '../Components/PageTitle';
import ECommerce from './Dashboard/ECommerce';
import Calendar from './Calendar';
import Profile from './Profile';
import Settings from './Settings';
import EmployeeAll from './EmployeeAll';
import CounselorAll from './CounsellorAll';
import All_Products from './All_Products';
import Employee from './Employee';
import Counselor from './Counselor';
import Sales from './Sales';
import EmployeeForm from './Form/EmployeeForm';
import CounselorForm from './Form/CounselorForm';
import Sales_personAll from './Sales_person_all';
import Sales_personForm from './Form/Sales_personForm';
import UserPage from './UserPage';
import Products from './Products';
import Meetings from './Meetings';
import MeetingForm from './Form/MeetingForm';
import MeetingList from './MeetingList';
import Task_employee from './Form/Task_employee';
import Task_counselor from './Form/Task_counselor';
import Task_sales_person from './Form/Task_sales_person';
import Taskall_employee from './Taskall_employee';
import Attendance_employee from './Form/Attendance_employee';
import Attendance from './Attendance';
import Attendance_counselor from './Form/Attendance_counselor';
import Attendance_sales_person from './Form/Attendance_sales_person';
import Taskall_counsellor from './Taskall_counsellor';
import Taskall_sales_person from './Taskall_sales_person';
import ProductForm from './Form/ProductForm';
import TotalSales from './TotalSales';
import Activeuser from './Activeuser';
import Notification from './Notification';
import Viewallnotification from './viewallnotfication'

const Main = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Admin Dashboard" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar " />
              <Calendar />
            </>
          }
        />
         <Route
          path="/viewnotification"
          element={
            <>
              <PageTitle title="Calendar " />
              <Viewallnotification />
            </>
          }
        />
        <Route
          path="/allemployee"
          element={
            <>
              <PageTitle title="All Employee" />
              <EmployeeAll />
            </>
          }
        />
        <Route
          path="/allsales_person"
          element={
            <>
              <PageTitle title="All Sales Person" />
              <Sales_personAll />
            </>
          }
        />
        <Route
          path="/employee"
          element={
            <>
              <PageTitle title="Employee" />
              <Employee />
            </>
          }
        />
        <Route
          path="/assigntask_employee"
          element={
            <>
              <PageTitle title="Employee" />
              <Task_employee />
            </>
          }
        />{' '}
        <Route
          path="/alltasks_employee"
          element={
            <>
              <PageTitle title="Employee" />
              <Taskall_employee />
            </>
          }
        />
          <Route
          path="/alltasks_counselor"
          element={
            <>
              <PageTitle title="Employee" />
              <Taskall_counsellor />
            </>
          }
        />
        <Route
          path="/customerengagement"
          element={
            <>
              <PageTitle title="Employee" />
              <Activeuser />
            </>
          }
        />
          <Route
          path="/alltasks_sales_person"
          element={
            <>
              <PageTitle title="Employee" />
              <Taskall_sales_person />
            </>
          }
        />
        <Route
          path="/assigntask_counselor"
          element={
            <>
              <PageTitle title="Employee" />
              <Task_counselor />
            </>
          }
        />
        <Route
          path="/assigntask_sales_person"
          element={
            <>
              <PageTitle title="Employee" />
              <Task_sales_person />
            </>
          }
        />
        <Route
          path="/employeeform"
          element={
            <>
              <PageTitle title="Employment Form" />
              <EmployeeForm />
            </>
          }
        />
        <Route
          path="/counselorform"
          element={
            <>
              <PageTitle title="Counselor Form" />
              <CounselorForm />
            </>
          }
        />
        <Route
          path="/sales_personform"
          element={
            <>
              <PageTitle title="Sales Person Form" />
              <Sales_personForm />
            </>
          }
        />
        <Route
          path="/sales"
          element={
            <>
              <PageTitle title="Sales " />
              <Sales />
            </>
          }
        />
         <Route
          path="/totalsales"
          element={
            <>
              <PageTitle title="Sales " />
              <TotalSales />
            </>
          }
        />
        <Route
          path="/counselor"
          element={
            <>
              <PageTitle title="Counselor" />
              <Counselor />
            </>
          }
        />
        <Route
          path="/allproducts"
          element={
            <>
              <PageTitle title="All Products" />
              <All_Products />
            </>
          }
        />
        <Route
          path="/allcounselor"
          element={
            <>
              <PageTitle title="All Counselor" />
              <CounselorAll />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/attendance"
          element={
            <>
              <PageTitle title="Attendance" />
              <Attendance />
            </>
          }
        />
        <Route
          path="/attendance_employee"
          element={
            <>
              <PageTitle title="Attendance" />
              <Attendance_employee />
            </>
          }
        />
        <Route
          path="/attendance_counselor"
          element={
            <>
              <PageTitle title="Attendance" />
              <Attendance_counselor />
            </>
          }
        />
        <Route
          path="/attendance_sales_person"
          element={
            <>
              <PageTitle title="Attendance" />
              <Attendance_sales_person />
            </>
          }
        />
        <Route
          path="/meetings"
          element={
            <>
              <PageTitle title="Attendance" />
              <Meetings />
            </>
          }
        />
        <Route
          path="/createmeetings"
          element={
            <>
              <PageTitle title="Attendance" />
              <MeetingForm />
            </>
          }
        />
        <Route
          path="/getallmeetings"
          element={
            <>
              <PageTitle title="Attendance" />
              <MeetingList />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <PageTitle title="Attendance" />
              <Products />
            </>
          }
        />
        <Route
          path="/notification"
          element={
            <>
              <PageTitle title="Attendance" />
              <Notification/>
            </>
          }
        />
          <Route
          path="/createproducts"
          element={
            <>
              <PageTitle title="Attendance" />
              <ProductForm />
            </>
          }
        />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </DefaultLayout>
  );
};

export default Main;
