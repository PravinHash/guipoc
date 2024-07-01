import React, { useState } from "react";
import "../styles/CircleMenu.css"; // Create a CSS file for styling

const CircleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const rotate = (li, d) => {
    const rotation = `rotate(${d}deg)`;
    li.style.transform = rotation;
    li.querySelector("label").style.transform = `rotate(${-d}deg)`;
  };

  const toggleOptions = () => {
    setIsOpen(!isOpen);
    const liElements = document.querySelectorAll(".selector li");
    const deg = isOpen ? 360 / liElements.length : 0;

    liElements.forEach((li, i) => {
      const d = isOpen ? i * deg : 0;
      rotate(li, d);
    });
  };

  return (
    <div className={`selector ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <input id="c1" type="checkbox" />
          <label for="c1">Menu 1</label>
        </li>
        <li>
          <input id="c2" type="checkbox" />
          <label for="c2">Menu 2</label>
        </li>
        <li>
          <input id="c3" type="checkbox" />
          <label for="c3">Menu 3</label>
        </li>
        <li>
          <input id="c4" type="checkbox" />
          <label for="c4">Menu 4</label>
        </li>
        <li>
          <input id="c5" type="checkbox" />
          <label for="c5">Menu 5</label>
        </li>
        <li>
          <input id="c6" type="checkbox" />
          <label for="c6">Menu 6</label>
        </li>
        <li>
          <input id="c7" type="checkbox" />
          <label for="c7">Menu 7</label>
        </li>
        <li>
          <input id="c8" type="checkbox" />
          <label for="c8">Menu 8</label>
        </li>
      </ul>
      <button onClick={toggleOptions}>Click to toggle the menus</button>
    </div>
  );
};

export default CircleMenu;
