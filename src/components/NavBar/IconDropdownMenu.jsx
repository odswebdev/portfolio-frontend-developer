import React, { useState } from "react";
import { FaTh, FaDesktop } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { layouts } from "../constans/data";

const IconDropdownMenu = ({ onLayoutChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLayoutChange = (layout) => {
    console.log("Выбран макет:", layout);
    onLayoutChange(layout);
    setIsOpen(false);
  };

  return (
    <div className="icon__ddmenu-container">
      <button
        onClick={toggleDropdown}
        className="icon__ddmenu-btn"
        aria-label="Open layout menu"
      >
        <FiMoreHorizontal className="icon__ddmenu-item" />
      </button>
      {isOpen && (
        <ul className="icon__ddmenu-layoutlist">
          {layouts.map((layout) => (
            <li
              key={layout.id}
              onClick={() => handleLayoutChange(layout)}
              className="icon__ddmenu-layoutitem"
            >
              {layout.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IconDropdownMenu;
