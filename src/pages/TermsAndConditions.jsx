import React, { useState } from 'react';
// Changed 'Ring' to 'Gem'
import { 
  Ruler, ShoppingBag, Wine, Droplet, Info, Crosshair, Beaker, Flame, Settings, 
  Skull, Gem, PiggyBank, Box, ChevronDown 
} from 'lucide-react'

const TermsAndConditionsPage = () => {
 const [openAccordion, setOpenAccordion] = useState(null);
  const [activeTab, setActiveTab] = useState('Packaging Guidelines');


  const topCards = [
    { 
      title: 'Dimensions', 
      desc: 'Help is selection of appropriate size of boxes/flyers. Minimize inventory & cost', 
      icon: <Ruler /> 
    },
    { 
      title: 'Weight', 
      desc: 'Optimize for the minimum strength required for box. Ensures safety of item', 
      icon: <ShoppingBag /> 
    },
    { 
      title: 'Fragility', 
      desc: 'Helps select appropriate box strength. Helps in optimizing the cushioning.', 
      icon: <Wine /> 
    },
    { 
      title: 'Physical State', 
      desc: 'Identifies the need for any special requirements for the protection of them', 
      icon: <Droplet /> 
    },
  ];

  const accordionItems = [
    "Selection of Boxes", "Selection of Flyers/Polybags", "Packing of item",
    "Internal Packing material vs functionality", "Leaking Proofing",
    "Sealing of Shipment", "Shipment labelling", "Special handling labels", "Product categories"
  ];

  const restrictedItems = [
    { title: 'Arms', icon: <Crosshair />, desc: 'Help is selection of appropriate size of boxes/flyers. Minimize inventory & cost' },
    { title: 'Chemicals & poisons', icon: <Beaker />, desc: 'Optimize for the minimum strength required for box. Ensures safety of item' },
    { title: 'Fuels', icon: <Flame />, desc: 'Helps select appropriate box strength. Helps in optimizing the cushioning.' },
    { title: 'Certain types of machinery', icon: <Settings />, desc: 'Identifies the need for any special requirements for the protection of them' },
    { title: 'Toxins', icon: <Skull />, desc: 'Help is selection of appropriate size of boxes/flyers. Minimize inventory & cost' },
    // Updated icon here to Gem
    { title: 'Jewellery', icon: <Gem />, desc: 'Optimize for the minimum strength required for box. Ensures safety of item' },
    { title: 'Currency', icon: <PiggyBank />, desc: 'Helps select appropriate box strength. Helps in optimizing the cushioning.' },
    { title: 'Dry Ice', icon: <Box />, desc: 'Identifies the need for any special requirements for the protection of them' },
  ];

  return (
    <div className="mb-10 min-h-screen font-sans text-slate-800 ">
      {/* Header Tabs */}
      <h2 className="text-2xl font-bold mb-6 text-[#1a2b4b]">Terms & Conditions</h2>
      
      <div className="flex border-b border-gray-200 mb-5">
        {['Packaging Guidelines', 'Restricted Items', 'Terms & Conditions'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 text-sm font-semibold transition-all border-b-2 ${
              activeTab === tab 
              ? 'text-blue-600 border-blue-600' 
              : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content for Packaging Guidelines */}
      {activeTab === "Packaging Guidelines" && (
        <div className="animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            {topCards.map((card, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-slate-700">
                  {React.cloneElement(card.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#1a2b4b]">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {accordionItems.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-slate-700">{item}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openAccordion === idx ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === idx && (
                  <div className="p-4 pt-2 text-gray-600 text-sm border-t border-gray-50 bg-slate-50/50">
                    Detailed guidelines and requirements for {item} will be listed here to ensure proper shipping compliance.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content for Restricted Items */}
      {activeTab === "Restricted Items" && (
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-[#c5cadb] p-4 rounded-lg mb-5 border border-slate-300">
            <div className="bg-slate-200/50 p-1.5 rounded-full border border-slate-400">
              <Info className="w-4 h-4 text-[#1a2b4b]" />
            </div>
            <p className="text-[#1a2b4b] text-sm font-semibold">
              Shipping any of the following items with us may result in seizure, disposal, and hefty penalties for the clients or seller.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restrictedItems.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center text-[#e45d19]">
                    {React.cloneElement(item.icon, { size: 24, strokeWidth: 2.5 })}
                  </div>
                  <h3 className="font-bold text-lg text-[#1a2b4b] leading-tight">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content for General Terms & Conditions */}
      {activeTab === "Terms & Conditions" && (
        <div className="animate-in fade-in duration-300 bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-gray-600">
          <h3 className="text-xl font-bold text-[#1a2b4b] mb-4">General Service Terms</h3>
          <p className="mb-4">Standard terms and conditions regarding shipping liability, insurance, and delivery timelines.</p>
          <ul className="list-disc ml-5 space-y-2 text-sm">
            <li>All shipments must be declared accurately.</li>
            <li>Liability for lost items is capped at standard rates unless additional insurance is purchased.</li>
            <li>Prohibited items found in transit will be handed over to relevant authorities.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TermsAndConditionsPage;