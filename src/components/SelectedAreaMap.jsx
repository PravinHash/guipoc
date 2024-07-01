import React, { useRef, useState, useEffect } from "react";
import "../styles/WorldMap.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Rectangle,
  useMap,
  Polyline,
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { PieChart } from "react-minimal-pie-chart";
import {
  placeholder,
  enemy_target,
  friendly_target,
  neutral_target,
  own_system,
  port,
  own_system_day,
  blue_surface,
  green_surface,
  cargo_img,
  submarine,
  warship,
} from "../assets";

import 'leaflet-rotatedmarker'
// import { markers } from "../utils/Constant";



const SelectedAreaMap = ({ darkMode, circleMode, bounds, markers }) => {
  const markerRefs = useRef([]);
  const [isCircleVisible, setCircleVisibility] = useState(false);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(5);
  const [shipInfo, setShipInfo] = useState(null);
  const [markersInit, setMarkersInit] = useState(markers);
  const [shipTexts, setShipTexts] = useState([]);
  const [isVisible, setIsVisible] = useState([]);

  useEffect(() => {
    if (bounds) {
      const [lat1, lng1, lat2, lng2] = bounds.split(",").map(parseFloat);
      const centerLat = (lat1 + lat2) / 2;
      const centerLng = (lng1 + lng2) / 2;
      const boundsWidth = Math.abs(lng1 - lng2);
      const boundsHeight = Math.abs(lat1 - lat2);
      const maxBound = Math.max(boundsWidth, boundsHeight);
      const zoomLevel = Math.floor(Math.log2(360 / (maxBound * 512)));

      setMapCenter([centerLng, centerLat]);
      setMapZoom(zoomLevel);
    }
  }, [bounds]);

  const getImage = (condition) => {
    if (condition === 5) {
      return cargo_img;
    } else if (condition === 3) {
      return submarine;
    } else if (condition === 4 || condition === 1 || condition === 2) {
      return warship;
    } else {
      return cargo_img;
    }
  };

  const createEventHandlers = (index) => {
    return {
      click() {
        const markerRef = markerRefs.current[index];
        if (markerRef) {
          markerRef.openPopup();
        }
      },
    };
  };

  
const getIconUrl = (type, mode) => {
  switch (type) {
    case "own_system":
      return mode  ? own_system : own_system_day;
    case "friendly_target":
      return mode ? friendly_target : friendly_target;
    case "enemy_target":
      return mode  ? enemy_target : enemy_target;
    case "neutral_target":
      return mode  ? neutral_target : neutral_target;
    case "port":
      return mode  ? port : port;
    case "cargo":
      return mode  ? blue_surface : blue_surface;
    default:
      return placeholder;
  }
};

const getIconSize = (type) => {
  switch (type) {
    case "own_system":
    case "friendly_target":
      return [20, 50];
    case "enemy_target":
      return [20, 50];
    case "neutral_target":
      return [20, 50];
    case "port":
      return [20, 50];
    case "cargo":
      return [20, 50];
    case "green_surface":
       return [20, 50];
    default:
      return [20, 50];
  }
};


const customIcon = (type, mode) => {
  return new Icon({
    iconUrl: getIconUrl(type, mode),
    iconSize: getIconSize(type),
  });
};

const createClusterCustomIcon = function (cluster, mode) {
  const targetType = cluster.getAllChildMarkers()[0].options.targetType;

  let iconUrl;
  switch (targetType) {
    case 0:
      iconUrl = mode === "dark" ? own_system : own_system;
      break;
    case 1:
      iconUrl = mode === "dark" ? friendly_target : friendly_target;
      break;
    case 2:
      iconUrl = mode === "dark" ? enemy_target : enemy_target;
      break;
    case 3:
      iconUrl = mode === "dark" ? neutral_target : neutral_target;
      break;
    case 4:
      iconUrl = mode === "dark" ? green_surface : green_surface;
      break;
    case 5:
      iconUrl = mode === "dark" ? blue_surface : blue_surface;
      break;
    default:
      iconUrl = placeholder;
  }

  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
    iconUrl: iconUrl,
  });
};

function ChangeMapView({ coords }) {
  const map = useMap();
  const [lat1, lng1, lat2, lng2] = coords.split(",").map(parseFloat);
  const bounds = [
    [lng2, lat2],
    [lng1, lat1],
  ];
  console.log(bounds);
  map.flyToBounds(bounds);

  return null;
}
const handleMarkerClick = (index) => {
  const markerRef = markerRefs.current[index];
  setShipInfo(null);
  if (markerRef) {
    markerRef.openPopup();
  }
};
  const setInfo = (index) => {
    if (index >= 0 && index < markersInit.length) {
      // Update shipInfo for the clicked marker index
      setShipInfo(markersInit[index].info);
      // setShowInfo(true);
      // Generate shipTexts for the clicked marker index
      const {
        Name = "",
        Callsign = "",
        Destination = "",
        Heading = "",
        Speed = "",
        Type = "",
        Status = "",
      } = markersInit[index].info || {};
      const shipTexts = [
        `Name: ${Name}`,
        `Callsign: ${Callsign}`,
        `Destination: ${Destination}`,
        `Heading: ${Heading}`,
        `Speed: ${Speed}`,
        `Ship Type: ${Type}`,
        `Status: ${Status}`,
      ];
      setShipTexts(shipTexts);
      const markerRef = markerRefs.current[index];
      if (markerRef) {
        markerRef.openPopup();
      }
      console.log("ship info of ", markersInit[index].info);
    } else {
      console.log("Invalid marker index:", index);
    }
  };
  // const pieData = [
  //   { value: 10, key: 1, color: "#000000", img: port },
  //   { value: 10, key: 2, color: "#000000", img: port },
  //   { value: 10, key: 3, color: "#000000", img: port },
  //   { value: 10, key: 4, color: "#000000", img: port },
  //   { value: 10, key: 5, color: "#000000", img: port },
  //   { value: 10, key: 6, color: "#000000", img: port },
  // ];
  // (lat1 + lat2) / 2, (lng1 + lng2) / 2

  const ownSystemMarker = markers.find((marker) => marker.popUp === "Own System");
  const ownSystemCenter = ownSystemMarker.geocode ;
  const ownSystemRadius = 700000; 
  function calculateDistance(point1, point2) {
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;
  
    const earthRadiusKm = 6371;
  
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadiusKm * c;
  
    return distance;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  useEffect(() => {
    const visibilityArray = markersInit.map((mark) => {
      const distance = calculateDistance(mark.geocode, ownSystemCenter);
      return distance * 1000 <= ownSystemRadius;
    });

    setIsVisible(visibilityArray);
  }, [markersInit, ownSystemCenter, ownSystemRadius]);
  return (
    <div className={`world-map-container ${darkMode ? "dark" : "light"}`}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />

        {markers.map((marker, index) => {
          const distance = calculateDistance(marker.geocode, ownSystemCenter);
          const isVisible = distance * 1000 <= ownSystemRadius;
          
          return isVisible  ? (
          <MarkerClusterGroup
            key={index}
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
          >
            {/* <Marker
              ref={(ref) => (markerRefs.current[index] = ref)}
              position={marker.geocode}
              icon={customIcon(getMarkerType(marker.targetType), darkMode)}
              eventHandlers={createEventHandlers(index)}
            >
              <Popup className="map-popup">
                <PieChart
                  data={pieData}
                  animate
                  animationDuration={500}
                  animationEasing="ease-out"
                  center={[50, 50]}
                  label={({ dataEntry }) => dataEntry.value}
                  labelPosition={80}
                  labelStyle={{
                    fontSize: "10px",
                    fontFamily: "sans-serif",
                    fill: "#ffffff",
                    fontWeight: "bold",
                  }}
                  lengthAngle={360}
                  lineWidth={40}
                  paddingAngle={8}
                  radius={50}
                  startAngle={0}
                  viewBoxSize={[100, 100]}
                />
              </Popup>
            </Marker> */}
            <Marker
              ref={(ref) => (markerRefs.current[index] = ref)}
              position={marker.geocode}
              icon={customIcon(getMarkerType(marker.targetType), darkMode)}
              eventHandlers={{
                click: () => handleMarkerClick(index),
              }}
              rotationAngle={marker.info.Heading}
              rotationOrigin="center"
            >
              {shipInfo === null && marker.targetType != 0 ? (
                <Popup className="map-popup">
                  <div className="hexagon-menu">
                    <svg
                      width="579"
                      height="383"
                      viewBox="0 0 579 383"
                      fill="none"
                    >
                      <set
                        attributeName="fill"
                        to="white"
                        begin="info-box.mouseover"
                        end="info-box.mouseout"
                      />
                      <path
                        d="M90.4889 191.136L147 158.614L203.511 191.136V256.172L147 288.694L90.4889 256.172V191.136Z"
                        stroke={darkMode ? "#2ADFD3" : "#F2FF61"}
                        strokeWidth="2.57518"
                      />
                      <path
                        d="M155.356 94.8871L219.402 97.1052L253.346 151.462L210.658 182.561L149.767 147.406L155.356 94.8871Z"
                        fill="#154665"
                        fillOpacity="0.35"
                        stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                        strokeWidth="2.57518"
                      />
                      <path
                        d="M39.1987 152.503L74.1961 97.5247L139.307 94.7052L144.502 147.445L82.2756 183.372L39.1987 152.503Z"
                        fill="#154665"
                        fillOpacity="0.35"
                        stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                        strokeWidth="2.57518"
                        id="info-box"
                      />
                      <path
                        d="M262.425 163.652L292.554 222.581L262.425 281.51L214.151 259.22L214.151 185.942L262.425 163.652Z"
                        fill="#154665"
                        fillOpacity="0.35"
                        stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                        strokeWidth="2.57518"
                      />
                      <path
                        d="M254.94 294.623L219.821 349.673L154.586 352.562L149.437 299.796L211.818 263.781L254.94 294.623Z"
                        fill="#154665"
                        fillOpacity="0.35"
                        stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                        strokeWidth="2.57518"
                      />
                      <path
                        d="M139.482 352.464L74.1347 349.511L38.9034 294.395L82.0667 263.577L144.59 299.674L139.482 352.464Z"
                        fill="#154665"
                        fillOpacity="0.35"
                        stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                        strokeWidth="2.57518"
                      />
                      <path
                        d="M31.5689 281.169L1.45342 223.654L31.5689 166.139L79.8488 187.906L79.8488 259.402L31.5689 281.169Z"
                        fill="#154665"
                        fillOpacity="0.35"
                        stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                        strokeWidth="2.57518"
                      />
                      <path
                        d="M136.485 159.489L147 153.695L165.455 163.996"
                        stroke={darkMode ? "#2ADFD3" : "#6B5B93"}
                        strokeWidth="3.43358"
                      />
                      <path
                        d="M86.2383 198.975L86.2382 188.76L104.724 178.159"
                        stroke={darkMode ? "#2ADFD3" : "#6B5B93"}
                        strokeWidth="3.43358"
                      />
                      <path
                        d="M105.582 269.792L86.596 258.739L86.596 246.187"
                        stroke={darkMode ? "#2ADFD3" : "#6B5B93"}
                        strokeWidth="3.43358"
                      />
                      <path
                        d="M165.886 283.313L146.821 294.229L123.18 280.308"
                        stroke={darkMode ? "#2ADFD3" : "#6B5B93"}
                        strokeWidth="3.43358"
                      />
                      <path
                        d="M207.916 240.392L207.916 258.7L189.425 269.376"
                        stroke={darkMode ? "#2ADFD3" : "#6B5B93"}
                        strokeWidth="3.43358"
                      />
                      <path
                        d="M188.847 177.179L207.833 188.232L207.833 202.838"
                        stroke={darkMode ? "#2ADFD3" : "#6B5B93"}
                        strokeWidth="3.43358"
                      />
                      <g filter="url(#filter0_d_9_69)">
                        <rect
                          x="179.292"
                          y="120.747"
                          width="34.3068"
                          height="34.3068"
                          rx="17.1534"
                          fill={darkMode ? "#2ADFD3" : "#6B5B93"}
                          shape-rendering="crispEdges"
                        />
                        <path
                          d="M197.535 137.037L192.568 137.037"
                          stroke="black"
                          strokeWidth="0.941945"
                          stroke-linecap="round"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M184.189 140.314C184.189 140.819 184.595 141.225 185.408 142.038L192.307 148.937C193.12 149.75 193.527 150.157 194.032 150.157C194.537 150.157 194.944 149.75 195.757 148.937L204.259 140.435C205.163 139.531 205.614 139.079 205.792 138.494C205.969 137.909 205.844 137.282 205.593 136.029L205.018 133.154C204.709 131.608 204.554 130.836 204.032 130.313C203.51 129.791 202.737 129.636 201.191 129.327L198.317 128.752C197.064 128.502 196.437 128.376 195.851 128.554C195.266 128.731 194.814 129.183 193.911 130.086L185.408 138.589C184.595 139.402 184.189 139.808 184.189 140.314ZM200.931 136.864C201.883 135.911 201.883 134.367 200.931 133.415C199.978 132.462 198.434 132.462 197.481 133.415C196.529 134.367 196.529 135.911 197.481 136.864C198.434 137.817 199.978 137.817 200.931 136.864Z"
                          fill={darkMode ? "black" : "white"}
                        />
                        <path
                          d="M200.931 136.864C201.883 135.911 201.883 134.367 200.931 133.415C199.978 132.462 198.434 132.462 197.481 133.415C196.529 134.367 196.529 135.911 197.481 136.864C198.434 137.817 199.978 137.817 200.931 136.864Z"
                          fill={darkMode ? "white" : "black"}
                        />
                      </g>

                      {/* information box round */}
                      <g
                        filter="url(#filter1_d_9_69)"
                        cursor={"pointer"}
                        onClick={(e) => {
                          e.stopPropagation();
                          setInfo(index);
                        }}
                      >
                        <rect
                          x="113.922"
                          y="118.025"
                          width="34"
                          height="34"
                          rx="17"
                          transform="rotate(90 113.922 118.025)"
                          fill={darkMode ? "#2ADFD3" : "#6B5B93"}
                          shape-rendering="crispEdges"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M97 143.593C92.286 143.593 89.9289 143.593 88.4645 142.275C87 140.957 87 138.835 87 134.593C87 130.35 87 128.229 88.4645 126.911C89.9289 125.593 92.2859 125.593 97 125.593C101.714 125.593 104.071 125.593 105.535 126.911C107 128.229 107 130.35 107 134.593C107 138.835 107 140.957 105.535 142.275C104.071 143.593 101.714 143.593 97 143.593ZM97 139.768C97.4142 139.768 97.75 139.466 97.75 139.093L97.75 133.693C97.75 133.32 97.4142 133.018 97 133.018C96.5858 133.018 96.25 133.32 96.25 133.693L96.25 139.093C96.25 139.466 96.5858 139.768 97 139.768ZM97 130.093C97.5523 130.093 98 130.496 98 130.993C98 131.49 97.5523 131.893 97 131.893C96.4477 131.893 96 131.49 96 130.993C96 130.496 96.4477 130.093 97 130.093Z"
                          fill={darkMode ? "black" : "white"}
                        />
                      </g>
                      <g filter="url(#filter2_d_9_69)">
                        <rect
                          x="227.274"
                          y="205.642"
                          width="34.3068"
                          height="34.3068"
                          rx="17.1534"
                          fill={darkMode ? "#2ADFD3" : "#6B5B93"}
                          shape-rendering="crispEdges"
                        />
                        <path
                          d="M252.717 228.891C254.317 229.654 255.72 227.553 254.183 226.575L249.639 224.123C247.482 222.835 245.859 225.158 248.199 226.466L252.717 228.891Z"
                          fill={darkMode ? "black" : "white"}
                        />
                        <path
                          d="M248.903 219.863C249.896 223.345 247.696 226.925 243.989 227.858C240.283 228.792 236.473 226.725 235.48 223.242C234.486 219.759 236.686 216.18 240.393 215.246C244.099 214.313 247.909 216.38 248.903 219.863ZM237.853 222.645C238.495 224.896 240.957 226.232 243.354 225.629C245.75 225.025 247.171 222.711 246.529 220.46C245.887 218.209 243.425 216.873 241.029 217.476C238.633 218.079 237.211 220.393 237.853 222.645Z"
                          fill={darkMode ? "black" : "white"}
                        />
                        <path
                          d="M240 221.593L244 221.593"
                          stroke={darkMode ? "black" : "white"}
                          strokeWidth="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                      <g filter="url(#filter3_d_9_69)">
                        <rect
                          x="178.463"
                          y="290.551"
                          width="34.3068"
                          height="34.3068"
                          rx="17.1534"
                          fill={darkMode ? "#2ADFD3" : "#6B5B93"}
                          shape-rendering="crispEdges"
                        />
                        <path
                          d="M203.906 313.8C205.505 314.563 206.908 312.462 205.371 311.483L200.827 309.032C198.67 307.743 197.047 310.066 199.387 311.375L203.906 313.8Z"
                          fill={darkMode ? "black" : "white"}
                        />
                        <path
                          d="M200.091 304.772C201.084 308.254 198.884 311.834 195.178 312.767C191.471 313.7 187.661 311.634 186.668 308.151C185.675 304.668 187.874 301.088 191.581 300.155C195.288 299.222 199.098 301.289 200.091 304.772ZM189.008 307.562C189.654 309.831 192.136 311.177 194.551 310.569C196.965 309.961 198.398 307.629 197.751 305.361C197.104 303.092 194.622 301.746 192.208 302.354C189.793 302.961 188.361 305.293 189.008 307.562Z"
                          fill={darkMode ? "black" : "white"}
                        />
                        <path
                          d="M190.619 306.55L196.33 306.55"
                          stroke={darkMode ? "black" : "white"}
                          strokeWidth="0.941161"
                          stroke-linecap="round"
                        />
                        <path
                          d="M193.474 309.233L193.474 303.867"
                          stroke={darkMode ? "black" : "white"}
                          strokeWidth="0.941161"
                          stroke-linecap="round"
                        />
                      </g>
                      <g filter="url(#filter4_d_9_69)">
                        <rect
                          x="81.0329"
                          y="290.507"
                          width="34.3068"
                          height="34.3068"
                          rx="17.1534"
                          fill={darkMode ? "#2ADFD3" : "#6B5B93"}
                          shape-rendering="crispEdges"
                        />
                        <circle
                          cx="98.1863"
                          cy="307.66"
                          r="16.5209"
                          fill={darkMode ? "black" : "white"}
                        />
                        <path
                          d="M96.9262 301.009C96.9937 299.974 98.4563 299.861 98.5913 301.009L98.5913 307.197L102.462 310.302C103.092 310.999 102.327 311.99 101.517 311.629L97.4887 308.412C97.0245 308.098 96.925 307.92 96.9262 307.602V301.009Z"
                          fill={darkMode ? "white" : "black"}
                        />
                      </g>
                      <g filter="url(#filter5_d_9_69)">
                        <rect
                          x="66.1431"
                          y="205.795"
                          width="34"
                          height="34"
                          rx="17"
                          transform="rotate(90 66.1431 205.795)"
                          fill={darkMode ? "#2ADFD3" : "#6B5B93"}
                          shape-rendering="crispEdges"
                        />
                        <path
                          d="M45.2108 213.401L49.1431 220.829H41.2782L45.2108 213.401Z"
                          fill={darkMode ? "black" : "white"}
                        />
                        <path
                          d="M41.2782 220.829H49.1431V232.19L45.2106 226.946L41.2781 232.19L41.2782 220.829Z"
                          fill={darkMode ? "black" : "white"}
                        />
                        <g clip-path="url(#clip0_9_69)">
                          <path
                            d="M52.8927 220.465L52.8927 220.465C52.86 220.653 52.6806 220.78 52.4921 220.747C50.935 220.477 49.5211 219.164 49.5211 217.228C49.5211 216.398 49.899 215.748 50.3343 215.258C50.586 214.975 50.8663 214.736 51.114 214.541H50.4707C50.2854 214.541 50.1352 214.39 50.1352 214.205C50.1352 214.02 50.2854 213.87 50.4707 213.87H52.0436C52.2289 213.87 52.3791 214.02 52.3791 214.205V215.778C52.3791 215.963 52.2289 216.114 52.0436 216.114C51.8584 216.114 51.7082 215.963 51.7082 215.778V214.958C51.4342 215.166 51.1246 215.412 50.8524 215.719M52.8927 220.465L50.8524 215.719M52.8927 220.465C52.9253 220.276 52.7989 220.097 52.6103 220.064C51.3413 219.844 50.2142 218.784 50.2142 217.228M52.8927 220.465L50.2142 217.228M50.8524 215.719C50.4849 216.132 50.2142 216.625 50.2142 217.228M50.8524 215.719L50.2142 217.228M55.7717 219.41L55.7717 219.41C56.2069 218.92 56.5848 218.271 56.5848 217.441C56.5848 215.525 55.2008 214.219 53.6638 213.931C53.4757 213.895 53.2945 214.019 53.2592 214.207C53.2239 214.395 53.3478 214.577 53.5359 214.612C54.7886 214.847 55.8917 215.901 55.8917 217.441C55.8917 218.044 55.6211 218.536 55.2536 218.95L55.2536 218.95C54.9813 219.256 54.6718 219.503 54.3978 219.711V218.891C54.3978 218.705 54.2476 218.555 54.0623 218.555C53.877 218.555 53.7269 218.705 53.7269 218.891V220.464C53.7269 220.649 53.877 220.799 54.0623 220.799H55.6353C55.8206 220.799 55.9708 220.649 55.9708 220.464C55.9708 220.278 55.8206 220.128 55.6353 220.128H54.9919C55.2396 219.933 55.52 219.693 55.7717 219.41ZM54.3245 218.891V219.766L54.8979 220.201H55.6353C55.7801 220.201 55.8975 220.319 55.8975 220.464C55.8975 220.608 55.7801 220.726 55.6353 220.726H54.0623C53.9175 220.726 53.8002 220.608 53.8002 220.464V218.891C53.8002 218.746 53.9175 218.628 54.0623 218.628C54.2071 218.628 54.3245 218.746 54.3245 218.891Z"
                            fill="black"
                            stroke="black"
                            strokeWidth="0.146599"
                          />
                        </g>
                      </g>
                      <path
                        d="M416.572 43.4611V15.6386L424.409 10.1832H577V34.5968L565.637 43.4611H430.902H416.572Z"
                        fill="url(#paint0_linear_9_69)"
                        fillOpacity="0.35"
                      />
                      <path
                        d="M416.572 43.4611V15.6386L424.409 10.1832H577V34.5968L565.637 43.4611H430.902H416.572Z"
                        fill="#154665"
                        fillOpacity="0.35"
                      />
                      <path
                        d="M416.572 43.4611V15.6386L424.409 10.1832H577V34.5968L565.637 43.4611H430.902H416.572Z"
                        stroke="#2ADFD3"
                        stroke-opacity="0.4"
                        strokeWidth="2"
                      />
                      <path
                        d="M422.027 43.4611H416.026V15.6386L424.755 10.1832V11.2743M572.05 10.1832H576.96V34.7325L565.504 43.4611M496.22 10.1832H531.68M489.674 43.4611H542.591M424.755 11.2743L417.117 15.6386V42.9156H422.027H416.572V16.1842L424.755 11.2743Z"
                        stroke={darkMode === true ? "#2ADFD3" : "#6B5B95"}
                        strokeWidth="3.27323"
                      />
                      <path
                        d="M277.459 103.47C277.459 111.605 270.864 118.2 262.73 118.2C254.595 118.2 248 111.605 248 103.47C248 95.3353 254.595 88.7407 262.73 88.7407C266.822 88.7407 270.525 90.41 273.195 93.105C275.831 95.7665 277.459 99.4282 277.459 103.47ZM251.127 103.47C251.127 109.878 256.322 115.073 262.73 115.073C269.137 115.073 274.332 109.878 274.332 103.47C274.332 97.0624 269.137 91.8679 262.73 91.8679C256.322 91.8679 251.127 97.0624 251.127 103.47Z"
                        fill={darkMode === true ? "#2ADFD3" : "#6B5B95"}
                      />
                      <path
                        d="M267.639 103.47C267.639 106.182 265.441 108.38 262.73 108.38C260.018 108.38 257.82 106.182 257.82 103.47C257.82 100.759 260.018 98.5604 262.73 98.5604C265.441 98.5604 267.639 100.759 267.639 103.47Z"
                        fill={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                      />
                      <path
                        d="M276.914 90.3773L339.105 26.0037H408.388M408.388 26.0037H408.934V13.4563L422.027 4.72764H420.39L408.934 12.3652L408.388 12.6833V26.0037Z"
                        stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                        strokeWidth="3.27323"
                      />
                      <path
                        d="M401.842 21.6394V10.7286L414.389 2"
                        stroke="#2ADFD3"
                        strokeWidth="3.27323"
                      />

                      <text
                        x="470"
                        y="32"
                        fill={darkMode === true ? "white" : "black"}
                        fontFamily="Roboto"
                        fontSize="16px"
                        fontWeight="bolder"
                      >
                        {marker.info.Name}
                      </text>
                      <defs>
                        <filter
                          id="filter0_d_9_69"
                          x="177.243"
                          y="120.747"
                          width="38.4031"
                          height="38.4031"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="2.04817" />
                          <feGaussianBlur stdDeviation="1.02408" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_9_69"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_9_69"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter1_d_9_69"
                          x="77.8661"
                          y="118.025"
                          width="38.112"
                          height="38.112"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="2.05602" />
                          <feGaussianBlur stdDeviation="1.02801" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_9_69"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_9_69"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter2_d_9_69"
                          x="225.226"
                          y="205.642"
                          width="38.4031"
                          height="38.4031"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="2.04817" />
                          <feGaussianBlur stdDeviation="1.02408" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_9_69"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_9_69"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter3_d_9_69"
                          x="176.414"
                          y="290.551"
                          width="38.4031"
                          height="38.4031"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="2.04817" />
                          <feGaussianBlur stdDeviation="1.02408" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_9_69"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_9_69"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter4_d_9_69"
                          x="78.9847"
                          y="290.507"
                          width="38.4031"
                          height="38.4031"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="2.04817" />
                          <feGaussianBlur stdDeviation="1.02408" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_9_69"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_9_69"
                            result="shape"
                          />
                        </filter>
                        <filter
                          id="filter5_d_9_69"
                          x="30.087"
                          y="205.795"
                          width="38.112"
                          height="38.112"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="2.05602" />
                          <feGaussianBlur stdDeviation="1.02801" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_9_69"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_9_69"
                            result="shape"
                          />
                        </filter>
                        <linearGradient
                          id="paint0_linear_9_69"
                          x1="429.638"
                          y1="13.1759"
                          x2="528.468"
                          y2="52.358"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#2ADFD3" />
                          <stop
                            offset="1"
                            stop-color="#154665"
                            stop-opacity="0"
                          />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_9_69"
                          x1="582.731"
                          y1="46.8375"
                          x2="533.181"
                          y2="28.6603"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#2ADFD3" />
                          <stop
                            offset="1"
                            stop-color="#154665"
                            stop-opacity="0"
                          />
                        </linearGradient>
                        <clipPath id="clip0_9_69">
                          <rect
                            width="7.86496"
                            height="7.86496"
                            fill="white"
                            transform="translate(49.1431 213.401)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </Popup>
              ) : (
                marker.targetType != 0 && (
                  <Popup>
                    <div className="info-popup">
                      <svg
                        width="301"
                        height="149"
                        viewBox="0 0 221 149"
                        fill="none"
                      >
                        <path
                          d="M9.5 99.5V138.5H39.5L30.5 147.5H1V108.5L9.5 99.5Z"
                          fill={darkMode ? "#CF7AD1" : "#6B5B95"}
                        />
                        <path
                          d="M55.5 1H34.5L9.5 26V99.5M103 1H220V106.5L177.5 138.5H103H39.5M9.5 99.5V138.5H39.5M9.5 99.5L1 108.5V147.5H30.5L39.5 138.5"
                          stroke={darkMode === true ? "#2ADFD3" : "#F2FF61"}
                          stroke-width="2"
                        />
                        <path
                          d="M37.5 7.5L16.5 28V131H18H176.5L214 103.5V7.5H37.5Z"
                          fill={darkMode === true ? "#CF7AD1" : "#6B5B95"}
                          fill-opacity="0.5"
                        />

                        {/* <path
                        d="M81 79.842V116.5H0V20.5L21 0.499986L81 0.499994V79.842Z"
                        fill="url(#pattern0)"
                        px="12"
                        y="10"
                      /> */}
                        <rect
                          width="120"
                          height="110"
                          x="0"
                          y="20"
                          fill="url(#pattern0)"
                        />
                        <defs>
                          <pattern
                            id="pattern0"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              xlinkHref="#image0_13_167"
                              transform="scale(0.00530864, 0.00690168)"
                            />
                          </pattern>
                          <image
                            id="image0_13_167"
                            width="190"
                            height="140"
                            href={getImage(marker.targetType)}
                          />
                        </defs>

                        {shipTexts.map((text, index) => (
                          <text
                            key={index} // Don't forget to set a unique key when using map
                            x="95" // Adjust x and y coordinates as needed
                            y={`${30 + index * 15}`} // Adjust y coordinates to position each text element vertically
                            fontSize="10"
                            letterSpacing="1"
                            fontFamily="Roboto"
                            fill={darkMode === true ? "white" : "black"}
                          >
                            {text}
                          </text>
                        ))}
                      </svg>
                    </div>
                  </Popup>
                )
              )}
            </Marker>
          </MarkerClusterGroup>
        ): null})}

        {isCircleVisible &&
          markers.map(
            (marker, index) =>
              marker.targetType === 0 && (
                <Circle
                  key={`circle-${index}`}
                  center={marker.geocode}
                  radius={500000}
                  color="#61FF00"
                  fillColor="#90FFD7"
                  fillOpacity={0.2}
                  dashArray="2,8"
                />
              )
          )}
        {/* For Options with Bounds */}
        <ChangeMapView coords={bounds} />
        {markers.map((marker, index) => {
          return isVisible[index] ? (
            <Polyline key={index} weight='2' dashArray='5, 5' dashOffset='2' positions={marker.path} color={marker.color} /> // marker.color
          ) : null;
        })}
      </MapContainer>
    </div>
  );
};

const getMarkerType = (targetType) => {
  switch (targetType) {
    case 0:
      return "own_system";
    case 1:
      return "friendly_target";
    case 2:
      return "enemy_target";
    case 3:
      return "neutral_target";
    case 4:
      return "green_surface";
    case 5:
      return "cargo";
    default:
      return "placeholder";
  }
};

export default SelectedAreaMap;
