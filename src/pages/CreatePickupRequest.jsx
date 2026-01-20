import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Clock,
  Box,
  Info,
  Check,
  ChevronLeft,
  Truck,
  Sun,
  Loader2,
  AlertCircle
} from "lucide-react";
import { usePickupRequests } from "../hooks/usePickupRequests";
import { useShippingMode } from "../context/ShippingModeContext";

const DateButton = ({ day, date, isActive, onClick, isEnabled = true }) => (
  <button
    className={`flex flex-col items-center justify-center ${!isEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    onClick={onClick}
    disabled={!isEnabled}
  >
    <span
      className={`text-xs font-semibold opacity-80 mb-2 ${isActive ? "text-blue-600" : "text-[#131842]"
        }`}>
      {day}
    </span>
    <span
      className={`text-sm font-semibold rounded-full w-10 h-10 border border-gray-500 leading-10 ${isActive ? "bg-blue-600 text-white border-blue-500" : "bg-gray-100 text-[#131842]"
        }`}>
      {date}
    </span>
  </button>
);

/**
 * Main Component: CreatePickupRequest
 */
const CreatePickupRequest = () => {
  const navigate = useNavigate();
  const { locations, availableOrders, loading, error, createPickupRequest, fetchLocations, fetchAvailableOrders } = usePickupRequests();
  const { shippingMode } = useShippingMode();

  const [pickupLocation, setPickupLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("Mid Day 10:00:00 - 14:00:00");
  const [isDefaultSlotSaved, setIsDefaultSlotSaved] = useState(false);
  const [formError, setFormError] = useState("");

  // Fetch locations on mount
  useEffect(() => {
    fetchLocations(shippingMode);
  }, [fetchLocations, shippingMode]);

  // Fetch available orders when location changes
  useEffect(() => {
    if (pickupLocation) {
      fetchAvailableOrders(pickupLocation, shippingMode);
    }
  }, [pickupLocation, fetchAvailableOrders, shippingMode]);

  // Generate available dates (today + next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = i === 0 ? 'Today' : dayNames[date.getDay()];

      dates.push({
        day: dayName,
        date: date.getDate().toString(),
        fullDate: date,
        isEnabled: true
      });
    }

    return dates;
  };

  const availableDates = getAvailableDates();

  // Pickup slots
  const pickupSlots = [
    {
      id: "midday",
      label: "Mid Day 10:00:00 - 14:00:00",
      startTime: "10:00:00",
      endTime: "14:00:00"
    },
    {
      id: "morning",
      label: "Morning 08:00:00 - 12:00:00",
      startTime: "08:00:00",
      endTime: "12:00:00"
    },
    {
      id: "evening",
      label: "Evening 14:00:00 - 18:00:00",
      startTime: "14:00:00",
      endTime: "18:00:00"
    }
  ];

  // Get selected location details
  const selectedLocationDetails = locations.find(loc => loc.name === pickupLocation);

  // Calculate time remaining for same day pickup
  const getTimeRemaining = () => {
    const now = new Date();
    const cutoffTime = new Date();
    cutoffTime.setHours(14, 0, 0, 0); // 2 PM

    if (now < cutoffTime) {
      const diff = cutoffTime - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}:${minutes.toString().padStart(2, '0')} Hrs`;
    }
    return null;
  };

  const timeRemaining = getTimeRemaining();

  const handleCreatePickup = async () => {
    setFormError("");

    if (!pickupLocation) {
      setFormError("Please select a pickup location");
      return;
    }

    if (!selectedDate) {
      setFormError("Please select a pickup date");
      return;
    }

    if (!selectedLocationDetails) {
      setFormError("Invalid pickup location");
      return;
    }

    try {
      const slotDetails = pickupSlots.find(s => s.label === selectedSlot) || pickupSlots[0];

      const pickupData = {
        pickupLocation: {
          name: selectedLocationDetails.name,
          address: selectedLocationDetails.address,
          city: selectedLocationDetails.city,
          state: selectedLocationDetails.state,
          pincode: selectedLocationDetails.pincode,
          phone: selectedLocationDetails.phone
        },
        pickupDate: selectedDate.toISOString(),
        pickupSlot: {
          startTime: slotDetails.startTime,
          endTime: slotDetails.endTime,
          label: slotDetails.label
        },
        orderIds: availableOrders.map(o => o._id || o.id),
        isDefaultSlot: isDefaultSlotSaved,
        orderType: shippingMode
      };

      const result = await createPickupRequest(pickupData);

      // Success - redirect to pickup requests page
      navigate('/pickup-requests');
    } catch (err) {
      setFormError(err.message || 'Failed to create pickup request');
    }
  };

  return (
    <div className="min-h-screen mb-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-sm font-semibold text-[#131842]">Create Pickup Request</h1>
      </div>

      {/* Error Message */}
      {(error || formError) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error || formError}</span>
        </div>
      )}

      {/* --- Pickup Details Section --- */}
      <section className="rounded-lg shadow-md p-3 mb-6 border border-[#B8BACC]">
        <div className="flex items-center text-lg font-semibold text-[#131842] mb-4">
          <span className="bg-[#FFFFFF] rounded-lg py-2 px-3 mr-3">
            <Truck size={24} className="text-black" />
          </span>
          Pickup Details
        </div>

        {/* Pickup Location */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-[#131842] flex items-center mb-2">
            Pickup Location
            <Info size={14} className="ml-1 cursor-pointer" />
          </label>
          <div className="relative w-1/2">
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full appearance-none rounded-lg py-2.5 pl-4 pr-10 text-gray-800 bg-[#FFFFFF] focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition duration-150 ease-in-out border border-gray-300"
            >
              <option value="">Select Pickup Location</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc.name}>{loc.name}</option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#131842] pointer-events-none"
            />
          </div>
        </div>

        {/* Pickup Date */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#131842] mb-2">
            Pickup Date
          </label>
          <p className="text-sm font-medium text-[#131842] mb-4">
            Pickup will be attempted during the selected Pickup Slot
          </p>
          <div className="flex space-x-3">
            {availableDates.map((d) => (
              <DateButton
                key={d.date}
                day={d.day}
                date={d.date}
                isActive={selectedDate && selectedDate.getDate().toString() === d.date}
                onClick={() => setSelectedDate(d.fullDate)}
                isEnabled={d.isEnabled}
              />
            ))}
          </div>
        </div>

        {/* Same Day Pickup Alert */}
        {timeRemaining && (
          <div className="flex items-center p-3 bg-[#1318420D] border-l-4 border-yellow-500 rounded-lg text-sm text-[#131842] mb-6 w-fit">
            <Info size={18} className="mr-3" />
            <p className="leading-relaxed">
              <span className="font-semibold">{timeRemaining}</span> remain for the same
              day Pickup. Book before 2pm to get Same day pickup at your doorstep
            </p>
          </div>
        )}

        {/* Default Pickup Slot */}
        <div className="p-6 bg-[#1318420D] rounded-xl border border-gray-100 w-2/3 flex items-center gap-4">
          <img src="/images/icon/pickup-slot.png" alt="pickup-slot" />
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-[#131842] mb-4">Default Pickup Slot</h2>
            <div className="relative mb-4">
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg py-2.5 px-4 text-gray-800 bg-white focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition duration-150 ease-in-out"
              >
                {pickupSlots.map((slot) => (
                  <option key={slot.id} value={slot.label}>
                    {slot.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#131842] pointer-events-none"
              />
            </div>
            {/* Save Default Checkbox */}
            <div className="flex items-center">
              <input
                id="save-default-slot"
                type="checkbox"
                checked={isDefaultSlotSaved}
                onChange={(e) => setIsDefaultSlotSaved(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="save-default-slot"
                className="ml-2 text-sm text-gray-600"
              >
                Save this as the default pickup slot for this location
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* --- Orders Ready Section --- */}
      {pickupLocation && (
        <section className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center text-sm font-semibold text-gray-800 mb-4">
            <Box size={24} className="text-gray-600 mr-3" />
            Orders ready to be shipped from {pickupLocation}
            <Info size={14} className="ml-2 text-gray-400 cursor-pointer" />
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : availableOrders && availableOrders.length > 0 ? (
            <div className="space-y-2">
              {availableOrders.slice(0, 5).map((order, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm text-gray-800">{order.orderNumber}</div>
                    <div className="text-xs text-gray-500">{order.awb || 'AWB not generated'}</div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {order.pickupDetails?.city}, {order.pickupDetails?.state}
                  </div>
                </div>
              ))}
              {availableOrders.length > 5 && (
                <div className="text-sm text-gray-600 text-center pt-2">
                  + {availableOrders.length - 5} more orders
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-4">
              No orders available for pickup at this location
            </div>
          )}
        </section>
      )}

      {/* --- Sticky Footer Action Bar --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl flex justify-end space-x-4 z-40">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-150"
        >
          Cancel
        </button>
        <button
          onClick={handleCreatePickup}
          disabled={loading || !pickupLocation || !selectedDate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-150 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Check size={20} className="mr-2" />
              Create Pickup Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePickupRequest;
