import React from "react";

const navItems = [
  "Notebooks",
  "Trophies",
  "Door Signs",
  "Pens",
  "Diaries",
  "Calendars",
  "Stickers",
  "Business Cards",
  "Fliers",
  "Flask disk",
  "Notepad",
  "Keyholders",
];
const BelowNav = () => {
  return (
    <div className="bg-[#4335A7] py-1">
      <div className="container w-full mx-auto px-4">
        <div className="text-center text-base text-gray-800">
          {navItems.map((item, index) => (
            <button className="px-4 py-2 cursor-pointer text-white font-semibold hover:bg-[#80C4E9] rounded-md">
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BelowNav;
