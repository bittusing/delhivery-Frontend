import React from 'react';

export default function Header({setIsSidebarOpen}) {
  return (
    <nav className="flex items-center justify-between py-4 xl:py-6">
      {/* Left Section: Menu and Search Bar */}
      <div className="flex items-center">
        {/* Menu Icon */}
        <img src="/images/icon/toggle-menu.png" alt="toggle-menu" className="cursor-pointer w-6 lg:w-auto" onClick={() => setIsSidebarOpen(prev => !prev)} /> 
      </div>

      {/* Right Section: Wallet, ID/Account, and Profile */}
      <div className="flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
        {/* Search Input Group */}
        <div className="flex rounded-lg overflow-hidden">
          <div className="relative font-medium">
            <select className="p-2 bg-white text-[10px] lg:text-xs xl:text-sm font-semibold text-black appearance-none pr-4 2xl:pr-6 focus:outline-none h-10 cursor-pointer">
              <option>AWB</option>
              <option>Order</option>
            </select>
            {/* Custom Down Arrow */}
            <div className="pointer-events-none absolute inset-y-0 -right-1 flex items-center px-2 text-black">
              <svg className="w-3 xl:w-4 h-3 xl:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <input type="text" placeholder="Search multiple AWBs" className="w-32 lg:w-40 xl:w-52 text-black p-2 focus:outline-none bg-[#1318420D] placeholder:text-[10px] lg:placeholder:text-xs xl:placeholder:text-sm"/>
          <button className="py-2 px-2 xl:px-3 bg-white ">
            <svg className="w-5 xl:w-5 h-4 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>

        <div className="h-12 w-px bg-gray-300"></div>

        {/* Wallet Balance */}
        <div className="flex items-center space-x-2 xl:space-x-3">
          <div className="p-2 rounded-full bg-[#DC4D1C]">
            {/* Wallet Icon */}
            <img src="/images/icon/iconoir_wallet.png" alt="iconoir_wallet" className='w-4 xl:w-auto h-4 xl:h-auto' />  
          </div>
          <div>
            <div className="text-[10px] lg:text-xs xl:text-sm text-[#131842] font-normal leading-5">Wallet Balance</div>
            <div className="font-semibold text-sm lg:text-base xl:text-lg text-gray-800 leading-5">₹48,234.84</div>
          </div>
          <a href="#" className="text-[#146BE6] hover:text-blue-600 text-[10px] lg:text-xs xl:text-sm font-semibold pl-2">Recharge</a>
        </div>
        
        {/* Divider */}
        <div className="h-12 w-px bg-gray-300"></div>

        {/* Account/ID Selector */}
        <div className="flex items-center space-x-2 xl:space-x-3 cursor-pointer">
          <div className="p-2 rounded-full bg-white">
            {/* ID Card Icon */}
            <img src="/images/icon/mynaui_truck.png" alt="mynaui_truck" className='w-4 xl:w-auto h-4 xl:h-auto' />
          </div>
          <div>
            <div className="text-[10px] lg:text-xs xl:text-sm text-[#131842] leading-5">879269-Shardainfotech</div>
            <div className="font-semibold text-sm lg:text-base xl:text-lg text-gray-800 leading-5">Domestic</div>
          </div>
          <svg className="w-4 xl:w-5 h-4 xl:h-5 text-[#146BE6] hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
        </div>

        <div className="h-12 w-px bg-gray-300"></div>


        {/* Profile Picture */}
        <div className="w-8 xl:w-10 h-8 xl:h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img src="/images/person-man.png" alt="Profile" className="object-cover w-full h-full"/>
        </div>
      </div>
    </nav>
  );
}
