import React, { useRef, useState, useEffect } from "react";
import "../styles/WorldMap.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
  Polyline,
  GeoJSON,
} from "react-leaflet";
import "leaflet-area-select";
import "leaflet-rotatedmarker";
import {
  blue_surface,
  cargo_img,
  green_surface,
  submarine,
  warship,
} from "../assets";

import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import {
  placeholder,
  enemy_target,
  friendly_target,
  neutral_target,
  own_system,
  own_system_day,
  port,
  mapCircle,
  night_map_background,
  day_map_background,
} from "../assets";

import { markers, restrictedAreas } from "../utils/Constant";
import AreaSelect from "./AreaSelected";

const getIconUrl = (type, mode) => {
  switch (type) {
    case "own_system":
      return mode ? own_system : own_system_day;
    case "friendly_target":
      return mode ? friendly_target : friendly_target;
    case "enemy_target":
      return mode ? enemy_target : enemy_target;
    case "neutral_target":
      return mode ? neutral_target : neutral_target;
    case "port":
      return mode ? port : port;
    case "cargo":
      return mode ? blue_surface : blue_surface;
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
      return [40, 50];
    case "cargo":
      return [20, 50];
    case "green_surface":
      return [20, 50];
    default:
      return [20, 50];
  }
};

// const customIcon = (type, mode) => {
//   return new Icon({
//     iconUrl: getIconUrl(type, mode),
//     iconSize: getIconSize(type),
//   });
// };

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

function LocationMarker() {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      console.log(e.latlng.lat);
      console.log(e.latlng.lng);
      // map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const WorldMap = ({
  darkMode,
  circleMode,
  setBounds,
  setNewMarkers,
  restrectedArea,
  showLabel,
}) => {
  const markerRefs = useRef([]);
  const [isCircleVisible, setCircleVisibility] = useState(false);
  const [shipInfo, setShipInfo] = useState(null);
  const [trackInfo, setTrackInfo] = useState(null);
  const [shipTexts, setShipTexts] = useState([]);

  const customIcon = (type, mode, marker, index) => {
    const iconUrl = getIconUrl(type, mode);
    const iconSize = getIconSize(type);

    let html;
    const icon = `<img src="${iconUrl}" width="${iconSize[0]}" height="${iconSize[1]}">`;

    const markerRef = markerRefs.current[index];
    if (
      markerRef &&
      markerRef.openPopup &&
      marker.targetType != 0 &&
      showLabel
    ) {
      // Check if markerRef is defined and openPopup method exists
      if (markerRef.isPopupOpen()) {
        // Check if popup is open
        html = `<div class="custom-marker-container" style="position: relative;">${icon}</div>`;
      } else {
        const shipNameDiv = `<div class="ship-name">
        <svg width="100" height="24" viewBox="0 0 150 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.47656 32.0101V7.75575L9.30861 3H142.33V24.2826L132.425 32.0101H14.9691H2.47656Z" fill="url(#paint0_linear_826_5919)" fillOpacity="0.35"/>
          <path d="M2.47656 32.0101V7.75575L9.30861 3H142.33V24.2826L132.425 32.0101H14.9691H2.47656Z" fill="url(#paint1_linear_826_5919)" fillOpacity="0.35"/>
          <path d="M2.47656 32.0101V7.75575L9.30861 3H142.33V24.2826L132.425 32.0101H14.9691H2.47656Z" stroke="#2ADFD3" stroke-opacity="0.4"/>
          <text x="50%" y="50%" fill="${
            darkMode ? "white" : "black"
          }" font-family="Roboto" font-size="16px" font-weight="bolder" text-anchor="middle" alignment-baseline="middle">${
          marker.info.Name
        }</text>
          <path d="M7.23133 32.0101H2V7.75575L9.6092 3V3.95115M138.015 3H142.295V24.4009L132.308 32.0101M71.9096 3H102.822M23.4009 32.0101H69.5317M9.6092 3.95115L2.95115 7.75575V31.5345H7.23133H2.47558V8.23133L9.6092 3.95115Z" stroke="${
            darkMode ? "#2ADFD3" : "#6B5B95"
          }" strokeWidth="2.85345"/>
          <path d="M145.148 7.28018V3H147.289L147.9 4.22291H149.123V6.05727H147.9L147.289 7.28018H145.148Z" fill="#2ADFD3"/>
          <path d="M145.148 12.9853V8.70508H147.289L147.9 9.92799H149.123V11.7623H147.9L147.289 12.9853H145.148Z" fill="#2ADFD3"/>
          <path d="M145.148 18.6972V14.417H147.289L147.9 15.6399H149.123V17.4743H147.9L147.289 18.6972H145.148Z" fill="#2ADFD3"/>
          <path d="M145.148 24.4022V20.1221H147.289L147.9 21.345H149.123V23.1793H147.9L147.289 24.4022H145.148Z" fill="#2ADFD3"/>
          <defs>
            <linearGradient id="paint0_linear_826_5919" x1="13.8672" y1="5.60891" x2="100.023" y2="39.766" gradientUnits="userSpaceOnUse">
              <stop stop-color="${darkMode ? "#2ADFD3" : "#6B5B95"}"/>
              <stop offset="1" stop-color='#6B5B95' stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_linear_826_5919" x1="147.326" y1="34.9535" x2="104.131" y2="19.1074" gradientUnits="userSpaceOnUse">
              <stop stop-color="${darkMode ? "#2ADFD3" : "#6B5B95"}"/>
              <stop offset="1" stop-color='#6B5B95' stop-opacity="0"/>
            </linearGradient>
          </defs>
        </svg>
    </div>`;
        html = `<div class="custom-marker-container" style="position: relative;">${shipNameDiv}${icon}</div>`;
      }
    } else {
      html = `<div class="custom-marker-container" style="position: relative;">${icon}</div>`;
    }
    return new divIcon({
      html: html,
      iconSize: iconSize,
    });
  };
  const {
    Name = "",
    Callsign = "",
    Destination = "",
    Heading = "",
    Speed = "",
    Type = "",
    Status = "",
  } = shipInfo || {};

  const [fillCircle, setFillCircle] = useState(null);
  const [shipPositions, setShipPositions] = useState({});
  const [path, setPath] = useState([]);
  const [markersInit, setMarkersInit] = useState(markers);
  const [addedPaths, setAddedPaths] = useState({});
  const [isVisible, setIsVisible] = useState([]);

  const ownSystemMarker = markers.find(
    (marker) => marker.popUp === "Own System"
  );
  const ownSystemCenter = ownSystemMarker.geocode;
  const ownSystemRadius = 700000;

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
  const setTrack = (index) => {
    if (index >= 0 && index < markersInit.length) {
      // Update shipInfo for the clicked marker index
      setTrackInfo(markersInit[index]);
      console.log("ship info of ", markersInit[index]);
      const markerRef = markerRefs.current[index];
      if (markerRef) {
        markerRef.openPopup();
      }
    } else {
      console.log("Invalid marker index:", index);
    }
  };

  useEffect(() => {
    setCircleVisibility(circleMode);
  }, [circleMode]);

  useEffect(() => {
    if (darkMode) {
      setFillCircle("#D9D9D9");
    } else {
      setFillCircle("#6B5B95");
    }
  }, [darkMode]);

  const handleMarkerClick = (index) => {
    const markerRef = markerRefs.current[index];
    setShipInfo(null);
    setTrackInfo(null);
    if (markerRef) {
      markerRef.openPopup();
    }
  };

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

  // useEffect(() => {
  //   markers.forEach((marker) => marker.path = [marker.startPosition, marker.geocode]);

  //   const intervalId = setInterval(() => {
  //     setMarkersInit((prevMarkers) => {
  //       const updatedMarkers = prevMarkers.map((marker) => {
  //         if(marker.targetType !== 0){
  //           const [lat, lng] = marker.geocode;
  //           return { ...marker, geocode: [lat + marker.geoLocationMovement[0], lng + marker.geoLocationMovement[1]] };
  //         } else {
  //           const [lat, lng] = marker.geocode;
  //           return { ...marker, geocode: [lat, lng] };
  //         }
  //       });

  //       const newPath = prevMarkers.map((marker) =>
  //         marker.targetType !== 0 ?
  //         [marker.geocode, [marker.geocode[0] + marker.geoLocationMovement[0], marker.geocode[1] + marker.geoLocationMovement[1]]] :
  //         [marker.geocode, [marker.geocode[0], marker.geocode[1]]]
  //       );

  //       updatedMarkers.map((marker) => {
  //         return marker.path.push(newPath)
  //       })
  //       return updatedMarkers;
  //     });
  //   }, 2000);

  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    // Initialize paths for each marker
    markers.forEach(
      (marker) => (marker.path = [marker.startPosition, marker.geocode])
    );

    const intervalId = setInterval(() => {
      setMarkersInit((prevMarkers) => {
        const updatedMarkers = prevMarkers.map((marker) => {
          if (marker.targetType !== 0) {
            const [lat, lng] = marker.geocode;
            const newLat = lat + marker.geoLocationMovement[0];
            const newLng = lng + marker.geoLocationMovement[1];
            // Create a new path by concatenating the current path with the new position
            const newPath = [...marker.path, [newLat, newLng]];
            return { ...marker, geocode: [newLat, newLng], path: newPath };
          } else {
            // For targetType 0, do not update coordinates or path
            return marker;
          }
        });
        setNewMarkers(updatedMarkers);
        return updatedMarkers;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [markers, setMarkersInit]);

  function calculateDistance(point1, point2) {
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;

    const earthRadiusKm = 6371;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

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

  const yellowStyle = {
    fillColor: "red",
    weight: 2,
    opacity: 1,
    color: "black",
    fillOpacity: 0.3,
    dashArray: "8,8",
  };

  return (
    <div className={`world-map-container ${darkMode ? "dark" : "light"}`}>
      <MapContainer
        center={[12, 80]}
        zoom={6}
        darkMode
        style={
          darkMode
            ? {
                height: "100vh",
                width: "100%",
                backgroundImage: `url(${night_map_background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }
            : {
                height: "100vh",
                width: "100%",
                backgroundImage: `url(${day_map_background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }
        }
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />
        {restrectedArea ? (
          <GeoJSON data={restrictedAreas} style={yellowStyle} />
        ) : null}
        {/* <GeoJSON data={restrictedAreas}  style={yellowStyle} /> */}
        {markersInit.map((marker, index) => {
          const distance = calculateDistance(marker.geocode, ownSystemCenter);
          const isVisible = distance * 1000 <= ownSystemRadius;

          return isVisible ? (
            <MarkerClusterGroup
              key={index}
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
            >
              <Marker
                ref={(ref) => (markerRefs.current[index] = ref)}
                position={marker.geocode}
                icon={customIcon(
                  getMarkerType(marker.targetType),
                  darkMode,
                  marker,
                  index
                )}
                eventHandlers={{
                  click: () => handleMarkerClick(index),
                }}
                rotationAngle={marker.info.Heading}
                rotationOrigin="center"
              >
                {shipInfo === null &&
                marker.targetType != 0 &&
                trackInfo === null ? (
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
                          id="info-box"
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
                          id="info-box"
                        />
                        <path
                          d="M254.94 294.623L219.821 349.673L154.586 352.562L149.437 299.796L211.818 263.781L254.94 294.623Z"
                          fill="#154665"
                          fillOpacity="0.35"
                          stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                          strokeWidth="2.57518"
                          id="info-box"
                        />
                        <path
                          d="M139.482 352.464L74.1347 349.511L38.9034 294.395L82.0667 263.577L144.59 299.674L139.482 352.464Z"
                          fill="#154665"
                          fillOpacity="0.35"
                          stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                          strokeWidth="2.57518"
                          id="info-box"
                        />
                        <path
                          d="M31.5689 281.169L1.45342 223.654L31.5689 166.139L79.8488 187.906L79.8488 259.402L31.5689 281.169Z"
                          fill="#154665"
                          fillOpacity="0.35"
                          stroke={darkMode === true ? "#CF7AD1" : "#F2FF61"}
                          strokeWidth="2.57518"
                          id="info-box"
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
                        {/* track card */}
                        <g
                          filter="url(#filter5_d_9_69)"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTrack(index);
                          }}
                        >
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
                              fill={darkMode ? "white" : "black" }
                              transform="translate(49.1431 213.401)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </Popup>
                ) : 
                // marker.targetType != 0 &&
                trackInfo === null  ? (
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
                        fill="url(#infopattern)"
                        px="12"
                        y="10"
                      /> */}
                        <rect
                          width="120"
                          height="110"
                          x="0"
                          y="20"
                          fill="url(#infopattern)"
                        />
                        <defs>
                          <pattern
                            id="infopattern"
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
                ) : (
                  <Popup>
                    <div className="location-popup">
                      <svg
                        width="166"
                        height="271"
                        viewBox="0 0 166 271"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.3"
                          d="M13 159.5V43.9252L152.292 43.9248V257.902H48.3847L13 216V159.5Z"
                          fill={darkMode ? "#CF7AD1" : "#F2FF61" }
                        />
                        <g filter="url(#filter0_f_897_4314)">
                          <path
                            d="M6.00005 60.6559V36H14.9231M124.113 36H159.336C159.336 36 159.336 85.9116 159.336 117.893M159.336 244.694V264.947H118.83M44.5 263.5L6.00005 218.5V172.5L6 130"
                            stroke={darkMode ? "#2ADFD3" : "#6B5B95" }
                            stroke-width="4"
                          />
                        </g>
                        <path
                          d="M5.5 60.6559V36H14.9231M124.113 36H159.336C159.336 36 159.336 85.9116 159.336 117.893M159.336 244.694V264.947H118.83M45.5 264.947L5.50005 217.5V177L5.5 130"
                          stroke={darkMode ? "#2ADFD3" : "#6B5B95" }
                          stroke-width="4"
                        />
                        <path
                          opacity="0.5"
                          d="M5.5 192.5V36H159.336V264.947H45.7429L5.5 217V192.5Z"
                          stroke={darkMode ? "#2ADFD3" : "#6B5B95" }
                          stroke-width="2"
                        />
                        {/* current position title */}
                        <path
                          d="M50.1172 61.7393H51.0547C51.0059 62.1885 50.8773 62.5905 50.6689 62.9453C50.4606 63.3001 50.166 63.5817 49.7852 63.79C49.4043 63.9951 48.929 64.0977 48.3594 64.0977C47.9427 64.0977 47.5635 64.0195 47.2217 63.8633C46.8831 63.707 46.5918 63.4857 46.3477 63.1992C46.1035 62.9095 45.9147 62.5628 45.7812 62.1592C45.651 61.7523 45.5859 61.2998 45.5859 60.8018V60.0938C45.5859 59.5957 45.651 59.1449 45.7812 58.7412C45.9147 58.3343 46.1051 57.986 46.3525 57.6963C46.6032 57.4066 46.9043 57.1836 47.2559 57.0273C47.6074 56.8711 48.0029 56.793 48.4424 56.793C48.9795 56.793 49.4336 56.8939 49.8047 57.0957C50.1758 57.2975 50.4639 57.5775 50.6689 57.9355C50.8773 58.2904 51.0059 58.7021 51.0547 59.1709H50.1172C50.0716 58.8389 49.987 58.554 49.8633 58.3164C49.7396 58.0755 49.5638 57.89 49.3359 57.7598C49.1081 57.6296 48.8102 57.5645 48.4424 57.5645C48.1266 57.5645 47.8483 57.6247 47.6074 57.7451C47.3698 57.8656 47.1696 58.0365 47.0068 58.2578C46.8473 58.4792 46.7269 58.7445 46.6455 59.0537C46.5641 59.363 46.5234 59.7064 46.5234 60.084V60.8018C46.5234 61.1501 46.5592 61.4772 46.6309 61.7832C46.7057 62.0892 46.818 62.3577 46.9678 62.5889C47.1175 62.82 47.3079 63.0023 47.5391 63.1357C47.7702 63.266 48.0436 63.3311 48.3594 63.3311C48.7598 63.3311 49.0788 63.2676 49.3164 63.1406C49.554 63.0137 49.7331 62.8314 49.8535 62.5938C49.9772 62.3561 50.0651 62.0713 50.1172 61.7393ZM55.4346 62.7793V58.7168H56.3428V64H55.4785L55.4346 62.7793ZM55.6055 61.666L55.9814 61.6562C55.9814 62.0078 55.944 62.3333 55.8691 62.6328C55.7975 62.929 55.6803 63.1862 55.5176 63.4043C55.3548 63.6224 55.1416 63.7933 54.8779 63.917C54.6143 64.0374 54.2936 64.0977 53.916 64.0977C53.6589 64.0977 53.4229 64.0602 53.208 63.9854C52.9964 63.9105 52.8141 63.7949 52.6611 63.6387C52.5081 63.4824 52.3893 63.279 52.3047 63.0283C52.2233 62.7777 52.1826 62.4766 52.1826 62.125V58.7168H53.0859V62.1348C53.0859 62.3724 53.112 62.5693 53.1641 62.7256C53.2194 62.8786 53.2926 63.0007 53.3838 63.0918C53.4782 63.1797 53.5824 63.2415 53.6963 63.2773C53.8135 63.3132 53.9339 63.3311 54.0576 63.3311C54.4417 63.3311 54.7461 63.2578 54.9707 63.1113C55.1953 62.9616 55.3564 62.7614 55.4541 62.5107C55.555 62.2568 55.6055 61.9753 55.6055 61.666ZM58.623 59.5469V64H57.7197V58.7168H58.5986L58.623 59.5469ZM60.2734 58.6875L60.2686 59.5273C60.1937 59.5111 60.1221 59.5013 60.0537 59.498C59.9886 59.4915 59.9137 59.4883 59.8291 59.4883C59.6208 59.4883 59.4368 59.5208 59.2773 59.5859C59.1178 59.651 58.9827 59.7422 58.8721 59.8594C58.7614 59.9766 58.6735 60.1165 58.6084 60.2793C58.5465 60.4388 58.5059 60.6146 58.4863 60.8066L58.2324 60.9531C58.2324 60.6341 58.2633 60.3346 58.3252 60.0547C58.3903 59.7747 58.4896 59.5273 58.623 59.3125C58.7565 59.0944 58.9258 58.9251 59.1309 58.8047C59.3392 58.681 59.5866 58.6191 59.873 58.6191C59.9382 58.6191 60.013 58.6273 60.0977 58.6436C60.1823 58.6566 60.2409 58.6712 60.2734 58.6875ZM62.0117 59.5469V64H61.1084V58.7168H61.9873L62.0117 59.5469ZM63.6621 58.6875L63.6572 59.5273C63.5824 59.5111 63.5107 59.5013 63.4424 59.498C63.3773 59.4915 63.3024 59.4883 63.2178 59.4883C63.0094 59.4883 62.8255 59.5208 62.666 59.5859C62.5065 59.651 62.3714 59.7422 62.2607 59.8594C62.1501 59.9766 62.0622 60.1165 61.9971 60.2793C61.9352 60.4388 61.8945 60.6146 61.875 60.8066L61.6211 60.9531C61.6211 60.6341 61.652 60.3346 61.7139 60.0547C61.779 59.7747 61.8783 59.5273 62.0117 59.3125C62.1452 59.0944 62.3145 58.9251 62.5195 58.8047C62.7279 58.681 62.9753 58.6191 63.2617 58.6191C63.3268 58.6191 63.4017 58.6273 63.4863 58.6436C63.571 58.6566 63.6296 58.6712 63.6621 58.6875ZM66.5918 64.0977C66.224 64.0977 65.8903 64.0358 65.5908 63.9121C65.2946 63.7852 65.0391 63.6077 64.8242 63.3799C64.6126 63.152 64.4499 62.8818 64.3359 62.5693C64.222 62.2568 64.165 61.915 64.165 61.5439V61.3389C64.165 60.9092 64.2285 60.5267 64.3555 60.1914C64.4824 59.8529 64.6549 59.5664 64.873 59.332C65.0911 59.0977 65.3385 58.9202 65.6152 58.7998C65.8919 58.6794 66.1784 58.6191 66.4746 58.6191C66.8522 58.6191 67.1777 58.6842 67.4512 58.8145C67.7279 58.9447 67.9541 59.127 68.1299 59.3613C68.3057 59.5924 68.4359 59.8659 68.5205 60.1816C68.6051 60.4941 68.6475 60.8359 68.6475 61.207V61.6123H64.7021V60.875H67.7441V60.8066C67.7311 60.5723 67.6823 60.3444 67.5977 60.123C67.5163 59.9017 67.3861 59.7194 67.207 59.5762C67.028 59.4329 66.7839 59.3613 66.4746 59.3613C66.2695 59.3613 66.0807 59.4053 65.9082 59.4932C65.7357 59.5778 65.5876 59.7048 65.4639 59.874C65.3402 60.0433 65.2441 60.25 65.1758 60.4941C65.1074 60.7383 65.0732 61.0199 65.0732 61.3389V61.5439C65.0732 61.7946 65.1074 62.0306 65.1758 62.252C65.2474 62.4701 65.3499 62.6621 65.4834 62.8281C65.6201 62.9941 65.7845 63.1243 65.9766 63.2188C66.1719 63.3132 66.3932 63.3604 66.6406 63.3604C66.9596 63.3604 67.2298 63.2952 67.4512 63.165C67.6725 63.0348 67.8662 62.8607 68.0322 62.6426L68.5791 63.0771C68.4652 63.2497 68.3203 63.4141 68.1445 63.5703C67.9688 63.7266 67.7523 63.8535 67.4951 63.9512C67.2412 64.0488 66.9401 64.0977 66.5918 64.0977ZM70.6055 59.8447V64H69.7021V58.7168H70.5566L70.6055 59.8447ZM70.3906 61.1582L70.0146 61.1436C70.0179 60.7822 70.0716 60.4486 70.1758 60.1426C70.2799 59.8333 70.4264 59.5648 70.6152 59.3369C70.804 59.109 71.0286 58.9333 71.2891 58.8096C71.5527 58.6826 71.8441 58.6191 72.1631 58.6191C72.4235 58.6191 72.6579 58.6549 72.8662 58.7266C73.0745 58.7949 73.252 58.9056 73.3984 59.0586C73.5482 59.2116 73.6621 59.4102 73.7402 59.6543C73.8184 59.8952 73.8574 60.1898 73.8574 60.5381V64H72.9492V60.5283C72.9492 60.2516 72.9085 60.0303 72.8271 59.8643C72.7458 59.695 72.627 59.5729 72.4707 59.498C72.3145 59.4199 72.1224 59.3809 71.8945 59.3809C71.6699 59.3809 71.4648 59.4281 71.2793 59.5225C71.097 59.6169 70.9391 59.7471 70.8057 59.9131C70.6755 60.0791 70.5729 60.2695 70.498 60.4844C70.4264 60.696 70.3906 60.9206 70.3906 61.1582ZM77.4414 58.7168V59.4102H74.585V58.7168H77.4414ZM75.5518 57.4326H76.4551V62.6914C76.4551 62.8704 76.4827 63.0055 76.5381 63.0967C76.5934 63.1878 76.665 63.248 76.7529 63.2773C76.8408 63.3066 76.9352 63.3213 77.0361 63.3213C77.111 63.3213 77.1891 63.3148 77.2705 63.3018C77.3551 63.2855 77.4186 63.2725 77.4609 63.2627L77.4658 64C77.3942 64.0228 77.2998 64.0439 77.1826 64.0635C77.0687 64.0863 76.9303 64.0977 76.7676 64.0977C76.5462 64.0977 76.3428 64.0537 76.1572 63.9658C75.9717 63.8779 75.8236 63.7314 75.7129 63.5264C75.6055 63.318 75.5518 63.0381 75.5518 62.6865V57.4326ZM83.7402 61.2119H81.8408V60.4453H83.7402C84.1081 60.4453 84.4059 60.3867 84.6338 60.2695C84.8617 60.1523 85.0277 59.9896 85.1318 59.7812C85.2393 59.5729 85.293 59.3353 85.293 59.0684C85.293 58.8242 85.2393 58.5947 85.1318 58.3799C85.0277 58.165 84.8617 57.9925 84.6338 57.8623C84.4059 57.7288 84.1081 57.6621 83.7402 57.6621H82.0605V64H81.1182V56.8906H83.7402C84.2773 56.8906 84.7314 56.9834 85.1025 57.1689C85.4736 57.3545 85.7552 57.6117 85.9473 57.9404C86.1393 58.266 86.2354 58.6387 86.2354 59.0586C86.2354 59.5143 86.1393 59.9033 85.9473 60.2256C85.7552 60.5479 85.4736 60.7936 85.1025 60.9629C84.7314 61.1289 84.2773 61.2119 83.7402 61.2119ZM86.9824 61.417V61.3047C86.9824 60.9238 87.0378 60.5706 87.1484 60.2451C87.2591 59.9163 87.4186 59.6315 87.627 59.3906C87.8353 59.1465 88.0876 58.9577 88.3838 58.8242C88.68 58.6875 89.012 58.6191 89.3799 58.6191C89.751 58.6191 90.0846 58.6875 90.3809 58.8242C90.6803 58.9577 90.9342 59.1465 91.1426 59.3906C91.3542 59.6315 91.5153 59.9163 91.626 60.2451C91.7367 60.5706 91.792 60.9238 91.792 61.3047V61.417C91.792 61.7979 91.7367 62.151 91.626 62.4766C91.5153 62.8021 91.3542 63.0869 91.1426 63.3311C90.9342 63.5719 90.682 63.7607 90.3857 63.8975C90.0928 64.0309 89.7607 64.0977 89.3896 64.0977C89.0186 64.0977 88.6849 64.0309 88.3887 63.8975C88.0924 63.7607 87.8385 63.5719 87.627 63.3311C87.4186 63.0869 87.2591 62.8021 87.1484 62.4766C87.0378 62.151 86.9824 61.7979 86.9824 61.417ZM87.8857 61.3047V61.417C87.8857 61.6807 87.9167 61.9297 87.9785 62.1641C88.0404 62.3952 88.1331 62.6003 88.2568 62.7793C88.3838 62.9583 88.5417 63.0999 88.7305 63.2041C88.9193 63.305 89.139 63.3555 89.3896 63.3555C89.637 63.3555 89.8535 63.305 90.0391 63.2041C90.2279 63.0999 90.3841 62.9583 90.5078 62.7793C90.6315 62.6003 90.7243 62.3952 90.7861 62.1641C90.8512 61.9297 90.8838 61.6807 90.8838 61.417V61.3047C90.8838 61.0443 90.8512 60.7985 90.7861 60.5674C90.7243 60.333 90.6299 60.1263 90.5029 59.9473C90.3792 59.765 90.223 59.6217 90.0342 59.5176C89.8486 59.4134 89.6305 59.3613 89.3799 59.3613C89.1325 59.3613 88.9144 59.4134 88.7256 59.5176C88.54 59.6217 88.3838 59.765 88.2568 59.9473C88.1331 60.1263 88.0404 60.333 87.9785 60.5674C87.9167 60.7985 87.8857 61.0443 87.8857 61.3047ZM96.001 62.5986C96.001 62.4684 95.9717 62.348 95.9131 62.2373C95.8577 62.1234 95.7422 62.0208 95.5664 61.9297C95.3939 61.8353 95.1335 61.7539 94.7852 61.6855C94.4922 61.6237 94.2269 61.5505 93.9893 61.4658C93.7549 61.3812 93.5547 61.2786 93.3887 61.1582C93.2259 61.0378 93.1006 60.8962 93.0127 60.7334C92.9248 60.5706 92.8809 60.3802 92.8809 60.1621C92.8809 59.9538 92.9264 59.7568 93.0176 59.5713C93.112 59.3857 93.2438 59.2214 93.4131 59.0781C93.5856 58.9349 93.7923 58.8226 94.0332 58.7412C94.2741 58.6598 94.5426 58.6191 94.8389 58.6191C95.262 58.6191 95.6234 58.694 95.9229 58.8438C96.2223 58.9935 96.4518 59.1937 96.6113 59.4443C96.7708 59.6917 96.8506 59.9668 96.8506 60.2695H95.9473C95.9473 60.123 95.9033 59.9814 95.8154 59.8447C95.7308 59.7048 95.6055 59.5892 95.4395 59.498C95.2767 59.4069 95.0765 59.3613 94.8389 59.3613C94.5882 59.3613 94.3848 59.4004 94.2285 59.4785C94.0755 59.5534 93.9632 59.6494 93.8916 59.7666C93.8232 59.8838 93.7891 60.0075 93.7891 60.1377C93.7891 60.2354 93.8053 60.3232 93.8379 60.4014C93.8737 60.4762 93.9355 60.5462 94.0234 60.6113C94.1113 60.6732 94.235 60.7318 94.3945 60.7871C94.554 60.8424 94.7575 60.8978 95.0049 60.9531C95.4378 61.0508 95.7943 61.168 96.0742 61.3047C96.3542 61.4414 96.5625 61.609 96.6992 61.8076C96.8359 62.0062 96.9043 62.2471 96.9043 62.5303C96.9043 62.7614 96.8555 62.973 96.7578 63.165C96.6634 63.3571 96.5251 63.5231 96.3428 63.6631C96.1637 63.7998 95.9489 63.9072 95.6982 63.9854C95.4508 64.0602 95.1725 64.0977 94.8633 64.0977C94.3978 64.0977 94.0039 64.0146 93.6816 63.8486C93.3594 63.6826 93.1152 63.4678 92.9492 63.2041C92.7832 62.9404 92.7002 62.6621 92.7002 62.3691H93.6084C93.6214 62.6165 93.693 62.8135 93.8232 62.96C93.9535 63.1032 94.113 63.2057 94.3018 63.2676C94.4906 63.3262 94.6777 63.3555 94.8633 63.3555C95.1107 63.3555 95.3174 63.3229 95.4834 63.2578C95.6527 63.1927 95.7812 63.1032 95.8691 62.9893C95.957 62.8753 96.001 62.7451 96.001 62.5986ZM99.0723 58.7168V64H98.1641V58.7168H99.0723ZM98.0957 57.3154C98.0957 57.1689 98.1396 57.0452 98.2275 56.9443C98.3187 56.8434 98.4521 56.793 98.6279 56.793C98.8005 56.793 98.9323 56.8434 99.0234 56.9443C99.1178 57.0452 99.165 57.1689 99.165 57.3154C99.165 57.4554 99.1178 57.5758 99.0234 57.6768C98.9323 57.7744 98.8005 57.8232 98.6279 57.8232C98.4521 57.8232 98.3187 57.7744 98.2275 57.6768C98.1396 57.5758 98.0957 57.4554 98.0957 57.3154ZM102.734 58.7168V59.4102H99.8779V58.7168H102.734ZM100.845 57.4326H101.748V62.6914C101.748 62.8704 101.776 63.0055 101.831 63.0967C101.886 63.1878 101.958 63.248 102.046 63.2773C102.134 63.3066 102.228 63.3213 102.329 63.3213C102.404 63.3213 102.482 63.3148 102.563 63.3018C102.648 63.2855 102.712 63.2725 102.754 63.2627L102.759 64C102.687 64.0228 102.593 64.0439 102.476 64.0635C102.362 64.0863 102.223 64.0977 102.061 64.0977C101.839 64.0977 101.636 64.0537 101.45 63.9658C101.265 63.8779 101.117 63.7314 101.006 63.5264C100.898 63.318 100.845 63.0381 100.845 62.6865V57.4326ZM104.775 58.7168V64H103.867V58.7168H104.775ZM103.799 57.3154C103.799 57.1689 103.843 57.0452 103.931 56.9443C104.022 56.8434 104.155 56.793 104.331 56.793C104.504 56.793 104.635 56.8434 104.727 56.9443C104.821 57.0452 104.868 57.1689 104.868 57.3154C104.868 57.4554 104.821 57.5758 104.727 57.6768C104.635 57.7744 104.504 57.8232 104.331 57.8232C104.155 57.8232 104.022 57.7744 103.931 57.6768C103.843 57.5758 103.799 57.4554 103.799 57.3154ZM105.986 61.417V61.3047C105.986 60.9238 106.042 60.5706 106.152 60.2451C106.263 59.9163 106.423 59.6315 106.631 59.3906C106.839 59.1465 107.091 58.9577 107.388 58.8242C107.684 58.6875 108.016 58.6191 108.384 58.6191C108.755 58.6191 109.089 58.6875 109.385 58.8242C109.684 58.9577 109.938 59.1465 110.146 59.3906C110.358 59.6315 110.519 59.9163 110.63 60.2451C110.741 60.5706 110.796 60.9238 110.796 61.3047V61.417C110.796 61.7979 110.741 62.151 110.63 62.4766C110.519 62.8021 110.358 63.0869 110.146 63.3311C109.938 63.5719 109.686 63.7607 109.39 63.8975C109.097 64.0309 108.765 64.0977 108.394 64.0977C108.022 64.0977 107.689 64.0309 107.393 63.8975C107.096 63.7607 106.842 63.5719 106.631 63.3311C106.423 63.0869 106.263 62.8021 106.152 62.4766C106.042 62.151 105.986 61.7979 105.986 61.417ZM106.89 61.3047V61.417C106.89 61.6807 106.921 61.9297 106.982 62.1641C107.044 62.3952 107.137 62.6003 107.261 62.7793C107.388 62.9583 107.546 63.0999 107.734 63.2041C107.923 63.305 108.143 63.3555 108.394 63.3555C108.641 63.3555 108.857 63.305 109.043 63.2041C109.232 63.0999 109.388 62.9583 109.512 62.7793C109.635 62.6003 109.728 62.3952 109.79 62.1641C109.855 61.9297 109.888 61.6807 109.888 61.417V61.3047C109.888 61.0443 109.855 60.7985 109.79 60.5674C109.728 60.333 109.634 60.1263 109.507 59.9473C109.383 59.765 109.227 59.6217 109.038 59.5176C108.853 59.4134 108.634 59.3613 108.384 59.3613C108.136 59.3613 107.918 59.4134 107.729 59.5176C107.544 59.6217 107.388 59.765 107.261 59.9473C107.137 60.1263 107.044 60.333 106.982 60.5674C106.921 60.7985 106.89 61.0443 106.89 61.3047ZM112.832 59.8447V64H111.929V58.7168H112.783L112.832 59.8447ZM112.617 61.1582L112.241 61.1436C112.244 60.7822 112.298 60.4486 112.402 60.1426C112.507 59.8333 112.653 59.5648 112.842 59.3369C113.031 59.109 113.255 58.9333 113.516 58.8096C113.779 58.6826 114.071 58.6191 114.39 58.6191C114.65 58.6191 114.884 58.6549 115.093 58.7266C115.301 58.7949 115.479 58.9056 115.625 59.0586C115.775 59.2116 115.889 59.4102 115.967 59.6543C116.045 59.8952 116.084 60.1898 116.084 60.5381V64H115.176V60.5283C115.176 60.2516 115.135 60.0303 115.054 59.8643C114.972 59.695 114.854 59.5729 114.697 59.498C114.541 59.4199 114.349 59.3809 114.121 59.3809C113.896 59.3809 113.691 59.4281 113.506 59.5225C113.324 59.6169 113.166 59.7471 113.032 59.9131C112.902 60.0791 112.799 60.2695 112.725 60.4844C112.653 60.696 112.617 60.9206 112.617 61.1582ZM117.417 63.5215C117.417 63.3685 117.464 63.2399 117.559 63.1357C117.656 63.0283 117.796 62.9746 117.979 62.9746C118.161 62.9746 118.299 63.0283 118.394 63.1357C118.491 63.2399 118.54 63.3685 118.54 63.5215C118.54 63.6712 118.491 63.7982 118.394 63.9023C118.299 64.0065 118.161 64.0586 117.979 64.0586C117.796 64.0586 117.656 64.0065 117.559 63.9023C117.464 63.7982 117.417 63.6712 117.417 63.5215ZM117.422 59.21C117.422 59.057 117.469 58.9284 117.563 58.8242C117.661 58.7168 117.801 58.6631 117.983 58.6631C118.166 58.6631 118.304 58.7168 118.398 58.8242C118.496 58.9284 118.545 59.057 118.545 59.21C118.545 59.3597 118.496 59.4867 118.398 59.5908C118.304 59.695 118.166 59.7471 117.983 59.7471C117.801 59.7471 117.661 59.695 117.563 59.5908C117.469 59.4867 117.422 59.3597 117.422 59.21Z"
                          fill={darkMode ? "white" : "black" }
                        />
                        <text
                            x="50%" // Adjust x and y coordinates as needed
                            y="75" // Adjust y coordinates to position each text element vertically
                            fontSize="8"
                            text-anchor="middle"
                            dominant-baseline="middle"
                            letterSpacing="1"
                            fontFamily="Roboto"
                            fill={darkMode === true ? "white" : "black"}
                          >
                            Lat: {trackInfo.geocode[0]}
                          </text>
                        <text
                            x="50%" // Adjust x and y coordinates as needed
                            y="85" // Adjust y coordinates to position each text element vertically
                            fontSize="8"
                            text-anchor="middle"
                            dominant-baseline="middle"
                            letterSpacing="1"
                            fontFamily="Roboto"
                            fill={darkMode === true ? "white" : "black"}
                          >
                            Long: {trackInfo.geocode[1]}
                          </text>
                          {/* lattitude and longi */}
                        <path
                          d="M50.749 209H49.2646L49.2744 208.233H50.749C51.2568 208.233 51.68 208.128 52.0186 207.916C52.3571 207.701 52.611 207.402 52.7803 207.018C52.9528 206.63 53.0391 206.178 53.0391 205.66V205.226C53.0391 204.819 52.9902 204.457 52.8926 204.142C52.7949 203.823 52.6517 203.554 52.4629 203.336C52.2741 203.115 52.043 202.947 51.7695 202.833C51.4993 202.719 51.1885 202.662 50.8369 202.662H49.2354V201.891H50.8369C51.3024 201.891 51.7272 201.969 52.1113 202.125C52.4954 202.278 52.8258 202.501 53.1025 202.794C53.3825 203.084 53.5973 203.435 53.7471 203.849C53.8968 204.259 53.9717 204.721 53.9717 205.235V205.66C53.9717 206.174 53.8968 206.638 53.7471 207.052C53.5973 207.462 53.3809 207.812 53.0977 208.102C52.8177 208.391 52.4792 208.614 52.082 208.771C51.6882 208.924 51.2438 209 50.749 209ZM49.7676 201.891V209H48.8252V201.891H49.7676ZM57.4434 209.098C57.0755 209.098 56.7419 209.036 56.4424 208.912C56.1462 208.785 55.8906 208.608 55.6758 208.38C55.4642 208.152 55.3014 207.882 55.1875 207.569C55.0736 207.257 55.0166 206.915 55.0166 206.544V206.339C55.0166 205.909 55.0801 205.527 55.207 205.191C55.334 204.853 55.5065 204.566 55.7246 204.332C55.9427 204.098 56.1901 203.92 56.4668 203.8C56.7435 203.679 57.0299 203.619 57.3262 203.619C57.7038 203.619 58.0293 203.684 58.3027 203.814C58.5794 203.945 58.8057 204.127 58.9814 204.361C59.1572 204.592 59.2874 204.866 59.3721 205.182C59.4567 205.494 59.499 205.836 59.499 206.207V206.612H55.5537V205.875H58.5957V205.807C58.5827 205.572 58.5339 205.344 58.4492 205.123C58.3678 204.902 58.2376 204.719 58.0586 204.576C57.8796 204.433 57.6354 204.361 57.3262 204.361C57.1211 204.361 56.9323 204.405 56.7598 204.493C56.5872 204.578 56.4391 204.705 56.3154 204.874C56.1917 205.043 56.0957 205.25 56.0273 205.494C55.959 205.738 55.9248 206.02 55.9248 206.339V206.544C55.9248 206.795 55.959 207.031 56.0273 207.252C56.099 207.47 56.2015 207.662 56.335 207.828C56.4717 207.994 56.6361 208.124 56.8281 208.219C57.0234 208.313 57.2448 208.36 57.4922 208.36C57.8112 208.36 58.0814 208.295 58.3027 208.165C58.5241 208.035 58.7178 207.861 58.8838 207.643L59.4307 208.077C59.3167 208.25 59.1719 208.414 58.9961 208.57C58.8203 208.727 58.6038 208.854 58.3467 208.951C58.0928 209.049 57.7917 209.098 57.4434 209.098ZM62.7656 203.717V204.41H59.9092V203.717H62.7656ZM60.876 202.433H61.7793V207.691C61.7793 207.87 61.807 208.006 61.8623 208.097C61.9176 208.188 61.9893 208.248 62.0771 208.277C62.165 208.307 62.2594 208.321 62.3604 208.321C62.4352 208.321 62.5133 208.315 62.5947 208.302C62.6794 208.285 62.7428 208.272 62.7852 208.263L62.79 209C62.7184 209.023 62.624 209.044 62.5068 209.063C62.3929 209.086 62.2546 209.098 62.0918 209.098C61.8704 209.098 61.667 209.054 61.4814 208.966C61.2959 208.878 61.1478 208.731 61.0371 208.526C60.9297 208.318 60.876 208.038 60.876 207.687V202.433ZM66.0176 209.098C65.6497 209.098 65.3161 209.036 65.0166 208.912C64.7204 208.785 64.4648 208.608 64.25 208.38C64.0384 208.152 63.8757 207.882 63.7617 207.569C63.6478 207.257 63.5908 206.915 63.5908 206.544V206.339C63.5908 205.909 63.6543 205.527 63.7812 205.191C63.9082 204.853 64.0807 204.566 64.2988 204.332C64.5169 204.098 64.7643 203.92 65.041 203.8C65.3177 203.679 65.6042 203.619 65.9004 203.619C66.278 203.619 66.6035 203.684 66.877 203.814C67.1536 203.945 67.3799 204.127 67.5557 204.361C67.7314 204.592 67.8617 204.866 67.9463 205.182C68.0309 205.494 68.0732 205.836 68.0732 206.207V206.612H64.1279V205.875H67.1699V205.807C67.1569 205.572 67.1081 205.344 67.0234 205.123C66.9421 204.902 66.8118 204.719 66.6328 204.576C66.4538 204.433 66.2096 204.361 65.9004 204.361C65.6953 204.361 65.5065 204.405 65.334 204.493C65.1615 204.578 65.0133 204.705 64.8896 204.874C64.766 205.043 64.6699 205.25 64.6016 205.494C64.5332 205.738 64.499 206.02 64.499 206.339V206.544C64.499 206.795 64.5332 207.031 64.6016 207.252C64.6732 207.47 64.7757 207.662 64.9092 207.828C65.0459 207.994 65.2103 208.124 65.4023 208.219C65.5977 208.313 65.819 208.36 66.0664 208.36C66.3854 208.36 66.6556 208.295 66.877 208.165C67.0983 208.035 67.292 207.861 67.458 207.643L68.0049 208.077C67.891 208.25 67.7461 208.414 67.5703 208.57C67.3945 208.727 67.1781 208.854 66.9209 208.951C66.667 209.049 66.3659 209.098 66.0176 209.098ZM71.2422 208.355C71.457 208.355 71.6556 208.312 71.8379 208.224C72.0202 208.136 72.1699 208.015 72.2871 207.862C72.4043 207.706 72.471 207.529 72.4873 207.33H73.3467C73.3304 207.643 73.2246 207.934 73.0293 208.204C72.8372 208.471 72.585 208.688 72.2725 208.854C71.96 209.016 71.6165 209.098 71.2422 209.098C70.8451 209.098 70.4984 209.028 70.2021 208.888C69.9092 208.748 69.665 208.556 69.4697 208.312C69.2777 208.067 69.1328 207.787 69.0352 207.472C68.9408 207.153 68.8936 206.816 68.8936 206.461V206.256C68.8936 205.901 68.9408 205.566 69.0352 205.25C69.1328 204.931 69.2777 204.649 69.4697 204.405C69.665 204.161 69.9092 203.969 70.2021 203.829C70.4984 203.689 70.8451 203.619 71.2422 203.619C71.6556 203.619 72.0169 203.704 72.3262 203.873C72.6354 204.039 72.8779 204.267 73.0537 204.557C73.2327 204.843 73.3304 205.169 73.3467 205.533H72.4873C72.471 205.315 72.4092 205.118 72.3018 204.942C72.1976 204.767 72.0544 204.627 71.8721 204.522C71.693 204.415 71.4831 204.361 71.2422 204.361C70.9655 204.361 70.7327 204.417 70.5439 204.527C70.3584 204.635 70.2103 204.781 70.0996 204.967C69.9922 205.149 69.9141 205.353 69.8652 205.577C69.8197 205.799 69.7969 206.025 69.7969 206.256V206.461C69.7969 206.692 69.8197 206.92 69.8652 207.145C69.9108 207.369 69.9873 207.573 70.0947 207.755C70.2054 207.937 70.3535 208.084 70.5391 208.194C70.7279 208.302 70.9622 208.355 71.2422 208.355ZM76.5742 203.717V204.41H73.7178V203.717H76.5742ZM74.6846 202.433H75.5879V207.691C75.5879 207.87 75.6156 208.006 75.6709 208.097C75.7262 208.188 75.7979 208.248 75.8857 208.277C75.9736 208.307 76.068 208.321 76.1689 208.321C76.2438 208.321 76.3219 208.315 76.4033 208.302C76.488 208.285 76.5514 208.272 76.5938 208.263L76.5986 209C76.527 209.023 76.4326 209.044 76.3154 209.063C76.2015 209.086 76.0632 209.098 75.9004 209.098C75.679 209.098 75.4756 209.054 75.29 208.966C75.1045 208.878 74.9564 208.731 74.8457 208.526C74.7383 208.318 74.6846 208.038 74.6846 207.687V202.433ZM79.8262 209.098C79.4583 209.098 79.1247 209.036 78.8252 208.912C78.529 208.785 78.2734 208.608 78.0586 208.38C77.847 208.152 77.6842 207.882 77.5703 207.569C77.4564 207.257 77.3994 206.915 77.3994 206.544V206.339C77.3994 205.909 77.4629 205.527 77.5898 205.191C77.7168 204.853 77.8893 204.566 78.1074 204.332C78.3255 204.098 78.5729 203.92 78.8496 203.8C79.1263 203.679 79.4128 203.619 79.709 203.619C80.0866 203.619 80.4121 203.684 80.6855 203.814C80.9622 203.945 81.1885 204.127 81.3643 204.361C81.54 204.592 81.6702 204.866 81.7549 205.182C81.8395 205.494 81.8818 205.836 81.8818 206.207V206.612H77.9365V205.875H80.9785V205.807C80.9655 205.572 80.9167 205.344 80.832 205.123C80.7507 204.902 80.6204 204.719 80.4414 204.576C80.2624 204.433 80.0182 204.361 79.709 204.361C79.5039 204.361 79.3151 204.405 79.1426 204.493C78.9701 204.578 78.8219 204.705 78.6982 204.874C78.5745 205.043 78.4785 205.25 78.4102 205.494C78.3418 205.738 78.3076 206.02 78.3076 206.339V206.544C78.3076 206.795 78.3418 207.031 78.4102 207.252C78.4818 207.47 78.5843 207.662 78.7178 207.828C78.8545 207.994 79.0189 208.124 79.2109 208.219C79.4062 208.313 79.6276 208.36 79.875 208.36C80.194 208.36 80.4642 208.295 80.6855 208.165C80.9069 208.035 81.1006 207.861 81.2666 207.643L81.8135 208.077C81.6995 208.25 81.5547 208.414 81.3789 208.57C81.2031 208.727 80.9867 208.854 80.7295 208.951C80.4756 209.049 80.1745 209.098 79.8262 209.098ZM86.2666 207.975V201.5H87.1748V209H86.3447L86.2666 207.975ZM82.7119 206.417V206.314C82.7119 205.911 82.7607 205.545 82.8584 205.216C82.9593 204.884 83.1009 204.599 83.2832 204.361C83.4688 204.124 83.6885 203.941 83.9424 203.814C84.1995 203.684 84.486 203.619 84.8018 203.619C85.1338 203.619 85.4235 203.678 85.6709 203.795C85.9215 203.909 86.1331 204.076 86.3057 204.298C86.4814 204.516 86.6198 204.78 86.7207 205.089C86.8216 205.398 86.8916 205.748 86.9307 206.139V206.588C86.8949 206.975 86.8249 207.324 86.7207 207.633C86.6198 207.942 86.4814 208.206 86.3057 208.424C86.1331 208.642 85.9215 208.81 85.6709 208.927C85.4202 209.041 85.1273 209.098 84.792 209.098C84.4827 209.098 84.1995 209.031 83.9424 208.897C83.6885 208.764 83.4688 208.577 83.2832 208.336C83.1009 208.095 82.9593 207.812 82.8584 207.486C82.7607 207.158 82.7119 206.801 82.7119 206.417ZM83.6201 206.314V206.417C83.6201 206.681 83.6462 206.928 83.6982 207.159C83.7536 207.39 83.8382 207.594 83.9521 207.77C84.0661 207.945 84.2109 208.084 84.3867 208.185C84.5625 208.282 84.7725 208.331 85.0166 208.331C85.3161 208.331 85.5618 208.268 85.7539 208.141C85.9492 208.014 86.1055 207.846 86.2227 207.638C86.3398 207.429 86.431 207.203 86.4961 206.959V205.782C86.457 205.603 86.4001 205.431 86.3252 205.265C86.2536 205.095 86.1592 204.946 86.042 204.815C85.9281 204.682 85.7865 204.576 85.6172 204.498C85.4512 204.42 85.2542 204.381 85.0264 204.381C84.779 204.381 84.5658 204.433 84.3867 204.537C84.2109 204.638 84.0661 204.778 83.9521 204.957C83.8382 205.133 83.7536 205.338 83.6982 205.572C83.6462 205.803 83.6201 206.051 83.6201 206.314ZM93.8203 206.212H91.9209V205.445H93.8203C94.1882 205.445 94.486 205.387 94.7139 205.27C94.9417 205.152 95.1077 204.99 95.2119 204.781C95.3193 204.573 95.373 204.335 95.373 204.068C95.373 203.824 95.3193 203.595 95.2119 203.38C95.1077 203.165 94.9417 202.993 94.7139 202.862C94.486 202.729 94.1882 202.662 93.8203 202.662H92.1406V209H91.1982V201.891H93.8203C94.3574 201.891 94.8115 201.983 95.1826 202.169C95.5537 202.354 95.8353 202.612 96.0273 202.94C96.2194 203.266 96.3154 203.639 96.3154 204.059C96.3154 204.514 96.2194 204.903 96.0273 205.226C95.8353 205.548 95.5537 205.794 95.1826 205.963C94.8115 206.129 94.3574 206.212 93.8203 206.212ZM97.0625 206.417V206.305C97.0625 205.924 97.1178 205.571 97.2285 205.245C97.3392 204.916 97.4987 204.632 97.707 204.391C97.9154 204.146 98.1676 203.958 98.4639 203.824C98.7601 203.688 99.0921 203.619 99.46 203.619C99.8311 203.619 100.165 203.688 100.461 203.824C100.76 203.958 101.014 204.146 101.223 204.391C101.434 204.632 101.595 204.916 101.706 205.245C101.817 205.571 101.872 205.924 101.872 206.305V206.417C101.872 206.798 101.817 207.151 101.706 207.477C101.595 207.802 101.434 208.087 101.223 208.331C101.014 208.572 100.762 208.761 100.466 208.897C100.173 209.031 99.8408 209.098 99.4697 209.098C99.0986 209.098 98.765 209.031 98.4688 208.897C98.1725 208.761 97.9186 208.572 97.707 208.331C97.4987 208.087 97.3392 207.802 97.2285 207.477C97.1178 207.151 97.0625 206.798 97.0625 206.417ZM97.9658 206.305V206.417C97.9658 206.681 97.9967 206.93 98.0586 207.164C98.1204 207.395 98.2132 207.6 98.3369 207.779C98.4639 207.958 98.6217 208.1 98.8105 208.204C98.9993 208.305 99.2191 208.355 99.4697 208.355C99.7171 208.355 99.9336 208.305 100.119 208.204C100.308 208.1 100.464 207.958 100.588 207.779C100.712 207.6 100.804 207.395 100.866 207.164C100.931 206.93 100.964 206.681 100.964 206.417V206.305C100.964 206.044 100.931 205.799 100.866 205.567C100.804 205.333 100.71 205.126 100.583 204.947C100.459 204.765 100.303 204.622 100.114 204.518C99.9287 204.413 99.7106 204.361 99.46 204.361C99.2126 204.361 98.9945 204.413 98.8057 204.518C98.6201 204.622 98.4639 204.765 98.3369 204.947C98.2132 205.126 98.1204 205.333 98.0586 205.567C97.9967 205.799 97.9658 206.044 97.9658 206.305ZM106.081 207.599C106.081 207.468 106.052 207.348 105.993 207.237C105.938 207.123 105.822 207.021 105.646 206.93C105.474 206.835 105.214 206.754 104.865 206.686C104.572 206.624 104.307 206.55 104.069 206.466C103.835 206.381 103.635 206.279 103.469 206.158C103.306 206.038 103.181 205.896 103.093 205.733C103.005 205.571 102.961 205.38 102.961 205.162C102.961 204.954 103.007 204.757 103.098 204.571C103.192 204.386 103.324 204.221 103.493 204.078C103.666 203.935 103.872 203.823 104.113 203.741C104.354 203.66 104.623 203.619 104.919 203.619C105.342 203.619 105.703 203.694 106.003 203.844C106.302 203.993 106.532 204.194 106.691 204.444C106.851 204.692 106.931 204.967 106.931 205.27H106.027C106.027 205.123 105.983 204.981 105.896 204.845C105.811 204.705 105.686 204.589 105.52 204.498C105.357 204.407 105.157 204.361 104.919 204.361C104.668 204.361 104.465 204.4 104.309 204.479C104.156 204.553 104.043 204.649 103.972 204.767C103.903 204.884 103.869 205.007 103.869 205.138C103.869 205.235 103.885 205.323 103.918 205.401C103.954 205.476 104.016 205.546 104.104 205.611C104.191 205.673 104.315 205.732 104.475 205.787C104.634 205.842 104.838 205.898 105.085 205.953C105.518 206.051 105.874 206.168 106.154 206.305C106.434 206.441 106.643 206.609 106.779 206.808C106.916 207.006 106.984 207.247 106.984 207.53C106.984 207.761 106.936 207.973 106.838 208.165C106.743 208.357 106.605 208.523 106.423 208.663C106.244 208.8 106.029 208.907 105.778 208.985C105.531 209.06 105.253 209.098 104.943 209.098C104.478 209.098 104.084 209.015 103.762 208.849C103.439 208.683 103.195 208.468 103.029 208.204C102.863 207.94 102.78 207.662 102.78 207.369H103.688C103.701 207.617 103.773 207.813 103.903 207.96C104.034 208.103 104.193 208.206 104.382 208.268C104.571 208.326 104.758 208.355 104.943 208.355C105.191 208.355 105.397 208.323 105.563 208.258C105.733 208.193 105.861 208.103 105.949 207.989C106.037 207.875 106.081 207.745 106.081 207.599ZM109.152 203.717V209H108.244V203.717H109.152ZM108.176 202.315C108.176 202.169 108.22 202.045 108.308 201.944C108.399 201.843 108.532 201.793 108.708 201.793C108.881 201.793 109.012 201.843 109.104 201.944C109.198 202.045 109.245 202.169 109.245 202.315C109.245 202.455 109.198 202.576 109.104 202.677C109.012 202.774 108.881 202.823 108.708 202.823C108.532 202.823 108.399 202.774 108.308 202.677C108.22 202.576 108.176 202.455 108.176 202.315ZM112.814 203.717V204.41H109.958V203.717H112.814ZM110.925 202.433H111.828V207.691C111.828 207.87 111.856 208.006 111.911 208.097C111.966 208.188 112.038 208.248 112.126 208.277C112.214 208.307 112.308 208.321 112.409 208.321C112.484 208.321 112.562 208.315 112.644 208.302C112.728 208.285 112.792 208.272 112.834 208.263L112.839 209C112.767 209.023 112.673 209.044 112.556 209.063C112.442 209.086 112.303 209.098 112.141 209.098C111.919 209.098 111.716 209.054 111.53 208.966C111.345 208.878 111.197 208.731 111.086 208.526C110.979 208.318 110.925 208.038 110.925 207.687V202.433ZM114.855 203.717V209H113.947V203.717H114.855ZM113.879 202.315C113.879 202.169 113.923 202.045 114.011 201.944C114.102 201.843 114.235 201.793 114.411 201.793C114.584 201.793 114.715 201.843 114.807 201.944C114.901 202.045 114.948 202.169 114.948 202.315C114.948 202.455 114.901 202.576 114.807 202.677C114.715 202.774 114.584 202.823 114.411 202.823C114.235 202.823 114.102 202.774 114.011 202.677C113.923 202.576 113.879 202.455 113.879 202.315ZM116.066 206.417V206.305C116.066 205.924 116.122 205.571 116.232 205.245C116.343 204.916 116.503 204.632 116.711 204.391C116.919 204.146 117.172 203.958 117.468 203.824C117.764 203.688 118.096 203.619 118.464 203.619C118.835 203.619 119.169 203.688 119.465 203.824C119.764 203.958 120.018 204.146 120.227 204.391C120.438 204.632 120.599 204.916 120.71 205.245C120.821 205.571 120.876 205.924 120.876 206.305V206.417C120.876 206.798 120.821 207.151 120.71 207.477C120.599 207.802 120.438 208.087 120.227 208.331C120.018 208.572 119.766 208.761 119.47 208.897C119.177 209.031 118.845 209.098 118.474 209.098C118.103 209.098 117.769 209.031 117.473 208.897C117.176 208.761 116.923 208.572 116.711 208.331C116.503 208.087 116.343 207.802 116.232 207.477C116.122 207.151 116.066 206.798 116.066 206.417ZM116.97 206.305V206.417C116.97 206.681 117.001 206.93 117.062 207.164C117.124 207.395 117.217 207.6 117.341 207.779C117.468 207.958 117.626 208.1 117.814 208.204C118.003 208.305 118.223 208.355 118.474 208.355C118.721 208.355 118.938 208.305 119.123 208.204C119.312 208.1 119.468 207.958 119.592 207.779C119.715 207.6 119.808 207.395 119.87 207.164C119.935 206.93 119.968 206.681 119.968 206.417V206.305C119.968 206.044 119.935 205.799 119.87 205.567C119.808 205.333 119.714 205.126 119.587 204.947C119.463 204.765 119.307 204.622 119.118 204.518C118.933 204.413 118.715 204.361 118.464 204.361C118.216 204.361 117.998 204.413 117.81 204.518C117.624 204.622 117.468 204.765 117.341 204.947C117.217 205.126 117.124 205.333 117.062 205.567C117.001 205.799 116.97 206.044 116.97 206.305ZM122.912 204.845V209H122.009V203.717H122.863L122.912 204.845ZM122.697 206.158L122.321 206.144C122.325 205.782 122.378 205.449 122.482 205.143C122.587 204.833 122.733 204.565 122.922 204.337C123.111 204.109 123.335 203.933 123.596 203.81C123.859 203.683 124.151 203.619 124.47 203.619C124.73 203.619 124.965 203.655 125.173 203.727C125.381 203.795 125.559 203.906 125.705 204.059C125.855 204.212 125.969 204.41 126.047 204.654C126.125 204.895 126.164 205.19 126.164 205.538V209H125.256V205.528C125.256 205.252 125.215 205.03 125.134 204.864C125.052 204.695 124.934 204.573 124.777 204.498C124.621 204.42 124.429 204.381 124.201 204.381C123.977 204.381 123.771 204.428 123.586 204.522C123.404 204.617 123.246 204.747 123.112 204.913C122.982 205.079 122.88 205.27 122.805 205.484C122.733 205.696 122.697 205.921 122.697 206.158ZM127.497 208.521C127.497 208.368 127.544 208.24 127.639 208.136C127.736 208.028 127.876 207.975 128.059 207.975C128.241 207.975 128.379 208.028 128.474 208.136C128.571 208.24 128.62 208.368 128.62 208.521C128.62 208.671 128.571 208.798 128.474 208.902C128.379 209.007 128.241 209.059 128.059 209.059C127.876 209.059 127.736 209.007 127.639 208.902C127.544 208.798 127.497 208.671 127.497 208.521ZM127.502 204.21C127.502 204.057 127.549 203.928 127.644 203.824C127.741 203.717 127.881 203.663 128.063 203.663C128.246 203.663 128.384 203.717 128.479 203.824C128.576 203.928 128.625 204.057 128.625 204.21C128.625 204.36 128.576 204.487 128.479 204.591C128.384 204.695 128.246 204.747 128.063 204.747C127.881 204.747 127.741 204.695 127.644 204.591C127.549 204.487 127.502 204.36 127.502 204.21Z"
                          fill={darkMode ? "white" : "black" }
                        />
                        <text
                            x="50%" // Adjust x and y coordinates as needed
                            y="220" // Adjust y coordinates to position each text element vertically
                            fontSize="8"
                            text-anchor="middle"
                            dominant-baseline="middle"
                            letterSpacing="1"
                            fontFamily="Roboto"
                            fill={darkMode === true ? "white" : "black"}
                          >
                            Lat: {trackInfo.startPosition[0]}
                          </text>
                        <text
                            x="50%" // Adjust x and y coordinates as needed
                            y="235" // Adjust y coordinates to position each text element vertically
                            fontSize="8"
                            text-anchor="middle"
                            dominant-baseline="middle"
                            letterSpacing="1"
                            fontFamily="Roboto"
                            fill={darkMode === true ? "white" : "black"}
                          >
                            Long: {trackInfo.startPosition[1]}
                          </text>
                        <line
                          x1="85.5"
                          y1="102"
                          x2="85.5"
                          y2="199"
                          stroke="#67CCF7"
                          stroke-dasharray="2 2"
                        />
                        <g filter="url(#filter1_f_897_4314)">
                          <line
                            x1="85.5"
                            y1="163"
                            x2="85.5"
                            y2="199"
                            stroke={darkMode ? "#2ADFD3" : "#6B5B95" }
                            stroke-width="3"
                          />
                        </g>
                        <line
                          x1="85.5"
                          y1="163"
                          x2="85.5"
                          y2="199"
                          stroke={darkMode ? "#2ADFD3" : "#6B5B95" }
                          stroke-width="3"
                        />
                        <path
                          d="M85.5 153L90.2631 165H80.7369L85.5 153Z"
                          fill={darkMode ? "#2ADFD3" : "#6B5B95" }
                        />
                        <path
                          d="M16.677 0.500007L160.5 0.500001L160.5 25.5L3.8194 25.5L16.677 0.500007Z"
                          fill={darkMode ? "#2ADFD3" : "#6B5B95" }
                          fill-opacity="0.3"
                          stroke={darkMode ? "#CF7AD1" : "#F2FF61" }
                        />
                          <text
                            x="50%" // Adjust x and y coordinates as needed
                            y="15" // Adjust y coordinates to position each text element vertically
                            fontSize="15"
                            text-anchor="middle"
                            dominant-baseline="middle"
                            letterSpacing="1"
                            fontFamily="Roboto"
                            fill={darkMode === true ? "white" : "black"}
                          >
                            {trackInfo.info.Name}
                          </text>
                        <defs>
                          <filter
                            id="filter0_f_897_4314"
                            x="0"
                            y="30"
                            width="165.336"
                            height="240.947"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="BackgroundImageFix"
                              result="shape"
                            />
                            <feGaussianBlur
                              stdDeviation="2"
                              result="effect1_foregroundBlur_897_4314"
                            />
                          </filter>
                          <filter
                            id="filter1_f_897_4314"
                            x="82.2"
                            y="161.2"
                            width="6.6"
                            height="39.6"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="BackgroundImageFix"
                              result="shape"
                            />
                            <feGaussianBlur
                              stdDeviation="0.9"
                              result="effect1_foregroundBlur_897_4314"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </Popup>
                )}
              </Marker>
            </MarkerClusterGroup>
          ) : null;
        })}
        {isCircleVisible &&
          markersInit.map(
            (marker, index) =>
              marker.targetType === 0 && (
                <Circle
                  key={`circle-${index}`}
                  center={marker.geocode}
                  radius={750000}
                  color={fillCircle}
                  weight={0}
                  opacity={0.4}
                  fillColor={fillCircle}
                  fillOpacity={0.4}
                  // dashArray="8,8"
                />
              )
          )}
        <LocationMarker />
        <AreaSelect setBounds={setBounds} />
        {markersInit.map((marker, index) => {
          return isVisible[index] ? (
            <Polyline
              key={index}
              weight="2"
              dashArray="5, 5"
              dashOffset="2"
              positions={marker.path}
              color={marker.color}
            /> // marker.color
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

export default WorldMap;
