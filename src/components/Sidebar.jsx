import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Sidebar.css";
import {
  anchor,
  fleet,
  Vessel,
  help,
  faq,
  anchor_day,
  fleet_day,
  Vessel_day,
  help_day,
  faq_day,
  left_arrow,
  right_arrow,
} from "../assets";

const Sidebar = ({ darkMode, showTargetList }) => {
  const [isOpen, setIsOpen] = useState(false);
 const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const images = [
    { name: "Vessel", path: Vessel },
    { name: "Anchor", path: anchor },
    { name: "System", path: fleet },
    { name: "Help", path: help },
    { name: "FAQ", path: faq },
  ];

  const imagesDay = [
    { name: "Vessel", path: Vessel_day },
    { name: "Anchor", path: anchor_day },
    { name: "System", path: fleet_day },
    { name: "Help", path: help_day },
    { name: "FAQ", path: faq_day },
  ];

  const handleClick = (index) => {
    console.log(`Clicked on image with index ${index}`);

    if (index === 0) {
      showTargetList();
      setIsOpen(true);
    }
  };

  const handleLogout = ()=>{
    navigate('/')
  }
  return (
    <div
      className={`sidebar ${isOpen ? "open" : "closed"} ${
        !darkMode ? "day" : ""
      }`}
    >
      <div className="logo-container">
        <img
          src={isOpen ? left_arrow : right_arrow}
          alt="Toggle"
          onClick={toggleSidebar}
        />
      </div>
      <div className="image-container">
        {(darkMode ? images : imagesDay).map((image, index) => (
          <div
            key={index}
            className={`image-item ${!darkMode ? "day" : ""}`}
            onClick={() => handleClick(index)}
          >
            <img src={image.path} alt={`Tag ${index + 1}`} />
            <span>{image.name}</span>
          </div>
        ))}
      </div>
      <div className="logout-btn" onClick={handleLogout}>
      </div>
    </div>
  );
};

export default Sidebar;
