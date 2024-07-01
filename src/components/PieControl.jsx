import React, { useState, useEffect } from "react";
import "../styles/PieControl.css"; // Adjust the path based on your file structure
import {
  clock_icon,
  zoomin_icon,
  zoomout_icon,
  setting_icon,
  measure_icon,
  clock_icon_day,
  zoomin_icon_day,
  zoomout_icon_day,
  setting_icon_day,
  measure_icon_day,
  setting_gear,
  setting_gear_day,
  pie_r,
  pie_l,
  pie_r_day,
  pie_l_day,
  minimize_icon_day,
  minimize_icon_night,
  target_icon_day ,
  target_icon_night ,
  depth_scale_icon_day ,
  depth_scale_icon_night ,
  label_day,
  label_night,
} from "../assets";
import Draggable from "react-draggable";
import PieMenu, { Slice } from "react-pie-menu";

const PieControl = ({ onItem5Click, darkMode, restrectedArea ,setRestricedArea, showLabel, setShowLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.querySelector(".pie-btn").classList.toggle("rotate");

    // Add or remove the 'animate' class to trigger the animation
    const items = document.querySelectorAll(".pie-item");
    items.forEach((item, index) => {
      item.classList.toggle("animate", isOpen);
    });
  };

  const handleItemClick = () => {
    // Implement your logic for item click
    console.log(`Clicked Slice`);
    onItem5Click(); // Step 3
  };

  const handleRestrictedArea=()=>{
    setRestricedArea(!restrectedArea);
    console.log(`Restricted Area`)
  }
  const handleLabelShow=()=>{
    console.log("Label show")
    setShowLabel(!showLabel);
  }
  useEffect(()=>{
    setIsOpen(false)
  }, [darkMode])
  return (
    <Draggable>
      <div className="pie-control">
        <div className="pie-menu">
          {isOpen && (
            <PieMenu
              radius="150px"
              centerRadius="80px"
              centerX={0}
              centerY={0}
              className={`inner-pie-menu ${!darkMode ? "day-pie" : ""}`}
            >
              <Slice backgroundColor="transparent">
                <img src={darkMode ? clock_icon : clock_icon_day} alt="" />
              </Slice>
              <Slice backgroundColor="transparent">
                <img src={darkMode ? target_icon_night : target_icon_day} alt=""/>
              </Slice>
              <Slice backgroundColor="transparent">
                <img src={darkMode ? zoomin_icon : zoomin_icon_day} alt="" />
              </Slice>
              <Slice backgroundColor="transparent">
                <img src={darkMode ? zoomout_icon : zoomout_icon_day} alt="" />
              </Slice>
              <Slice backgroundColor="transparent">
                <img src={darkMode ? setting_icon : setting_icon_day} alt="" />
              </Slice>
              <Slice backgroundColor="transparent" onSelect={handleItemClick}>
                <img src={darkMode ? measure_icon : measure_icon_day} alt="" />
              </Slice>
              <Slice backgroundColor="transparent">
                <img src={darkMode ? minimize_icon_night : minimize_icon_day} alt="" onClick={handleRestrictedArea}/>
              </Slice>
              <Slice backgroundColor="transparent">
                <img src={darkMode ?   label_night : label_day} alt="" onClick={handleLabelShow} />
              </Slice>
            </PieMenu>
          )}
        </div>
        <div
          className={`pie-btn ${!darkMode ? "day-pie" : ""} ${
            !darkMode ? "pie-day" : ""
          }`}
          onClick={toggleMenu}
        >
          <img src={darkMode ? setting_gear : setting_gear_day} alt="" />
        </div>
        <img
          className={`pie-r ${isOpen ? "open" : ""}`}
          src={darkMode ? pie_r : pie_r_day}
          alt=""
          srcset=""
        />
        <img
          className={`pie-l ${isOpen ? "open" : ""}`}
          src={darkMode ? pie_l : pie_l_day}
          alt=""
          srcset=""
        />
      </div>
    </Draggable>
  );
};

export default PieControl;
