import React, { useState, useEffect } from "react";
import "../styles/ControlPanel.css";
import { left, right, up, down } from "../assets";
import Draggable from "react-draggable";

const ControlPanel = () => {
  const [course, setCourse] = useState(300);
  const [depth, setDepth] = useState(10);
  const [speed, setSpeed] = useState(40);
  const [prevSpeed, setPrevSpeed] = useState(speed);
  const [prevDepth, setPrevDepth] = useState(depth);
  const [prevCourse, setPrevCourse] = useState(course);

  useEffect(() => {
    const updateValues = () => {
      const randomIncrement = Math.random() > 0.5;
      const incrementValue = randomIncrement ? 1 : -1;

      setPrevSpeed(speed);
      setPrevDepth(depth);
      setPrevCourse(course);

      setCourse((prevCourse) => prevCourse + incrementValue);
      setDepth((prevDepth) => prevDepth + incrementValue);
      setSpeed((prevSpeed) => prevSpeed + incrementValue);
    };

    const intervalId = setInterval(updateValues, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [speed, depth, course]);

  return (
    <Draggable >
      <div className="control-panel" style={{backgroundColor: "var(--primary-color)"}}>
        <div className="panel-item">
          <div
            className={`image-item panel-btn`}
            style={{
              backgroundColor: "var(--tertiary-color)",
              borderRadius: "10px",
            }}
          >
            <span>COURSE (°)</span>
          </div>
          <div className="image-item panel-btn">
            <span>{course}</span>
          </div>
          <div className="logo-container move-btn">
            <img
              src={left}
              alt="Logo"
              className={`left-btn ${
                prevCourse > course ? "blinking-left" : ""
              }`}
            />
            <img
              src={right}
              alt="Toggle"
              className={`right-btn ${
                prevCourse > course ? "" : "blinking-right"
              }`}
            />
          </div>
        </div>
        <hr />
        <div className="panel-item">
          <div
            className={`image-item panel-btn `}
            style={{
              backgroundColor: "var(--tertiary-color)",
              borderRadius: "10px",
            }}
          >
            <span>DEPTH (m)</span>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              className="logo-container center-btn"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <img
                src={up}
                alt="Logo"
                className={`up-btn ${
                  prevDepth > depth ? "blinking-left" : ""
                }`}
              />
              <img
                src={down}
                alt="Toggle"
                className={`down-btn ${
                  prevDepth > depth ? "" : "blinking-right"
                }`}
              />
            </div>
            <div className="image-item center-btn">
              <span>{depth}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="panel-item">
          <div
            className={`image-item panel-btn `}
            style={{
              backgroundColor: "var(--tertiary-color)",
              borderRadius: "10px",
            }}
          >
            <span>SPEED (nɒt)</span>
          </div>
          <div className="image-item panel-btn">
            <span>{speed}</span>
          </div>
          <div className="logo-container move-btn">
            <img
              src={left}
              alt="Logo"
              className={`left-btn ${
                prevSpeed > speed ? "blinking-left" : ""
              }`}
            />
            <img
              src={right}
              alt="Toggle"
              className={`right-btn ${
                prevSpeed > speed ? "" : "blinking-right"
              }`}
            />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ControlPanel;
