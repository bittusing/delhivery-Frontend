import React from "react";

export default function UpcomingPickups() {
  const rows = [1, 2, 3, 4]; // placeholder rows

  return (
    <div className="w-full p-4 bg-white rounded-md border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 class es="text-lg font-bold flex items-center gap-2">
          <span className="p-1.5 bg-gray-100 rounded-md">🚚</span> Upcoming Pickups
        </h2>
        <button className="mt-2 sm:mt-0 text-blue-600 font-medium flex items-center gap-1">
          <span>＋</span> Create New Order
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
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <span>📍</span>
                      <span className="text-xs">
                        RAJAN JHA (Delhi-110044)
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>🏬</span>
                      <span className="text-xs">
                        SEMO PAK (Kohima-797001)
                      </span>
                    </div>
                  </div>
                </td>

                {/* Shipping */}
                <td className="py-3 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-xs">
                    <span>🚚</span> Delhivery Express
                  </div>
                </td>

                {/* Print */}
                <td className="py-3 px-2 text-blue-600 cursor-pointer text-xs">
                  Print &#9013;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
