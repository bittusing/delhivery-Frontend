import React, { useState } from "react";
import {
  Search,
  Info,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const mockData = [
  // Example data structure, currently empty to match your screenshot
  /*
  {
    id: 'PR1001',
    requestedOn: '08 Nov 2025',
    status: 'Scheduled',
    location: 'Warehouse A',
    awbs: '5 / 10',
    pickupDate: '10 Nov 2025',
    lastUpdate: '09 Nov 2025',
  },
  */
];

// Helper function to format date
const formatDate = (date) => {
  if (!date) return 'Select date';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Helper Component for Dropdowns
const Dropdown = ({ label, icon: Icon }) => (
  <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition duration-150">
    {Icon && <Icon size={16} className="text-gray-500" />}
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <ChevronDown size={14} className="text-gray-500" />
  </div>
);

// Main Component
const PickupRequests = () => {
  // State for the date range filter
  const [startDate, setStartDate] = useState(new Date('2025-11-09'));
  const [endDate, setEndDate] = useState(new Date('2025-11-23'));
  const dateRange = `${formatDate(startDate)} to ${formatDate(endDate)}`;

  // Custom input component for DatePicker
  const CustomInput = React.forwardRef(({ onClick }, ref) => (
    <div
      className="flex items-center rounded-lg px-4 py-[10px] bg-[#131842] cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      <span className="text-sm font-medium text-white whitespace-nowrap">
        Pickup Date : {dateRange}
      </span>
    </div>
  ));

  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* 1. Header Section */}
      <header className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-5">
          <h1 className="text-xl font-bold text-[#131842]">Pickup Requests</h1>
          <button className="text-[#131842] text-base font-medium py-2 px-4 bg-white rounded-md flex items-center gap-5">
            <span>Learn More</span>{" "}
            <img src="/images/icon/q-mark.png" alt="q-mark" />
          </button>
        </div>

        <Link to={"/create-pickup-request"} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-[18px] px-3 rounded-lg shadow-md transition duration-200">
          <Plus size={18} className="mr-2" />
          Create Pickup Request
        </Link>
      </header>

      {/* 2. Controls and Filters */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="flex items-center rounded-lg overflow-hidden ">
          <span className="bg-white p-[11px]">
            <Search size={18} className=" text-black " />
          </span>
          <input
            type="text"
            placeholder="Search pickup ID"
            className="py-[10px] px-4 text-sm focus:bor placeholder-[#131842] bg-[#1318420D] outline-none"
          />
          <span className="bg-white p-[11px]">
            <Info size={18} className="text-black " title="View search tips" />
          </span>
        </div>

        {/* Info Icon (Placeholder for bulk actions/info) */}

        {/* Date Range Filter (Matching the screenshot) */}
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setStartDate(update[0]);
            setEndDate(update[1]);
          }}
          customInput={<CustomInput />}
        />

        {/* Status Dropdown */}
        <div class="relative font-medium rounded-lg overflow-hidden">
          <select class="py-[10px] pl-4  bg-white text-sm font-semibold text-black appearance-none pr-8 focus:outline-none cursor-pointer">
            <option>Status</option>
            <option>Status 2</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-black">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        {/* Location Dropdown */}
        <div class="relative font-medium rounded-lg overflow-hidden">
          <select class="py-[10px] pl-4  bg-white text-sm font-semibold text-black appearance-none pr-8 focus:outline-none cursor-pointer">
            <option>Pickup Location</option>
            <option>Pickup Location 2</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-black">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Table Structure */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mt-5 min-h-[calc(100vh-38vh)]">
        {/* Table Header */}
        <div className="flex items-center p-4 border-b bg-[#1318420D] text-xs font-semibold uppercase text-gray-600">
          <input
            type="checkbox"
            className="mr-4 h-4 w-4 text-blue-600 border-gray-300 rounded"
          />

          {/* Columns */}
          <div className="flex items-center justify-between w-full">
            <div className=" cursor-pointer hover:text-gray-800">
              PICKUP ID 
            </div>
            <div className="cursor-pointer hover:text-gray-800">
              REQUESTED ON 
            </div>
            <div className="cursor-pointer hover:text-gray-800">
              STATUS 
            </div>
            <div className="cursor-pointer hover:text-gray-800">
              PICKUP LOCATION 
            </div>
            <div className="cursor-pointer hover:text-gray-800">
              PICKED / EXPECTED AWBS
            </div>
            <div className="cursor-pointer hover:text-gray-800">
              PICKUP DATE
            </div>
            <div className="cursor-pointer hover:text-gray-800">
              LAST UPDATE
            </div>
            <div className="text-right">ACTIONS</div>
          </div>
        </div>

        {/* Table Body - "No Records Found" State */}
        <div className="flex justify-center items-center py-20 text-lg font-medium text-gray-500">
          No Records Found
        </div>

        {/* --- If you had data, you'd map over it here --- */}
        {/*
        {mockData.map((request) => (
          <div key={request.id} className="flex items-center p-4 border-b hover:bg-blue-50 transition duration-100">
            <input type="checkbox" className="mr-4 h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <div className="grid grid-cols-10 w-full text-sm text-gray-700">
              <div className="col-span-1 font-medium text-blue-600">{request.id}</div>
              <div className="col-span-2">{request.requestedOn}</div>
              <div className="col-span-1">
                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {request.status}
                </span>
              </div>
              <div className="col-span-2">{request.location}</div>
              <div className="col-span-1">{request.awbs}</div>
              <div className="col-span-1">{request.pickupDate}</div>
              <div className="col-span-1">{request.lastUpdate}</div>
              <div className="col-span-1 text-right">
                <button className="text-blue-500 hover:text-blue-700 text-sm">View</button>
              </div>
            </div>
          </div>
        ))}
        */}
      </div>
    </div>
  );
};

export default PickupRequests;
