import React from "react";
import { Truck, ChevronDown, PrinterCheck } from 'lucide-react';

const UpcomingPickupsCard = () => {
   const rows = [1, 2, 3, 4]; 

  return (
    <div className="bg-white rounded-lg shadow-md px-3 pt-3 pb-6 w-full mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-md mr-3 flex items-center justify-center">
            <img alt="mynaui_truck" src="/images/icon/mynaui_truck.png"></img>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Upcoming Pickups
          </h2>
        </div>
        <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-md transition duration-150 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Pickup
        </button>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 px-2">
                <input type="checkbox" />
              </th>
              <th className="py-2 px-2 whitespace-nowrap">AWB AND ORDER ID</th>
              <th className="py-2 px-2 whitespace-nowrap">MANIFESTED DATE AND TIME</th>
              <th className="py-2 px-2 whitespace-nowrap">PICKUP DATE</th>
              <th className="py-2 px-2 whitespace-nowrap">PICKUP AND DELIVERY ADDRESS</th>
              <th className="py-2 px-2 whitespace-nowrap">SHIPPING MODE</th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((_, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-3 px-2">
                  <input type="checkbox" />
                </td>

                {/* AWB */}
                <td className="py-3 px-2">
                  <div className="text-blue-600 font-medium cursor-pointer text-xs">
                    DL34509432745CN
                  </div>
                  <div className="text-gray-500 text-xs">M000803</div>
                </td>

                {/* Manifested Date */}
                <td className="py-3 px-2 whitespace-nowrap">
                  <div className="font-medium text-xs">21 Nov, 2025</div>
                  <div className="text-gray-500 text-xs">11:28 PM</div>
                </td>

                {/* Pickup Date */}
                <td className="py-3 px-2 whitespace-nowrap font-medium text-xs">
                  22 Nov, Today
                </td>

                {/* Address */}
                <td className="py-3 px-2">
                  <div className="flex gap-2">
                    <img src="/images/icon/pickup-icon.png" className="w-2 h-12" alt="pickup icon" />
                    <div className="flex justify-between flex-col gap-4">
                      <span className="text-xs">
                        RAJAN JHA (Delhi-110044)
                      </span>
                      <span className="text-xs">
                        SEMO PAK (Kohima-797001)
                      </span>
                    </div>
                    
                  </div>
                </td>

                {/* Shipping */}
                <td className="py-3 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-xs">
                    <Truck className="w-4 text-[#DC4D1C]"/> Delhivery Express
                  </div>
                </td>

                {/* Print */}
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2 text-xs text-blue-600 cursor-pointer">
                    <PrinterCheck className="w-4" /> Print <ChevronDown className="w-4"/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default UpcomingPickupsCard;
