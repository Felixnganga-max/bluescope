import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

const navItems = [
  {
    name: "Notebooks",
    subsections: [
      {
        name: "Spiral Notebooks",
        items: ["College Rule", "Wide Rule", "Graph Paper"],
      },
      {
        name: "Composition Books",
        items: ["Standard", "Premium", "Leather Bound"],
      },
      { name: "Legal Pads", items: ["Yellow", "White", "Pink"] },
    ],
  },
  {
    name: "Trophies",
    subsections: [
      { name: "Academic", items: ["Medal Sets", "Plaques", "Cups"] },
      { name: "Sports", items: ["Football", "Basketball", "Athletics"] },
      { name: "Corporate", items: ["Achievement", "Recognition", "Service"] },
    ],
  },
  {
    name: "Door Signs",
    subsections: [
      {
        name: "Office",
        items: ["Name Plates", "Department Signs", "Direction Signs"],
      },
      {
        name: "Residential",
        items: ["House Numbers", "Welcome Signs", "Custom Signs"],
      },
    ],
  },
  {
    name: "Pens",
    subsections: [
      { name: "Ballpoint", items: ["Economy", "Premium", "Luxury"] },
      { name: "Fountain", items: ["Starter", "Professional", "Collector"] },
      { name: "Markers", items: ["Permanent", "Whiteboard", "Highlighters"] },
    ],
  },
  {
    name: "Mugs",
    subsections: [
      { name: "Ceramic", items: ["Classic White", "Color Change", "Two-Tone"] },
      {
        name: "Travel",
        items: ["Thermal", "Stainless Steel", "Sports Bottle"],
      },
      { name: "Custom", items: ["Photo Mugs", "Text Design", "Logo Print"] },
    ],
  },
  {
    name: "Bags",
    subsections: [
      { name: "Backpacks", items: ["School", "Laptop", "Travel"] },
      { name: "Tote Bags", items: ["Canvas", "Leather", "Eco-Friendly"] },
      { name: "Gift Bags", items: ["Paper", "Fabric", "Luxury"] },
    ],
  },
  {
    name: "Clothes",
    subsections: [
      {
        name: "Corporate Wear",
        items: ["Polo Shirts", "Button-Downs", "Blazers"],
      },
      { name: "Uniforms", items: ["School", "Sports", "Work"] },
      { name: "Accessories", items: ["Caps", "Scarves", "Ties"] },
    ],
  },
  {
    name: "Hoodies",
    subsections: [
      {
        name: "Pullover",
        items: ["Classic", "Graphic Print", "Custom Design"],
      },
      { name: "Zip-Up", items: ["Full-Zip", "Quarter-Zip", "Sport"] },
      { name: "Material", items: ["Cotton", "Fleece", "Premium Blend"] },
    ],
  },
  {
    name: "T-Shirts",
    subsections: [
      { name: "Casual", items: ["Round Neck", "V-Neck", "Polo Style"] },
      {
        name: "Custom Print",
        items: ["Digital Print", "Screen Print", "Embroidery"],
      },
      { name: "Special", items: ["Sports", "Event", "Promotional"] },
    ],
  },
];

const BelowNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setActiveItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-16 bg-[#4335A7] py-1 z-50">
      <div className="container mx-auto px-4">
        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-between items-center">
          <button onClick={toggleMenu} className="text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 text-white p-2"
          >
            <span>All Categories</span>
            {isDropdownOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </button>
        </div>

        {/* Desktop and Mobile Menu */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} md:block`}
          ref={dropdownRef}
        >
          <div className="text-center text-base flex flex-col md:flex-row md:flex-wrap md:justify-center md:items-center">
            {/* All Categories Dropdown */}
            <div className="relative group">
              <button
                onClick={toggleDropdown}
                className="px-4 py-2 cursor-pointer text-white font-semibold hover:bg-[#80C4E9] rounded-md flex items-center space-x-2"
              >
                <span>All Categories</span>
                {isDropdownOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {/* Mega Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-1 w-screen max-w-4xl bg-white rounded-md shadow-lg z-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {navItems.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <h3 className="font-bold text-gray-800">
                        {category.name}
                      </h3>
                      {category.subsections.map((subsection) => (
                        <div key={subsection.name} className="pl-4">
                          <div className="font-semibold text-gray-700 flex items-center gap-2">
                            <ChevronRight size={16} />
                            {subsection.name}
                          </div>
                          <ul className="pl-6 text-sm text-gray-600">
                            {subsection.items.map((item) => (
                              <li
                                key={item}
                                className="hover:text-[#4335A7] cursor-pointer"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Main Navigation Items */}
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <button className="px-4 py-2 cursor-pointer text-white font-semibold hover:bg-[#80C4E9] rounded-md whitespace-nowrap">
                  {item.name}
                </button>

                {/* Dropdown for each nav item */}
                {activeItem === item.name && (
                  <div className="absolute left-0 mt-1 w-64 bg-white rounded-md shadow-lg z-50 p-4">
                    {item.subsections.map((subsection) => (
                      <div key={subsection.name} className="mb-3">
                        <h4 className="font-semibold text-gray-800">
                          {subsection.name}
                        </h4>
                        <ul className="pl-4 mt-1">
                          {subsection.items.map((subItem) => (
                            <li
                              key={subItem}
                              className="text-gray-600 hover:text-[#4335A7] cursor-pointer py-1"
                            >
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BelowNav;
