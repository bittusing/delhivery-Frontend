import React, { useState } from "react";
import { X, Clock, MapPin, Package, Shield, FileText, AlertCircle, CheckCircle } from "lucide-react";

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  
  const [services] = useState([
    { 
      id: 1, 
      name: "Standard Shipping", 
      description: "Reliable delivery in 3-5 business days", 
      price: "Standard",
      details: {
        deliveryTime: "3-5 business days",
        pricing: "Base rate (1.0x)",
        availability: "Pan India - All zones",
        maxWeight: "50 kg",
        maxSize: "120 cm (L+W+H)",
        insurance: "₹5,000 (Default) | ₹1,00,000 (Max)",
        cutoffTime: "6 PM for same day pickup",
        deliveryWindow: "9 AM - 9 PM",
        features: [
          "Available for all serviceable pincodes",
          "Standard packaging required",
          "Basic tracking included",
          "Cost-effective shipping solution"
        ],
        restrictions: [
          "No time guarantees",
          "No special handling",
          "Standard delivery timeline"
        ],
        useCases: [
          "Regular e-commerce deliveries",
          "Non-urgent shipments",
          "Cost-effective shipping"
        ]
      }
    },
    { 
      id: 2, 
      name: "Express Shipping", 
      description: "Fast delivery in 1-2 business days", 
      price: "Premium",
      details: {
        deliveryTime: "1-2 business days",
        pricing: "Premium rate (1.5x Standard)",
        availability: "Metro cities and major towns (Zone A, B, C)",
        maxWeight: "30 kg",
        maxSize: "100 cm (L+W+H)",
        insurance: "₹10,000 (Default) | ₹2,00,000 (Max)",
        cutoffTime: "5 PM for next day delivery",
        deliveryWindow: "9 AM - 7 PM",
        features: [
          "Priority processing",
          "Dedicated courier assignment",
          "Real-time tracking",
          "SMS/Email notifications",
          "Pickup within 2 hours"
        ],
        restrictions: [
          "Not available on Sundays/holidays",
          "Cutoff time: 5 PM",
          "Limited to zones A, B, C"
        ],
        useCases: [
          "Time-sensitive documents",
          "Urgent business shipments",
          "Fast e-commerce deliveries"
        ]
      }
    },
    { 
      id: 3, 
      name: "Overnight Delivery", 
      description: "Next day delivery before 10 AM", 
      price: "Premium+",
      details: {
        deliveryTime: "Next day before 10 AM",
        pricing: "Premium+ rate (2.0x Standard)",
        availability: "Select metro cities only (Zone A)",
        maxWeight: "10 kg",
        maxSize: "60 cm (L+W+H)",
        insurance: "₹50,000 (Default) | ₹5,00,000 (Max)",
        cutoffTime: "6 PM previous day",
        deliveryWindow: "Before 10 AM",
        features: [
          "Guaranteed delivery before 10 AM",
          "Highest priority processing",
          "Dedicated express courier",
          "Real-time tracking with live location",
          "Proof of delivery with signature",
          "Insurance up to ₹50,000 included",
          "Refund if delivery delayed"
        ],
        restrictions: [
          "Available only Mon-Sat",
          "Not available on holidays",
          "Limited to metro cities",
          "Cutoff time: 6 PM"
        ],
        useCases: [
          "Critical business documents",
          "Medical supplies",
          "Emergency shipments",
          "Legal documents"
        ]
      }
    },
    { 
      id: 4, 
      name: "Temperature Controlled", 
      description: "For temperature-sensitive items", 
      price: "Premium",
      details: {
        deliveryTime: "2-3 business days",
        pricing: "Premium rate (1.8x Standard)",
        availability: "Major cities with cold chain (Zone A, B)",
        maxWeight: "25 kg",
        maxSize: "80 cm (L+W+H)",
        insurance: "₹25,000 (Default) | ₹10,00,000 (Max)",
        cutoffTime: "4 PM (24 hours advance booking required)",
        deliveryWindow: "9 AM - 6 PM",
        temperatureRange: "2°C to 8°C or -18°C to -25°C",
        features: [
          "Specialized cold chain packaging",
          "Temperature monitoring throughout",
          "Temperature logs provided",
          "Dedicated refrigerated vehicles",
          "Priority handling",
          "Insurance mandatory"
        ],
        restrictions: [
          "Minimum order value: ₹500",
          "Advance booking required (24 hours)",
          "Not available in all locations",
          "Additional packaging charges apply",
          "Proper documentation required"
        ],
        useCases: [
          "Pharmaceutical products",
          "Vaccines and medicines",
          "Perishable food items",
          "Biological samples",
          "Cosmetics requiring cold storage"
        ],
        documents: [
          "Temperature requirements document",
          "Material Safety Data Sheet (if applicable)",
          "Drug license (for pharmaceuticals)"
        ]
      }
    },
    { 
      id: 5, 
      name: "Fragile Item Care", 
      description: "Special handling for delicate packages", 
      price: "Standard+",
      details: {
        deliveryTime: "3-5 business days",
        pricing: "Standard+ rate (1.2x Standard)",
        availability: "Pan India - All zones",
        maxWeight: "30 kg",
        maxSize: "100 cm (L+W+H)",
        insurance: "₹10,000 (Default) | ₹2,00,000 (Max)",
        cutoffTime: "6 PM for same day pickup",
        deliveryWindow: "10 AM - 8 PM",
        features: [
          "Special fragile packaging required",
          "'Handle with Care' labels",
          "Extra cushioning/bubble wrap",
          "Trained handlers only",
          "Separate storage in vehicles",
          "Insurance recommended"
        ],
        restrictions: [
          "Customer must declare fragile items",
          "Improper packaging = claim rejection",
          "No stacking allowed"
        ],
        useCases: [
          "Electronics (TVs, monitors, laptops)",
          "Glassware and ceramics",
          "Artwork and antiques",
          "Musical instruments",
          "Delicate machinery"
        ],
        packaging: [
          "Double-walled corrugated boxes",
          "Minimum 2 inches cushioning on all sides",
          "Fragile stickers on all sides",
          "Proper sealing with tape"
        ]
      }
    },
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
              <button 
                onClick={() => setSelectedService(service)}
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedService.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedService.description}</p>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Key Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-blue-600" size={20} />
                    <h3 className="font-semibold text-gray-800">Delivery Time</h3>
                  </div>
                  <p className="text-sm text-gray-700">{selectedService.details.deliveryTime}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="text-green-600" size={20} />
                    <h3 className="font-semibold text-gray-800">Pricing</h3>
                  </div>
                  <p className="text-sm text-gray-700">{selectedService.details.pricing}</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="text-purple-600" size={20} />
                    <h3 className="font-semibold text-gray-800">Availability</h3>
                  </div>
                  <p className="text-sm text-gray-700">{selectedService.details.availability}</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="text-orange-600" size={20} />
                    <h3 className="font-semibold text-gray-800">Insurance</h3>
                  </div>
                  <p className="text-sm text-gray-700">{selectedService.details.insurance}</p>
                </div>
              </div>

              {/* Weight & Size Limits */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Weight & Size Limits</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Maximum Weight</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedService.details.maxWeight}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Maximum Size</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedService.details.maxSize}</p>
                  </div>
                </div>
              </div>

              {/* Cutoff & Delivery Window */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Timing Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Pickup Cutoff Time</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedService.details.cutoffTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Delivery Window</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedService.details.deliveryWindow}</p>
                  </div>
                </div>
                {selectedService.details.temperatureRange && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-600 mb-1">Temperature Range</p>
                    <p className="text-sm font-semibold text-gray-800">{selectedService.details.temperatureRange}</p>
                  </div>
                )}
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <h3 className="font-semibold text-gray-800">Features & Benefits</h3>
                </div>
                <ul className="space-y-2">
                  {selectedService.details.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Restrictions */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="text-red-600" size={20} />
                  <h3 className="font-semibold text-gray-800">Restrictions & Limitations</h3>
                </div>
                <ul className="space-y-2">
                  {selectedService.details.restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <span>{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="text-blue-600" size={20} />
                  <h3 className="font-semibold text-gray-800">Best Used For</h3>
                </div>
                <ul className="space-y-2">
                  {selectedService.details.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Documents (if applicable) */}
              {selectedService.details.documents && (
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Required Documents</h3>
                  <ul className="space-y-2">
                    {selectedService.details.documents.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-yellow-600 mt-0.5">📄</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Packaging Requirements (if applicable) */}
              {selectedService.details.packaging && (
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Packaging Requirements</h3>
                  <ul className="space-y-2">
                    {selectedService.details.packaging.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-indigo-600 mt-0.5">📦</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                Select This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
