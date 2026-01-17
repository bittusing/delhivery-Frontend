import React from "react";
import { CircleHelp } from 'lucide-react';


export default function OrderDetailsForm() {
  return (
    <div className="w-full space-y-4 pr-5">

      <div class="flex items-center gap-4">
            <img src="/images/icon/back-btn.png" alt="" />
            <h1 class="text-xl font-bold text-[#131842]">Create Order</h1>
            <button class="text-[#146BE6] text-base font-medium py-2 px-3 bg-white rounded-md flex items-center gap-3">
                <span>Learn More</span> <CircleHelp className="w-5" />
            </button>
      </div>

      {/* GRID (mobile → stacked, desktop → 2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4">
        {/* LEFT COLUMN */}
        <div className="space-y-2">
          {/* Order Details Left */}
          <div className="border rounded-lg p-4 bg-white space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <span>🧾</span> Order Details
            </h3>

            {/* Select Channel */}
            <div className="space-y-1">
              <label className="text-xs font-medium">Select Channel</label>
              <select className="w-full border rounded-md p-2 text-sm">
                <option>Select Channel</option>
              </select>
              <p className="text-xs text-gray-500">
                Channels are online (Shopify) or custom channel for offline
                (physical store) orders.
              </p>
            </div>

            {/* Order ID */}
            <div className="space-y-1">
              <label className="text-xs font-medium">ORDER ID</label>
              <input
                type="text"
                placeholder="Enter Order ID / Reference Number"
                className="w-full border rounded-md p-2 text-sm"
              />
              <p className="text-xs text-gray-500">
                It is a unique identification number for an order.
              </p>
            </div>
          </div>

          {/* Add Products */}
          <div className="border rounded-lg p-4 bg-white space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <span>📦</span> Add products to be shipped
            </h3>
            <div>
              <input
                type="text"
                placeholder="Enter at least 3 letters to search by product name / SKU code"
                className="w-full border rounded-md p-2 text-sm"
              />
              <p className="text-xs text-gray-500">
                Add the products you want to ship. Thos canot be modified once
                the order is created.
              </p>
            </div>

            {/* Placeholder product section */}
            <div className="flex flex-col items-center justify-center py-6 text-gray-500 text-sm">
              <div className="text-5xl mb-2">🛍️</div>
              No Products Added
            </div>
          </div>

          <div className="space-y-4">
            {/* Order Details Left */}
            <div className="border rounded-lg p-4 bg-white space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <span>🧾</span> Payment Details
              </h3>

              {/* Select Channel */}
              <div className="space-y-1">
                <label className="text-xs font-medium">Select Channel</label>
                <select className="w-full border rounded-md p-2 text-sm">
                  <option>Pre-Paid</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-white space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <span>🧾</span> Transport Partner
            </h3>

            {/* Select Channel */}
            <div className="space-y-1">
              <label className="text-xs font-medium">
                Select your transport partner
              </label>
              <select className="w-full border rounded-md p-2 text-sm">
                <option>Pre-Paid</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Order Details Right */}
          <div className="border rounded-lg p-4 bg-white space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <span>🧾</span> Order Details
            </h3>

            {/* Facility */}
            <div className="space-y-1">
              <label className="text-xs font-medium">Select Facility</label>
              <select className="w-full border rounded-md p-2 text-sm">
                <option>Select Facility</option>
              </select>
            </div>

            <button className="w-full border rounded-md p-2 text-sm text-left">
              Add Seller Details
            </button>

            <button className="text-blue-600 text-sm underline">
              Add Customer Details
            </button>
          </div>

          {/* Box Details */}
          <div className="border rounded-lg p-4 bg-white space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <span>📦</span> Box Details
            </h3>

            {/* Tabs */}
            <div className="flex items-center gap-4 border-b pb-2 text-sm">
              <button className="font-medium border-b-2 border-blue-600 pb-1">
                1
              </button>
              <button className="text-blue-600">+ Add Box</button>
            </div>

            {/* Box 1 */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Box 1</h4>

              {/* Payment Type */}
              <div className="space-y-1">
                <label className="text-xs font-medium">Payment Type</label>
                <select className="w-full border rounded-md p-2 text-sm">
                  <option>Select Package Type</option>
                </select>
                <p className="text-xs text-gray-500">
                  Select package which will be used to ship
                </p>
              </div>

              {/* Size */}
              <div className="space-y-1">
                <label className="text-xs font-medium">Size</label>
                <div className="flex items-center gap-2">
                  <input
                    className="w-16 border rounded-md p-2 text-sm"
                    placeholder="1"
                  />
                  <input
                    className="w-16 border rounded-md p-2 text-sm"
                    placeholder="1"
                  />
                  <input
                    className="w-16 border rounded-md p-2 text-sm"
                    placeholder="1"
                  />
                  <span className="text-sm bg-gray-100 rounded-md px-7 py-2">
                    cm
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Length + Breadth + Height should be at least 15 cm.
                </p>
              </div>

              {/* Weight */}

              <div className="space-y-1">
                <label className="text-xs font-medium">Package weight</label>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <input
                    type="text"
                    placeholder="Enter package weight"
                    className="flex-1 p-2 text-sm outline-none"
                  />
                  <span className="bg-gray-100 px-3 py-2 text-sm">gm</span>
                </div>
                <p className="text-xs text-gray-500">
                  Packaged weight should be at least 50 grams
                </p>
              </div>

              {/* Info box */}
              <div className="p-3 bg-gray-100 rounded-md text-xs text-gray-600 leading-relaxed flex gap-2">
                <span>ℹ️</span>
                <p>
                  The estimated cost may vary from the final shipping cost based
                  on the package's dimensions & weight measured before delivery.
                </p>
              </div>

              {/* Total Chargeable Weight */}
              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Total Chargeable Weight
                </label>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <input
                    type="text"
                    placeholder="— —"
                    className="flex-1 p-2 text-sm outline-none"
                  />
                  <span className="bg-gray-100 px-3 text-sm py-2">gm</span>
                </div>
              </div>

              {/* Choose shipping mode */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium">Choose shipping mode</h4>
                <div className="flex gap-2">
                  {/* Option 1 */}
                  <div className="flex-1 border-2 border-blue-600 rounded-lg p-3 space-y-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                      <span>🚚</span> SURFACE
                    </div>
                    <div className="text-gray-600 text-sm">₹---</div>
                  </div>

                  {/* Option 2 */}
                  <div className="flex-1 border rounded-lg p-3 space-y-1 bg-gray-50">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <span>🚚</span> SURFACE
                    </div>
                    <div className="text-gray-500 text-sm">₹---</div>
                  </div>
                </div>
              </div>

              {/* Shipping Cost Breakup */}
              <div className="space-y-2">
                <button className="flex items-center justify-between w-full text-sm font-medium">
                  Shipping Cost Breakup
                  <span>⌃</span>
                </button>

                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Freight Cost</span>
                    <span className="text-gray-600">--</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Fuel Surcharge</span>
                    <span className="text-gray-600">--</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">GST – 18% (CGST+SGST)</span>
                    <span className="text-gray-600">--</span>
                  </div>

                  <div className="flex justify-between font-semibold pt-1 border-t">
                    <span>Total</span>
                    <span>--</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
