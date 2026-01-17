import React from 'react';
import { CloudUpload, Plus } from 'lucide-react'; 



const ForwardOrders = () => {
    // Event handlers would typically be passed down or defined here 
    // to handle the button clicks (e.g., navigation, opening a modal, etc.)
    const handleCreateBulkOrders = () => {
        console.log("Create Bulk Orders clicked");
        // Add navigation or logic here
    };

    const handleCreateOrder = () => {
        console.log("Create Order clicked");
        // Add navigation or logic here
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-[calc(100vh-96px)]">
            <div className="text-center">
                {/* 1. Box Icon */}
                <img src="/images/icon/box-icon.png" alt="box-icon" className='m-auto'/>

                {/* 2. Headline */}
                <h2 className="mt-9 text-xl font-bold text-gray-800">
                    Seems like you haven't created a domestic order yet
                </h2>

                {/* 3. Description */}
                <p className="mt-1 text-sm text-gray-500">
                    A Domestic Order is an order request your customer places for the products you sell
                </p>

              
                <div className="mt-5 flex justify-center space-x-4">
                    <button
                        onClick={handleCreateBulkOrders}
                        className="flex items-center px-4 py-2 text-sm font-semibold text-[#131842] bg-white border-[2px] border-[#131842] rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                        <CloudUpload className="w-4 h-4 mr-2" />
                        Create Bulk Orders
                    </button>
                    <button
                        onClick={handleCreateOrder}
                        className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForwardOrders;