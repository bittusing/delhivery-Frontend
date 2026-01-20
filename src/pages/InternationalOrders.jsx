import React from 'react';

const InternationalOrders = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">International Orders</h1>
        
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4m-4 0H9m11 0a2 2 0 01-2 2M7 13a2 2 0 01-2-2M5 11V9a2 2 0 012-2m0 0V6a2 2 0 012-2h6a2 2 0 012 2v1M7 7v4a2 2 0 002 2h6a2 2 0 002-2V7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">International Orders</h3>
          <p className="text-gray-500">Manage your international shipping orders here.</p>
        </div>
      </div>
    </div>
  );
};

export default InternationalOrders;