import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import { LogOut } from 'lucide-react';
import RechargeModal from './Wallet/RechargeModal';

export default function Header({setIsSidebarOpen}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const { balance, fetchBalance } = useWallet();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  // Format balance amount
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount || 0);
  };

  // Handle recharge success
  const handleRechargeSuccess = () => {
    fetchBalance();
  };

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
            <div className="font-semibold text-sm lg:text-base xl:text-lg text-gray-800 leading-5">
              {formatBalance(balance)}
            </div>
          </div>
          <button
            onClick={() => setIsRechargeModalOpen(true)}
            className="text-[#146BE6] hover:text-blue-600 text-[10px] lg:text-xs xl:text-sm font-semibold pl-2 cursor-pointer transition-colors"
          >
            Recharge
          </button>
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

        {/* Profile Picture with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 xl:w-10 h-8 xl:h-10 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all focus:outline-none"
          >
            {user?.name ? (
              <div className="w-full h-full bg-[#1a2b4b] flex items-center justify-center text-white font-bold text-xs xl:text-sm">
                {getUserInitials()}
              </div>
            ) : (
              <img src="/images/person-man.png" alt="Profile" className="object-cover w-full h-full"/>
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recharge Modal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onSuccess={handleRechargeSuccess}
      />
    </nav>
  );
}
