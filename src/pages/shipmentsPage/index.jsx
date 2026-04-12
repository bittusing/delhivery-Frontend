import React, { useState, useRef, useEffect } from 'react';
import InTransit from "../../components/shipmentTable/InTransit";

import { 
  Download, Edit, Plus, ChevronDown} from 'lucide-react';
import PendingAwd from '../../components/shipmentTable/PendingAwd';
import ReadytToShip from '../../components/shipmentTable/ReadytToShip';
import ReadyForPickup from '../../components/shipmentTable/ReadyForPickup';
import RtoInTransit from '../../components/shipmentTable/RtoInTransit';
import Delivered from '../../components/shipmentTable/Delivered';
import AllShipments from '../../components/shipmentTable/AllShipments';

function ShipmentsPage(){
    const [view, setView] = useState('In Transit');
    const [isViewOpen, setIsViewOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsViewOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const views = [
        "Pending AWB", "Ready To ship", "Ready For Pickup", 
        "In Transit", "RTO In-Transit", "Delivered", "All Shipment"
    ];
    return(
        <>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsViewOpen(!isViewOpen)}
            className="text-2xl font-bold text-slate-800 flex items-center gap-2 hover:bg-gray-50 p-1 rounded transition"
          >
            {view} <ChevronDown size={20} className={`mt-1 transition-transform ${isViewOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu for Section Switching */}
          {isViewOpen && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2">
              {views.map((item) => (
                <button
                  key={item}
                  onClick={() => { setView(item); setIsViewOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${view === item ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <HeaderButton icon={<Download size={16} />} label="Download shipments" />
          <HeaderButton icon={<Edit size={16} />} label="Edit orders in bulk" />
          <HeaderButton icon={<Plus size={16} />} label="Create orders in bulk" />
          <button className="flex items-center gap-2 bg-[#1a73e8] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm">
            <Plus size={18} /> Create order
          </button>
        </div>
      </div>


        {view === 'In Transit' && <InTransit />}
        {view === 'Pending AWB' && <PendingAwd />}
        {view === 'Ready To ship' && <ReadytToShip />}
        {view === "Ready For Pickup" && <ReadyForPickup/>}
        {view === "RTO In-Transit" && <RtoInTransit/>}
        {view === "Delivered" && <Delivered/>}
        {view === "All Shipment" && <AllShipments/>}
       
        </>
    )
}


// Helper Components
const HeaderButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-[13px] font-bold text-slate-700 hover:bg-gray-50 transition">
    {icon} {label}
  </button>
);



export default ShipmentsPage;