import React, { useState } from "react";

const RestrictedItemsPage = () => {
  const [restrictedItems] = useState([
    { id: 1, category: "Hazardous", items: "Flammable liquids, gases, oxidizers" },
    { id: 2, category: "Weapons", items: "Firearms, explosives, knives" },
    { id: 3, category: "Perishables", items: "Fresh food items without special packaging" },
    { id: 4, category: "Electronics", items: "Batteries, lithium items (limited)" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Restricted Items</h1>
        <p className="text-sm text-gray-600 mt-1">View items that cannot be shipped.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-semibold">Category</th>
              <th className="text-left py-2 px-4 font-semibold">Restricted Items</th>
            </tr>
          </thead>
          <tbody>
            {restrictedItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-semibold">{item.category}</td>
                <td className="py-2 px-4">{item.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-800 mb-2">Important Note:</h3>
        <p className="text-sm text-red-700">
          Attempting to ship restricted items may result in penalties and account suspension. Always verify item restrictions before shipping.
        </p>
      </div>
    </div>
  );
};

export default RestrictedItemsPage;
