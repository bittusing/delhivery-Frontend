import React, { useState } from 'react';
import {
  Ruler,
  ShoppingBag,
  Wine,
  Droplet,
  Info,
  Crosshair,
  Beaker,
  Flame,
  Settings,
  Skull,
  Gem,
  PiggyBank,
  Box,
  ChevronDown,
} from 'lucide-react';

/** Packaging & shipment standards — used on Packaging Guidelines and Terms & Conditions tabs */
const PACKAGING_SECTIONS = [
  {
    id: 'boxes',
    emoji: '📦',
    title: 'Selection of Boxes (Corrugated Packaging)',
    purpose:
      'Ensure product safety during transit while optimizing cost and weight.',
    guidelines: [
      'Use 3-ply corrugated boxes for lightweight items (<5 kg)',
      'Use 5-ply or higher for fragile or heavy items (>5 kg)',
      'Box size should match product dimensions (avoid empty space)',
      'Maintain at least 2–3 cm cushioning gap on all sides',
      'Use double-wall boxes for electronics, glass, or high-value goods',
    ],
    bestPractices: [
      'Avoid reusing damaged boxes',
      'Ensure proper sealing using BOPP tape (minimum 48 microns)',
    ],
    labelingIntro: 'Label boxes clearly with:',
    labelingItems: [
      'Shipping label',
      'Fragile sticker (if applicable)',
      'Orientation arrows',
    ],
  },
  {
    id: 'flyers',
    emoji: '🛍',
    title: 'Selection of Flyers / Polybags',
    purpose: 'Cost-effective packaging for non-fragile items.',
    guidelines: [
      'Use LDPE / HDPE polybags (50–70 microns) for durability',
    ],
    idealForTitle: 'Ideal for:',
    idealFor: ['Clothing', 'Documents', 'Soft goods'],
    mustBeTitle: 'Must be:',
    mustBe: ['Tamper-proof', 'Water-resistant', 'Tear-resistant'],
    securityRequirements: [
      'Self-sealing adhesive strip',
      'Tamper-evident closure',
      'Barcode-friendly surface',
    ],
  },
  {
    id: 'cushioning',
    emoji: '🧴',
    title: 'Cushioning & Void Fill Materials',
    purpose: 'Prevent movement and absorb shocks during shipping.',
    recommendedMaterials: [
      'Bubble wrap (small bubbles for light items, large for heavy)',
      'Air pillows',
      'Foam sheets',
      'Paper padding (eco-friendly option)',
    ],
    usageRules: [
      'Wrap fragile items individually',
      'Fill all empty spaces to prevent internal movement',
      'Avoid overpacking (increases cost)',
    ],
  },
  {
    id: 'fragile',
    emoji: '⚠️',
    title: 'Fragile & Special Item Handling',
    applicableFor: ['Glass items', 'Electronics', 'Liquids'],
    instructions: [
      'Use double packaging (inner + outer box)',
      'Add “FRAGILE” labels on all sides',
      'Use leak-proof containers for liquids',
      'Seal caps with tape to prevent leakage',
    ],
  },
  {
    id: 'weather',
    emoji: '🌧',
    title: 'Weather Protection',
    requirements: [
      'Use waterproof polybags or inner liners',
      'Seal all edges properly',
      'Avoid exposure to moisture-sensitive materials',
    ],
  },
  {
    id: 'weight',
    emoji: '📏',
    title: 'Weight & Dimension Compliance',
    limits: [
      'Max weight per box: 25 kg (or as defined by your logistics partner)',
      'Avoid oversized packaging (DIM weight charges apply)',
    ],
    formulaNote:
      'Volumetric weight (for carrier billing): Volumetric Weight = (L × W × H) / 5000 (dimensions in cm; divisor may vary by carrier).',
  },
  {
    id: 'tamper',
    emoji: '🔒',
    title: 'Tamper-Proof & Security Standards',
    securityStandards: [
      'Use tamper-evident seals',
      'Avoid transparent packaging for valuable goods',
      'Ensure label is not removable without damage',
    ],
  },
  {
    id: 'sustainable',
    emoji: '🌱',
    title: 'Sustainable Packaging (Optional)',
    sustainableItems: [
      'Use recyclable materials',
      'Avoid single-use plastics where possible',
      'Encourage minimal packaging',
    ],
  },
];

function PackagingSectionBody({ section }) {
  return (
    <div className="space-y-4 text-sm text-gray-600">
      {section.purpose && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">Purpose</p>
          <p className="leading-relaxed">{section.purpose}</p>
        </div>
      )}

      {section.guidelines?.length > 0 && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">Guidelines</p>
          <ul className="list-disc ml-5 space-y-1 leading-relaxed">
            {section.guidelines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.idealFor && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">
            {section.idealForTitle || 'Ideal for:'}
          </p>
          <ul className="list-disc ml-5 space-y-1">
            {section.idealFor.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.mustBe && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">
            {section.mustBeTitle || 'Must be:'}
          </p>
          <ul className="list-disc ml-5 space-y-1">
            {section.mustBe.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.securityRequirements && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">
            Security requirements
          </p>
          <ul className="list-disc ml-5 space-y-1">
            {section.securityRequirements.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.bestPractices?.length > 0 && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">Best practices</p>
          <ul className="list-disc ml-5 space-y-1">
            {section.bestPractices.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.labelingItems?.length > 0 && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">
            {section.labelingIntro || 'Labels'}
          </p>
          <ul className="list-[circle] ml-6 space-y-1">
            {section.labelingItems.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.recommendedMaterials && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">
            Recommended materials
          </p>
          <ul className="list-disc ml-5 space-y-1">
            {section.recommendedMaterials.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.usageRules && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">Usage rules</p>
          <ul className="list-disc ml-5 space-y-1">
            {section.usageRules.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.applicableFor && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">Applicable for</p>
          <ul className="list-disc ml-5 space-y-1">
            {section.applicableFor.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.instructions && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">Instructions</p>
          <ul className="list-disc ml-5 space-y-1">
            {section.instructions.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.requirements && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">Requirements</p>
          <ul className="list-disc ml-5 space-y-1">
            {section.requirements.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.limits && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">Limits</p>
          <ul className="list-disc ml-5 space-y-1">
            {section.limits.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.formulaNote && (
        <div>
          <p className="font-semibold text-slate-700 mb-1">
            Formula (reference)
          </p>
          <p className="leading-relaxed">{section.formulaNote}</p>
        </div>
      )}

      {section.securityStandards && (
        <div>
          <ul className="list-disc ml-5 space-y-1">
            {section.securityStandards.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}

      {section.sustainableItems && (
        <div>
          <ul className="list-disc ml-5 space-y-1">
            {section.sustainableItems.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function PackagingAccordions({ openSectionId, setOpenSectionId }) {
  return (
    <div className="space-y-3">
      {PACKAGING_SECTIONS.map((section, idx) => (
        <div
          key={section.id}
          className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-700"
        >
          <button
            type="button"
            onClick={() =>
              setOpenSectionId(
                openSectionId === section.id ? null : section.id
              )
            }
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors dark:hover:bg-slate-800"
          >
            <span className="font-medium text-slate-700 dark:text-slate-200 pr-2">
              <span className="mr-2" aria-hidden>
                {section.emoji}
              </span>
              {idx + 1}. {section.title.replace(/^\d+\.\s*/, '')}
            </span>
            <ChevronDown
              className={`w-5 h-5 shrink-0 transition-transform duration-200 text-slate-500 ${
                openSectionId === section.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSectionId === section.id && (
            <div className="p-4 pt-2 border-t border-gray-50 bg-slate-50/50 dark:bg-slate-800/50 dark:border-slate-700">
              <PackagingSectionBody section={section} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const TermsAndConditionsPage = () => {
  const [openSectionId, setOpenSectionId] = useState(null);
  const [activeTab, setActiveTab] = useState('Packaging Guidelines');

  const topCards = [
    {
      title: 'Dimensions',
      desc:
        'Helps selection of appropriate size of boxes/flyers. Minimize inventory & cost',
      icon: <Ruler />,
    },
    {
      title: 'Weight',
      desc:
        'Optimize for the minimum strength required for box. Ensures safety of item',
      icon: <ShoppingBag />,
    },
    {
      title: 'Fragility',
      desc:
        'Helps select appropriate box strength. Helps in optimizing the cushioning.',
      icon: <Wine />,
    },
    {
      title: 'Physical State',
      desc:
        'Identifies the need for any special requirements for the protection of them',
      icon: <Droplet />,
    },
  ];

  const restrictedItems = [
    {
      title: 'Arms',
      icon: <Crosshair />,
      desc:
        'Help is selection of appropriate size of boxes/flyers. Minimize inventory & cost',
    },
    {
      title: 'Chemicals & poisons',
      icon: <Beaker />,
      desc:
        'Optimize for the minimum strength required for box. Ensures safety of item',
    },
    {
      title: 'Fuels',
      icon: <Flame />,
      desc:
        'Helps select appropriate box strength. Helps in optimizing the cushioning.',
    },
    {
      title: 'Certain types of machinery',
      icon: <Settings />,
      desc:
        'Identifies the need for any special requirements for the protection of them',
    },
    {
      title: 'Toxins',
      icon: <Skull />,
      desc:
        'Help is selection of appropriate size of boxes/flyers. Minimize inventory & cost',
    },
    {
      title: 'Jewellery',
      icon: <Gem />,
      desc:
        'Optimize for the minimum strength required for box. Ensures safety of item',
    },
    {
      title: 'Currency',
      icon: <PiggyBank />,
      desc:
        'Helps select appropriate box strength. Helps in optimizing the cushioning.',
    },
    {
      title: 'Dry Ice',
      icon: <Box />,
      desc:
        'Identifies the need for any special requirements for the protection of them',
    },
  ];

  return (
    <div className="mb-10 min-h-screen font-sans text-slate-800 dark:text-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-[#1a2b4b] dark:text-slate-100">
        Terms & Conditions
      </h2>

      <div className="flex flex-wrap border-b border-gray-200 mb-5 dark:border-slate-700">
        {['Packaging Guidelines', 'Restricted Items', 'Terms & Conditions'].map(
          (tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === tab
                  ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {activeTab === 'Packaging Guidelines' && (
        <div className="animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            {topCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-slate-900 dark:border-slate-700"
              >
                <div className="bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {React.cloneElement(card.icon, { className: 'w-6 h-6' })}
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#1a2b4b] dark:text-slate-100">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed dark:text-slate-400">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <PackagingAccordions
            openSectionId={openSectionId}
            setOpenSectionId={setOpenSectionId}
          />
        </div>
      )}

      {activeTab === 'Restricted Items' && (
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center gap-3 bg-[#c5cadb] p-4 rounded-lg mb-5 border border-slate-300 dark:bg-slate-800 dark:border-slate-600">
            <div className="bg-slate-200/50 p-1.5 rounded-full border border-slate-400 dark:bg-slate-700 dark:border-slate-500">
              <Info className="w-4 h-4 text-[#1a2b4b] dark:text-slate-200" />
            </div>
            <p className="text-[#1a2b4b] text-sm font-semibold dark:text-slate-100">
              Shipping any of the following items with us may result in seizure,
              disposal, and hefty penalties for the clients or seller.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restrictedItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 dark:bg-slate-900 dark:border-slate-700"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center text-[#e45d19] dark:bg-orange-950/50 dark:border-orange-900">
                    {React.cloneElement(item.icon, {
                      size: 24,
                      strokeWidth: 2.5,
                    })}
                  </div>
                  <h3 className="font-bold text-lg text-[#1a2b4b] dark:text-slate-100 leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Terms & Conditions' && (
        <div className="animate-in fade-in duration-300 space-y-8">
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-gray-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300">
            <h3 className="text-xl font-bold text-[#1a2b4b] mb-4 dark:text-slate-100">
              General service terms
            </h3>
            <p className="mb-4">
              Standard terms and conditions regarding shipping liability,
              insurance, and delivery timelines.
            </p>
            <ul className="list-disc ml-5 space-y-2 text-sm">
              <li>All shipments must be declared accurately.</li>
              <li>
                Liability for lost items is capped at standard rates unless
                additional insurance is purchased.
              </li>
              <li>
                Prohibited items found in transit will be handed over to
                relevant authorities.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#1a2b4b] mb-2 dark:text-slate-100">
              Packaging & shipment standards
            </h3>
            <p className="text-sm text-gray-600 mb-4 dark:text-slate-400">
              By using our services, you agree to pack shipments according to
              the following standards. The same guidelines appear under
              Packaging Guidelines for reference.
            </p>
            <PackagingAccordions
              openSectionId={openSectionId}
              setOpenSectionId={setOpenSectionId}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsAndConditionsPage;
