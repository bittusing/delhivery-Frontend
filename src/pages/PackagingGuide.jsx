import React, { useState } from "react";

const PackagingGuidePage = () => {
  const [guides] = useState([
    { id: 1, type: "Small Box", maxWeight: "5kg", dimensions: "10x10x10 cm" },
    { id: 2, type: "Medium Box", maxWeight: "20kg", dimensions: "20x20x20 cm" },
    { id: 3, type: "Large Box", maxWeight: "50kg", dimensions: "30x30x30 cm" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Packaging Guide</h1>
        <p className="text-sm text-gray-600 mt-1">Learn how to properly package your shipments.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-semibold">Package Type</th>
              <th className="text-left py-2 px-4 font-semibold">Max Weight</th>
              <th className="text-left py-2 px-4 font-semibold">Recommended Dimensions</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((guide) => (
              <tr key={guide.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{guide.type}</td>
                <td className="py-2 px-4">{guide.maxWeight}</td>
                <td className="py-2 px-4">{guide.dimensions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Tips for Safe Packaging:</h3>
        <ul className="text-sm text-gray-700 space-y-1 ml-4">
          <li>• Use sturdy boxes and padding materials</li>
          <li>• Ensure items are securely wrapped</li>
          <li>• Add fragile stickers if necessary</li>
          <li>• Fill empty spaces with cushioning material</li>
        </ul>
      </div>
    </div>
  );
};

export default PackagingGuidePage;
