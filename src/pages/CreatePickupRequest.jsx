import React, { useState } from "react";
import {
  ChevronDown,
  Clock,
  Box,
  Info,
  Check,
  ChevronLeft,
  Truck,
  Sun
} from "lucide-react";

const DateButton = ({ day, date, isActive, onClick }) => (
  <button
    className={`flex flex-col items-center justify-center`}
    onClick={onClick}
  >
    <span
      className={`text-xs font-semibold opacity-80 mb-2 ${
        isActive ? " text-blue-600 " : "text-[#131842]"
      }`}>
      {day}
    </span>
    <span
      className={`text-sm font-semibold rounded-full w-10 h-10 border border-gray-500 leading-10 ${
        isActive ? "bg-blue-600 text-white border-blue-500" : "bg-gray-100 text-[#131842]"
      }`}>
      {date}
    </span>
  </button>
);

/**
 * Main Component: CreatePickupRequest
 * Replicates the UI from the screenshot using React and Tailwind CSS.
 */
const CreatePickupRequest = () => {
  const [pickupLocation, setPickupLocation] = useState("RAJAN JHA");
  const [selectedDate, setSelectedDate] = useState("24"); // Corresponds to Mon 24
  const [isDefaultSlotSaved, setIsDefaultSlotSaved] = useState(false);

  // Dummy data for available dates
  const availableDates = [
    { day: "Today", date: "23", isEnabled: true },
    { day: "Mon", date: "24", isEnabled: true },
    { day: "Tue", date: "25", isEnabled: true },
  ];

  // Dummy data for pickup slots
 const pickupSlots = [
  {
    id: "midday",
    label: "☀️ Mid Day 10:00:00 - 14:00:00",
  },
  {
    id: "morning",
    label: "🌅 Morning 08:00:00 - 12:00:00",
  },
];
  const [selectedSlot, setSelectedSlot] = useState(pickupSlots[0].label);

  const handleCreatePickup = () => {
    console.log("Pickup Request Created", {
      pickupLocation,
      selectedDate,
      selectedSlot,
      isDefaultSlotSaved,
    });
    alert("Pickup Request Submitted!");
    // Implement actual API call logic here
  };

  return (
    <div className="min-h-screen mb-24">
      {/* Header */}
      <h1 className="text-sm font-semibold text-[#131842] flex gap-2 h-10 items-center mb-5">
        <ChevronLeft /> Create Pickup Request
      </h1>

      {/* --- Pickup Details Section --- */}
      <section className="rounded-lg shadow-md p-3 mb-6 border border-[#B8BACC]">
        <div className="flex items-center text-lg font-semibold text-[#131842] mb-4">
          <span className="bg-[#FFFFFF] rounded-lg py-2 px-3 mr-3">
            <Truck size={24} className="text-black " />
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
              className="w-full appearance-none  rounded-lg py-2.5 pl-4 pr-10 text-gray-800 bg-[#FFFFFF] focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition duration-150 ease-in-out"
            >
              <option value="RAJAN JHA">RAJAN JHA</option>
              <option value="RAJAN JHA">RAJAN JHA</option>
              <option value="RAJAN JHA">RAJAN JHA</option>
              {/* Add more options here */}
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
                isActive={d.date === selectedDate}
                onClick={() => d.isEnabled && setSelectedDate(d.date)}
              />
            ))}
          </div>
        </div>

        {/* Same Day Pickup Alert */}
        <div className="flex items-center p-3 bg-[#1318420D] border-l-4 border-yellow-500 rounded-lg text-sm text-[#131842] mb-6 w-fit">
          <Info size={18} className="mr-3" />
          <p className="leading-relaxed ">
            <span className="font-semibold">02:48 Hrs</span> remain for the same
            day Pickup. Book before 2pm to get Same day pickup at yor doorstep
          </p>
        </div>

        {/* Default Pickup Slot */}

            





        <div className="p-6 bg-[#1318420D] rounded-xl border border-gray-100 w-2/3 flex items-center gap-4">
          
          <img src="/images/icon/pickup-slot.png" alt="pickup-slot"/>
          <div>
            <h2 className="text-sm font-semibold text-[#131842] mb-4"> Default Pickup Slot</h2> 
            <div className="relative mb-4">
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-lg py-2.5 px-4 text-gray-800 bg-white focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition duration-150 ease-in-out">
                {pickupSlots.map((slot) => (
                  <option key={slot.id} value={slot.label}>
                      {slot.label}
                  </option>
                ))}
              </select>
                <ChevronDown  size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#131842] pointer-events-none"
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
      <section className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <div className="flex items-center text-sm font-semibold text-gray-800">
          <Box size={24} className="text-gray-600 mr-3" />
          Orders ready to be shipped from RAJAN JHA
          <Info size={14} className="ml-2 text-gray-400 cursor-pointer" />
        </div>
        {/* In a real application, this section would list the orders */}
      </section>

      {/* --- Sticky Footer Action Bar --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl flex justify-end space-x-4">
        <button
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition duration-150"
          onClick={() => console.log("Cancelled")}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-150 flex items-center"
          onClick={handleCreatePickup}
        >
          <Check size={20} className="mr-2" />
          Create Pickup Request
        </button>
      </div>
    </div>
  );
};

export default CreatePickupRequest;
