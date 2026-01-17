import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Info,
  Plus,
  ChevronDown,
  Loader2,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePickupRequests } from "../hooks/usePickupRequests";

// Helper function to format date
const formatDate = (date) => {
  if (!date) return 'Select date';
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  };
};

const getStatusColor = (status) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'picked_up':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

// Main Component
const PickupRequests = () => {
  const navigate = useNavigate();
  const { pickupRequests, locations, loading, error, fetchPickupRequests, fetchLocations } = usePickupRequests();
  
  // State for filters
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  endDate.setDate(endDate.getDate() + 14); // Default 14 days ahead
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Fetch locations on mount
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Fetch pickup requests when filters change
  useEffect(() => {
    const filters = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: statusFilter || undefined,
      location: locationFilter || undefined,
      search: searchQuery || undefined
    };
    
    fetchPickupRequests(filters);
  }, [startDate, endDate, statusFilter, locationFilter, searchQuery, fetchPickupRequests]);

  // Custom input component for DatePicker
  const CustomInput = React.forwardRef(({ onClick }, ref) => (
    <div
      className="flex items-center rounded-lg px-4 py-[10px] bg-[#131842] cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      <span className="text-sm font-medium text-white whitespace-nowrap">
        Pickup Date : {formatDate(startDate)} to {formatDate(endDate)}
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

        <Link 
          to={"/create-pickup-request"} 
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-[18px] px-3 rounded-lg shadow-md transition duration-200"
        >
          <Plus size={18} className="mr-2" />
          Create Pickup Request
        </Link>
      </header>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* 2. Controls and Filters */}
      <div className="flex items-center space-x-4 flex-wrap gap-3">
        {/* Search Bar */}
        <div className="flex items-center rounded-lg overflow-hidden">
          <span className="bg-white p-[11px]">
            <Search size={18} className="text-black" />
          </span>
          <input
            type="text"
            placeholder="Search pickup ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-[10px] px-4 text-sm focus:outline-none placeholder-[#131842] bg-[#1318420D] w-48"
          />
          <span className="bg-white p-[11px]">
            <Info size={18} className="text-black" title="View search tips" />
          </span>
        </div>

        {/* Date Range Filter */}
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setStartDate(update[0] || new Date());
            setEndDate(update[1] || new Date());
          }}
          customInput={<CustomInput />}
        />

        {/* Status Dropdown */}
        <div className="relative font-medium rounded-lg overflow-hidden">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-[10px] pl-4 bg-white text-sm font-semibold text-black appearance-none pr-8 focus:outline-none cursor-pointer min-w-[140px]"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="picked_up">Picked Up</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-black">
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="relative font-medium rounded-lg overflow-hidden">
          <select 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="py-[10px] pl-4 bg-white text-sm font-semibold text-black appearance-none pr-8 focus:outline-none cursor-pointer min-w-[180px]"
          >
            <option value="">All Locations</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc.name}>{loc.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-black">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* 3. Table Structure */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="flex items-center p-4 border-b bg-[#1318420D] text-xs font-semibold uppercase text-gray-600">
            <input
              type="checkbox"
              className="mr-4 h-4 w-4 text-blue-600 border-gray-300 rounded flex-shrink-0"
            />

            {/* Columns */}
            <div className="grid grid-cols-8 gap-4 w-full">
              <div className="cursor-pointer hover:text-gray-800">PICKUP ID</div>
              <div className="cursor-pointer hover:text-gray-800">REQUESTED ON</div>
              <div className="cursor-pointer hover:text-gray-800">STATUS</div>
              <div className="cursor-pointer hover:text-gray-800">PICKUP LOCATION</div>
              <div className="cursor-pointer hover:text-gray-800">PICKED / EXPECTED AWBS</div>
              <div className="cursor-pointer hover:text-gray-800">PICKUP DATE</div>
              <div className="cursor-pointer hover:text-gray-800">LAST UPDATE</div>
              <div className="text-right">ACTIONS</div>
            </div>
          </div>

          {/* Table Body */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : pickupRequests && pickupRequests.length > 0 ? (
            pickupRequests.map((request) => {
              const requestedDateTime = formatDateTime(request.requestedOn);
              const pickupDateTime = formatDateTime(request.pickupDate);
              const lastUpdateDateTime = formatDateTime(request.lastUpdate);
              
              return (
                <div key={request.id} className="flex items-center p-4 border-b hover:bg-blue-50 transition duration-100">
                  <input type="checkbox" className="mr-4 h-4 w-4 text-blue-600 border-gray-300 rounded flex-shrink-0" />
                  <div className="grid grid-cols-8 gap-4 w-full text-sm text-gray-700">
                    <div className="font-medium text-blue-600 cursor-pointer hover:underline">
                      {request.id || request.pickupId || 'N/A'}
                    </div>
                    <div>
                      <div>{requestedDateTime.date}</div>
                      <div className="text-xs text-gray-500">{requestedDateTime.time}</div>
                    </div>
                    <div>
                      <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status?.replace('_', ' ').toUpperCase() || 'PENDING'}
                      </span>
                    </div>
                    <div className="truncate" title={request.location || request.pickupLocation?.name || 'N/A'}>
                      {request.location || request.pickupLocation?.name || 'N/A'}
                    </div>
                    <div>{request.awbs || `${request.pickedAWBs || 0} / ${request.expectedAWBs || 0}`}</div>
                    <div>
                      <div>{pickupDateTime.date}</div>
                      <div className="text-xs text-gray-500">{pickupDateTime.time}</div>
                    </div>
                    <div>
                      <div>{lastUpdateDateTime.date}</div>
                      <div className="text-xs text-gray-500">{lastUpdateDateTime.time}</div>
                    </div>
                    <div className="text-right">
                      <button 
                        onClick={() => navigate(`/pickup-request/${request.id || request._id}`)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center py-20 text-lg font-medium text-gray-500">
              No Records Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickupRequests;
