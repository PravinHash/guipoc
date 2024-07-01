import React, { useState } from "react";
import WorldMap from "../components/WorldMap";
import PieControl from "../components/PieControl";
import Sidebar from "../components/Sidebar";
import OwnSystemPanel from "../components/OwnSystemPanel";
import TargetList from "../components/TargetList"
import SidebarN from "../components/SidebarN";
import { ResizablePIP } from "resizable-pip";

import {
  lightModeIcon,
  darkModeIcon,
  darkModeDarkIcon,
  lightModeDarkIcon,
} from "../assets";
import "../styles/Dashboard.css";
import SelectedAreaMap from "../components/SelectedAreaMap";
import Draggable from "react-draggable";
import { markers } from "../utils/Constant";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [circleMode, setCircleMode] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [targetList, setTargetList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const [newMarkers, setNewMarkers] = useState(markers);
const [restrectedArea, setRestricedArea] = useState(false);
const [showLabel, setShowLabel] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleCircleVisibility = () => {
    setCircleMode((prevMode) => !prevMode);
  };

  const handleSelectedArea = (area) => {
    setSelectedArea(area);
  };

  const handleClose = () => {
    setBounds(null);
  };

  const toggleTargetList = () => {
    setTargetList((prevMode) => !prevMode);
  };

  return (
    <>
      {/* <Sidebar darkMode={darkMode} showTargetList={toggleTargetList}/> */}
      <SidebarN darkMode={darkMode} />
      <TargetList targetList={targetList} darkMode={darkMode}/>
      <div className="dashboard">
        <div className="resizable-PIP">
          {bounds && (
            <div>
            <ResizablePIP
            width={795}
            height={455}
            minConstraints={[300, 300]}
            maxConstraints={[800, 800]}
          >
            <svg width="100%" height="100%" viewBox="0 0 793 451" fill="none">
            <path d="M34.5 338.5V54.5H703.5H757.5V112V397H310H306H216H93.5H34.5V338.5Z" stroke="#6B5B95" stroke-width="2"/>
            <path d="M626 33.0396H712.452L730 4H643.482L626 33.0396Z" fill="#F2FF61" fill-opacity="0.3" onClick={handleClose} cursor="pointer"/>
            <path d="M712.452 33.0396H777.791V416H292.5H231H82.6542H15.5V348.846V33.0396H349.5M712.452 33.0396H626M712.452 33.0396L730 4H643.482M626 33.0396L643.482 4M626 33.0396H349.5M643.482 4H372L349.5 33.0396" stroke={darkMode ? "#CF7AD1" :"#F2FF61"} stroke-width="7.25991"/>
            <path d="M376 10H581L570.5 27.5H362.5L376 10Z" fill={darkMode ? "#2ADFD3":"#6B5B95" } stroke="#6B5B95"/>
            <path d="M659 19L684 19" stroke="black" stroke-width="4"/>
            <path d="M733 21.5H791V256M718 430H791V392.5" stroke={darkMode ? "#2ADFD3":"#6B5B95" } stroke-width="4"/>
            <path d="M43.5 18.5H2V101" stroke={darkMode ? "#2ADFD3":"#6B5B95" } stroke-width="4"/>

            <g id="map-object">
             <foreignObject
                  x="35"
                  y="55"
                  width="720"
                  height="340"
                  style={{ overflow: "hidden" }}
                >
                  <div>
                    {/* <ResizablePIP
                      width={700}
                      height={340}
                      minConstraints={[300, 300]}
                      maxConstraints={[800, 800]}
                    > */}
                      {bounds && (
                        <SelectedAreaMap
                          darkMode={darkMode}
                          circleMode={circleMode}
                          bounds={bounds}
                          markers={newMarkers}
                        />
                      )}
                    {/* </ResizablePIP> */}

                  </div>
                </foreignObject>
              </g>
            </svg>
        </ResizablePIP>
        </div>
          )}
        </div>
        <OwnSystemPanel darkMode={darkMode} />
        <div
          className={`theme-controller ${darkMode ? "" : "day"}`}
          onClick={toggleDarkMode}
        >
          <div className="theme">
            <img
              src={darkMode ? lightModeDarkIcon : lightModeIcon}
              alt="Toggle Icon"
            />
          </div>
          <div className="theme">
            <img
              src={darkMode ? darkModeDarkIcon : darkModeIcon}
              alt="Toggle Icon"
            />
          </div>
        </div>
        <WorldMap
          darkMode={darkMode}
          circleMode={circleMode}
          setBounds={setBounds}
          setNewMarkers={setNewMarkers}
          restrectedArea={restrectedArea}
          showLabel={showLabel}
        />
        <PieControl onItem5Click={toggleCircleVisibility} darkMode={darkMode} restrectedArea={restrectedArea} setRestricedArea={setRestricedArea} showLabel={showLabel} setShowLabel={setShowLabel} />
      </div>
    </>
  );
};

export default Dashboard;
