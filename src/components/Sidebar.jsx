import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useShippingMode } from "../context/ShippingModeContext";

const toPath = (label) =>
  `/${label
    .toLowerCase()
    .replace(/\s*&\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")}`;

const Sidebar = ({ isSidebarOpen }) => {
  const { shippingMode, SHIPPING_MODES } = useShippingMode();
  const [isActiveMenu, setIsActiveMenu] = useState(null);
  const [subactiveItem, setSubactiveItem] = useState("");

  const navItems = useMemo(() => {
    const isInternational = shippingMode === SHIPPING_MODES.INTERNATIONAL;
    return [
      { label: "Dashboard", icon: "fa-solid_home", icon2: "fa-solid_home-1" },
      {
        label: "Orders & Pickups",
        icon: "package",
        icon2: "package-1",
        subMenu: isInternational ? [
          { label: "International Orders", path: "/international-orders" },
          { label: "Pickup Requests", path: "/pickup-requests" },
        ] : [
          { label: "Create Order", path: "/create-order" },
          { label: "Forward Orders", path: "/forward-orders" },
          { label: "Reserve Orders", path: "/reserve-orders" },
          { label: "Pickup Requests", path: "/pickup-requests" },
          { label: "All Orders", path: "/orders" },
        ],
      },
      { label: "Direct Intracity Orders", icon: "danger", icon2: "danger-1" },
      {
        label: "Finances",
        icon: "money",
        icon2: "money-1",
        subMenu: isInternational ? [
          { label: "Wallet", path: "/wallet" },
          { label: "Invoices", path: "/invoices" },
          { label: "Lost & Damaged Claims", path: "/claims" },
        ] : [
          { label: "Wallet", path: "/wallet" },
          { label: "Remittances", path: "/remittances" },
          { label: "Invoices", path: "/invoices" },
          { label: "Lost & Damaged Claims", path: "/claims" },
        ],
      },
      { label: "Support", icon: "help-desk", icon2: "help-desk-1", path: "/support" },
      {
        label: "Information Center",
        icon: "info",
        icon2: "info-1",
        subMenu: isInternational ? [
          { label: "Rate Calculator", path: "/rate-calculator" },
        ] : [
          { label: "Rate Calculator", path: "/rate-calculator" },
          { label: "Rate Card", path: "/rate-card" },
          { label: "Pincode Serviceability", path: "/pincode-serviceability" },
          { label: "Packaging Guide", path: "/packaging-guide" },
          { label: "Restricted Items", path: "/restricted-items" },
          { label: "Terms & Conditions", path: "/terms-conditions" },
          { label: "Fetch AWB Numbers", path: "/fetch-awb-numbers" },
        ],
      },
      { label: "Services", icon: "jigsaw", icon2: "jigsaw-1" },
      { label: "Settings", icon: "setting", icon2: "setting-1" },
    ];
  }, [shippingMode, SHIPPING_MODES]);

  const handleItemClick = (label, hasSubMenu, e) => {
    if (hasSubMenu) {
      e?.preventDefault();
      setIsActiveMenu((prevActiveMenu) =>
        prevActiveMenu === label ? null : label
      );
    } else {
      setIsActiveMenu(label);
      setSubactiveItem("");
    }
  };

  const handleSubItemClick = (subLabel) => {
    setSubactiveItem(subLabel);
  };

  const sidebarWidthClass = isSidebarOpen ? "w-[150px] lg:w-44 xl:w-64" : " w-14 xl:w-20";
  const contentVisibilityClass = isSidebarOpen ? "block" : "hidden";
  const sideItemWodth = isSidebarOpen ? "px-[5px] xl:px-4" : " px-0";

  return (
    <aside
      className={`static inset-y-0 left-0 z-40 min-h-screen transform transition-all duration-300 bg-[#131842] bg-bottom bg-no-repeat text-white shadow-lg px-2 xl:px-4 py-6 xl:py-10 ${sidebarWidthClass}`}
      style={{ backgroundImage: `url('/images/bg-side.png')` }}
    >
      <div>
        <div className="flex items-center gap-3 mb-7 justify-between">
          {isSidebarOpen ? (
            <img src="/images/logo.png" alt="logo" className="w-2/3 xl:w-auto " />
          ) : (
            <img src="/images/mini-logo.png" alt="logo" className="m-auto " />
          )}
        </div>

        <nav className="space-y-2">
          {navItems.map(({ label, icon, icon2, subMenu, path }) => {
            const isMenuActive = isActiveMenu === label;
            const hasSubMenu = !!subMenu;
            const menuPath = path || toPath(label);
            const itemClasses = isMenuActive
              ? "bg-white text-[#131842] font-semibold"
              : "hover:bg-white/10 text-white font-medium";

            return (
              <div key={label}>
                {hasSubMenu ? (
                  <div
                    onClick={(e) => handleItemClick(label, hasSubMenu, e)}
                    className={`py-2 xl:py-3 rounded-lg transition-colors ${itemClasses} ${sideItemWodth} cursor-pointer block`}
                  >
                    <div className="flex items-center justify-center gap-[5px] xl:gap-3">
                      {
                        isMenuActive ? (
                          <img src={`/images/icon/${icon}.png`} alt={label} />
                        ) : (
                          <img src={`/images/icon/${icon2}.png`} alt={label} />
                        )
                      }

                      <div className={`${contentVisibilityClass} flex items-center justify-between flex-grow`}>
                        <span className={`text-xs xl:text-sm`}>{label}</span>
                        {hasSubMenu && (
                          <span
                            className={`text-xl leading-3 transition duration-300 ease-in-out ${isMenuActive ? "rotate-90" : "rotate-0"
                              }`}
                          >
                            ›
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={menuPath}
                    onClick={() => handleItemClick(label, hasSubMenu)}
                    className={`py-2 xl:py-3 rounded-lg transition-colors ${itemClasses} ${sideItemWodth} cursor-pointer block`}
                  >
                    <div className="flex items-center justify-center gap-[5px] xl:gap-3">
                      {
                        isMenuActive ? (
                          <img src={`/images/icon/${icon}.png`} alt={label} />
                        ) : (
                          <img src={`/images/icon/${icon2}.png`} alt={label} />
                        )
                      }

                      <div className={`${contentVisibilityClass} flex items-center justify-between flex-grow`}>
                        <span className={`text-xs xl:text-sm`}>{label}</span>
                      </div>
                    </div>
                  </NavLink>
                )}

                {/* --- Submenu (Conditional Rendering) --- */}
                {hasSubMenu && isMenuActive && isSidebarOpen && (
                  <div className="pt-2 pl-1 lg:pl-4 space-y-1">
                    {subMenu.map((subItem) => {
                      const isSubActive = subItem.label === subactiveItem;
                      // Use custom path if provided, otherwise generate from label
                      const subPath = subItem.path || toPath(subItem.label);
                      const subitemClasses = isSubActive
                        ? "bg-[#404c7d] text-white font-semibold"
                        : "hover:bg-[#404c7d]/50 text-white font-medium";
                      return (
                        <NavLink
                          to={subPath}
                          key={subItem.label}
                          onClick={() => handleSubItemClick(subItem.label)}
                          className={`flex items-center gap-1 lg:gap-2 py-2 px-1 lg:px-2 xl:px-6 rounded-lg cursor-pointer text-xs xl:text-sm transition duration-300 ease-in-out ${subitemClasses}`}
                        >
                          {isSubActive && (
                            <span className="text-xl leading-none">•</span>
                          )}
                          <span>{subItem.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
