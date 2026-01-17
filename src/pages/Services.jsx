import React, { useState } from "react";

const ServicesPage = () => {
  const [services] = useState([
    { id: 1, name: "Standard Shipping", description: "Reliable delivery in 3-5 business days", price: "Standard" },
    { id: 2, name: "Express Shipping", description: "Fast delivery in 1-2 business days", price: "Premium" },
    { id: 3, name: "Overnight Delivery", description: "Next day delivery before 10 AM", price: "Premium+" },
    { id: 4, name: "Temperature Controlled", description: "For temperature-sensitive items", price: "Premium" },
    { id: 5, name: "Fragile Item Care", description: "Special handling for delicate packages", price: "Standard+" },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Services</h1>
        <p className="text-sm text-gray-600 mt-1">Explore additional services we offer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
            <h3 className="font-semibold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                {service.price}
              </span>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
