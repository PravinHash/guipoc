import React, { useState } from "react";
import "../styles/TargetList.css";
import {
  cargo_img,
  submarine,
  warship,
  red_surface,
  green_surface,
  blue_surface,
  red_subsurface,
  green_subsurface,
  unknown,
} from "../assets";
import { markers } from "../utils/Constant";
import Draggable from "react-draggable";
export default function TargetList({ targetList, darkMode }) {

  const getImage = (condition) => {
    if (condition === 1) {
      return cargo_img;
    } else if (condition === 2) {
      return submarine;
    } else if (condition === 3) {
      return warship;
    } else {
      // Default condition or fallback if none of the specified conditions match
      return cargo_img;
    }
  };

  const getIcon = (type) => {
    console.log("Type:", type);

    if (type === 11) {
      console.log("Condition 1 met");
      return red_surface;
    } else if (type === 12) {
      console.log("Condition 2 met");
      return green_surface;
    } else if (type === 13) {
      console.log("Condition 3 met");
      return blue_surface;
    } else if (type === 21) {
      console.log("Condition 4 met");
      return red_subsurface;
    } else if (type === 23) {
      console.log("Condition 5 met");
      return green_subsurface;
    } else {
      console.log("Default condition");
      return unknown;
    }
  };

  return (
    targetList && (
      <Draggable>
      <div className="target-list">
        <svg
          width="314"
          height="405"
          viewBox="0 0 314 405"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M263.429 0.5H299.647V404.314H266.478L249.689 389.052L249.546 388.922H249.353H52.3334H52.1401L51.9971 389.052L35.2088 404.314H14.353V40.0196V0.5H38.2578L51.9618 15.7266L52.1107 15.8922H52.3334H249.353H249.576L249.725 15.7266L263.429 0.5Z"
            fill={darkMode ? "#CF7AD1" : "#F2FF61"}
            fill-opacity="0.3"
            stroke={darkMode ? "#CF7AD1" : "#F2FF61"}
          />
          <path
            d="M0 33.8629L15.3922 18.4707V172.392L0 157V33.8629Z"
            fill={darkMode ? "#2ADFD3" : "#6B5B95"}
          />
          <path
            d="M0 195.481L15.3922 180.088V309.382L0 293.99V195.481Z"
            fill={darkMode ? "#2ADFD3" : "#6B5B95"}
          />
          <path
            d="M314 40.0191L298.608 24.627V375.568L314 360.176V40.0191Z"
            fill={darkMode ? "#2ADFD3" : "#6B5B95"}
          />
          <path
            d="M290 22V66H24V44.9554L50.3742 22H290Z"
            fill={darkMode ? "#CF7AD1" : "#6B5B95"}
            stroke={darkMode ? "#2ADFD3" : "#F2FF61"}
            stroke-width="2"
          />
          <path
            d="M131.271 44.2695C131.271 50.3447 126.346 55.2695 120.271 55.2695C114.196 55.2695 109.271 50.3447 109.271 44.2695C109.271 38.1944 114.196 33.2695 120.271 33.2695C126.346 33.2695 131.271 38.1944 131.271 44.2695ZM110.972 44.2695C110.972 49.4054 115.135 53.5688 120.271 53.5688C125.407 53.5688 129.57 49.4054 129.57 44.2695C129.57 39.1337 125.407 34.9702 120.271 34.9702C115.135 34.9702 110.972 39.1337 110.972 44.2695Z"
            fill="#2ADFD3"
          />
          <path
            d="M110.972 44.2695C110.972 49.4054 115.135 53.5688 120.271 53.5688M110.972 44.2695C110.972 39.1337 115.135 34.9702 120.271 34.9702M110.972 44.2695H120.271M120.271 53.5688C125.407 53.5688 129.57 49.4054 129.57 44.2695M120.271 53.5688V44.2695M129.57 44.2695C129.57 39.1337 125.407 34.9702 120.271 34.9702M129.57 44.2695H120.271M120.271 34.9702V44.2695M131.271 44.2695C131.271 50.3447 126.346 55.2695 120.271 55.2695C114.196 55.2695 109.271 50.3447 109.271 44.2695C109.271 38.1944 114.196 33.2695 120.271 33.2695C126.346 33.2695 131.271 38.1944 131.271 44.2695Z"
            stroke="#2ADFD3"
            stroke-width="1.83333"
          />
          <path
            d="M159.107 37.9727V50.7695H156.918V37.9727H159.107ZM163.124 37.9727V39.7305H152.937V37.9727H163.124ZM168.784 48.8623V44.3271C168.784 43.9873 168.722 43.6943 168.599 43.4482C168.476 43.2021 168.289 43.0117 168.037 42.877C167.791 42.7422 167.48 42.6748 167.105 42.6748C166.759 42.6748 166.46 42.7334 166.208 42.8506C165.957 42.9678 165.76 43.126 165.62 43.3252C165.479 43.5244 165.409 43.75 165.409 44.002H163.299C163.299 43.627 163.39 43.2637 163.572 42.9121C163.753 42.5605 164.017 42.2471 164.363 41.9717C164.708 41.6963 165.122 41.4795 165.602 41.3213C166.083 41.1631 166.622 41.084 167.219 41.084C167.934 41.084 168.567 41.2041 169.118 41.4443C169.674 41.6846 170.111 42.0479 170.427 42.5342C170.75 43.0146 170.911 43.6182 170.911 44.3447V48.5723C170.911 49.0059 170.94 49.3955 170.999 49.7412C171.063 50.0811 171.154 50.377 171.271 50.6289V50.7695H169.1C169 50.541 168.921 50.251 168.863 49.8994C168.81 49.542 168.784 49.1963 168.784 48.8623ZM169.091 44.9863L169.109 46.2959H167.588C167.196 46.2959 166.85 46.334 166.551 46.4102C166.252 46.4805 166.003 46.5859 165.804 46.7266C165.605 46.8672 165.456 47.0371 165.356 47.2363C165.256 47.4355 165.207 47.6611 165.207 47.9131C165.207 48.165 165.265 48.3965 165.382 48.6074C165.5 48.8125 165.669 48.9736 165.892 49.0908C166.121 49.208 166.396 49.2666 166.718 49.2666C167.152 49.2666 167.53 49.1787 167.852 49.0029C168.18 48.8213 168.438 48.6016 168.625 48.3438C168.813 48.0801 168.913 47.8311 168.924 47.5967L169.61 48.5371C169.54 48.7773 169.419 49.0352 169.25 49.3105C169.08 49.5859 168.857 49.8496 168.582 50.1016C168.312 50.3477 167.987 50.5498 167.606 50.708C167.231 50.8662 166.797 50.9453 166.305 50.9453C165.684 50.9453 165.13 50.8223 164.644 50.5762C164.158 50.3242 163.777 49.9873 163.501 49.5654C163.226 49.1377 163.088 48.6543 163.088 48.1152C163.088 47.6113 163.182 47.166 163.37 46.7793C163.563 46.3867 163.844 46.0586 164.213 45.7949C164.588 45.5312 165.045 45.332 165.584 45.1973C166.124 45.0566 166.739 44.9863 167.43 44.9863H169.091ZM175.252 43.0703V50.7695H173.134V41.2598H175.156L175.252 43.0703ZM178.162 41.1982L178.144 43.167C178.015 43.1436 177.875 43.126 177.722 43.1143C177.576 43.1025 177.429 43.0967 177.283 43.0967C176.919 43.0967 176.6 43.1494 176.325 43.2549C176.049 43.3545 175.818 43.501 175.63 43.6943C175.449 43.8818 175.308 44.1104 175.208 44.3799C175.109 44.6494 175.05 44.9512 175.033 45.2852L174.549 45.3203C174.549 44.7227 174.608 44.1689 174.725 43.6592C174.842 43.1494 175.018 42.7012 175.252 42.3145C175.493 41.9277 175.792 41.626 176.149 41.4092C176.512 41.1924 176.931 41.084 177.406 41.084C177.535 41.084 177.672 41.0957 177.819 41.1191C177.971 41.1426 178.085 41.1689 178.162 41.1982ZM185.404 41.2598H187.329V50.5059C187.329 51.3613 187.147 52.0879 186.784 52.6855C186.42 53.2832 185.914 53.7373 185.263 54.0479C184.613 54.3643 183.86 54.5225 183.004 54.5225C182.641 54.5225 182.237 54.4697 181.792 54.3643C181.352 54.2588 180.924 54.0889 180.508 53.8545C180.098 53.626 179.755 53.3242 179.48 52.9492L180.473 51.7012C180.813 52.1055 181.188 52.4014 181.598 52.5889C182.008 52.7764 182.439 52.8701 182.89 52.8701C183.376 52.8701 183.79 52.7793 184.129 52.5977C184.475 52.4219 184.742 52.1611 184.929 51.8154C185.117 51.4697 185.21 51.0479 185.21 50.5498V43.4131L185.404 41.2598ZM178.944 46.1201V45.9355C178.944 45.2148 179.032 44.5586 179.208 43.9668C179.383 43.3691 179.635 42.8564 179.963 42.4287C180.292 41.9951 180.69 41.6641 181.159 41.4355C181.627 41.2012 182.158 41.084 182.75 41.084C183.365 41.084 183.889 41.1953 184.323 41.418C184.762 41.6406 185.128 41.96 185.421 42.376C185.714 42.7861 185.943 43.2783 186.107 43.8525C186.277 44.4209 186.403 45.0537 186.485 45.751V46.3398C186.409 47.0195 186.28 47.6406 186.098 48.2031C185.917 48.7656 185.676 49.252 185.377 49.6621C185.079 50.0723 184.709 50.3887 184.27 50.6113C183.836 50.834 183.324 50.9453 182.732 50.9453C182.152 50.9453 181.627 50.8252 181.159 50.585C180.696 50.3447 180.297 50.0078 179.963 49.5742C179.635 49.1406 179.383 48.6309 179.208 48.0449C179.032 47.4531 178.944 46.8115 178.944 46.1201ZM181.062 45.9355V46.1201C181.062 46.5537 181.103 46.958 181.185 47.333C181.273 47.708 181.405 48.0391 181.581 48.3262C181.762 48.6074 181.991 48.8301 182.266 48.9941C182.547 49.1523 182.878 49.2314 183.259 49.2314C183.757 49.2314 184.165 49.126 184.481 48.915C184.803 48.7041 185.049 48.4199 185.219 48.0625C185.395 47.6992 185.518 47.2949 185.588 46.8496V45.2588C185.553 44.9131 185.48 44.5908 185.369 44.292C185.263 43.9932 185.12 43.7324 184.938 43.5098C184.756 43.2812 184.528 43.1055 184.252 42.9824C183.977 42.8535 183.652 42.7891 183.277 42.7891C182.896 42.7891 182.565 42.8711 182.284 43.0352C182.002 43.1992 181.771 43.4248 181.589 43.7119C181.414 43.999 181.282 44.333 181.194 44.7139C181.106 45.0947 181.062 45.502 181.062 45.9355ZM193.718 50.9453C193.015 50.9453 192.379 50.8311 191.811 50.6025C191.249 50.3682 190.768 50.043 190.37 49.627C189.977 49.2109 189.675 48.7217 189.464 48.1592C189.253 47.5967 189.148 46.9902 189.148 46.3398V45.9883C189.148 45.2441 189.256 44.5703 189.473 43.9668C189.69 43.3633 189.992 42.8477 190.378 42.4199C190.765 41.9863 191.222 41.6553 191.75 41.4268C192.277 41.1982 192.848 41.084 193.463 41.084C194.143 41.084 194.738 41.1982 195.248 41.4268C195.757 41.6553 196.179 41.9775 196.513 42.3936C196.853 42.8037 197.105 43.293 197.269 43.8613C197.439 44.4297 197.524 45.0566 197.524 45.7422V46.6475H190.176V45.127H195.432V44.96C195.42 44.5791 195.344 44.2217 195.204 43.8877C195.069 43.5537 194.861 43.2842 194.58 43.0791C194.298 42.874 193.923 42.7715 193.455 42.7715C193.103 42.7715 192.79 42.8477 192.514 43C192.245 43.1465 192.019 43.3604 191.837 43.6416C191.656 43.9229 191.515 44.2627 191.416 44.6611C191.322 45.0537 191.275 45.4961 191.275 45.9883V46.3398C191.275 46.7559 191.331 47.1426 191.442 47.5C191.559 47.8516 191.729 48.1592 191.952 48.4229C192.174 48.6865 192.444 48.8945 192.76 49.0469C193.077 49.1934 193.437 49.2666 193.841 49.2666C194.351 49.2666 194.805 49.1641 195.204 48.959C195.602 48.7539 195.948 48.4639 196.241 48.0889L197.357 49.1699C197.152 49.4688 196.885 49.7559 196.557 50.0312C196.229 50.3008 195.828 50.5205 195.353 50.6904C194.884 50.8604 194.339 50.9453 193.718 50.9453ZM203.536 41.2598V42.8066H198.174V41.2598H203.536ZM199.721 38.9307H201.839V48.1416C201.839 48.4346 201.88 48.6602 201.962 48.8184C202.05 48.9707 202.17 49.0732 202.323 49.126C202.475 49.1787 202.654 49.2051 202.859 49.2051C203.005 49.2051 203.146 49.1963 203.281 49.1787C203.416 49.1611 203.524 49.1436 203.606 49.126L203.615 50.7432C203.439 50.7959 203.234 50.8428 203 50.8838C202.771 50.9248 202.507 50.9453 202.208 50.9453C201.722 50.9453 201.292 50.8604 200.917 50.6904C200.542 50.5146 200.249 50.2305 200.038 49.8379C199.827 49.4453 199.721 48.9238 199.721 48.2734V38.9307ZM210.505 48.1943C210.505 47.9834 210.453 47.793 210.347 47.623C210.242 47.4473 210.04 47.2891 209.741 47.1484C209.448 47.0078 209.014 46.8789 208.44 46.7617C207.936 46.6504 207.473 46.5186 207.051 46.3662C206.635 46.208 206.278 46.0176 205.979 45.7949C205.68 45.5723 205.449 45.3086 205.285 45.0039C205.121 44.6992 205.039 44.3477 205.039 43.9492C205.039 43.5625 205.124 43.1963 205.293 42.8506C205.463 42.5049 205.707 42.2002 206.023 41.9365C206.339 41.6729 206.723 41.4648 207.174 41.3125C207.631 41.1602 208.141 41.084 208.704 41.084C209.5 41.084 210.183 41.2188 210.751 41.4883C211.326 41.752 211.765 42.1123 212.07 42.5693C212.375 43.0205 212.527 43.5303 212.527 44.0986H210.409C210.409 43.8467 210.344 43.6123 210.215 43.3955C210.092 43.1729 209.905 42.9941 209.653 42.8594C209.401 42.7188 209.084 42.6484 208.704 42.6484C208.34 42.6484 208.039 42.707 207.798 42.8242C207.564 42.9355 207.388 43.082 207.271 43.2637C207.16 43.4453 207.104 43.6445 207.104 43.8613C207.104 44.0195 207.133 44.1631 207.192 44.292C207.256 44.415 207.362 44.5293 207.508 44.6348C207.655 44.7344 207.854 44.8281 208.106 44.916C208.364 45.0039 208.686 45.0889 209.073 45.1709C209.799 45.3232 210.423 45.5195 210.945 45.7598C211.472 45.9941 211.876 46.2988 212.158 46.6738C212.439 47.043 212.58 47.5117 212.58 48.0801C212.58 48.502 212.489 48.8887 212.307 49.2402C212.131 49.5859 211.874 49.8877 211.534 50.1455C211.194 50.3975 210.787 50.5938 210.312 50.7344C209.843 50.875 209.316 50.9453 208.73 50.9453C207.869 50.9453 207.139 50.793 206.542 50.4883C205.944 50.1777 205.49 49.7822 205.179 49.3018C204.875 48.8154 204.722 48.3115 204.722 47.79H206.77C206.793 48.1826 206.902 48.4961 207.095 48.7305C207.294 48.959 207.541 49.126 207.833 49.2314C208.132 49.3311 208.44 49.3809 208.756 49.3809C209.137 49.3809 209.457 49.3311 209.714 49.2314C209.972 49.126 210.168 48.9854 210.303 48.8096C210.438 48.6279 210.505 48.4229 210.505 48.1943Z"
            fill="white"
          />
          {markers
            .filter((marker) => marker.targetType !== 0 && marker.targetType !== 4)
            .map((filteredMarker, index) => (
              <g key={index} transform={`translate(0, ${index * 78})`}>
                <rect
                  x="23.9863"
                  y="77.4248"
                  width="266.173"
                  height="68.2358"
                  fill={darkMode ? "#2ADFD3" : "#6B5B95"}
                  fillOpacity="0.3"
                  stroke={darkMode ? "#2ADFD3" : "#F2FF61"}
                  strokeWidth="2"
                />

                <rect
                  x="247.5"
                  y="83.5"
                  width="37"
                  height="55"
                  rx="12.5"
                  fill={`url(#pattern${index+1})`}
                  stroke="#6B5B95"
                />

                <defs>
                  <pattern
                    id={`pattern${index+1}`}
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref={`#icon${index+1}`}
                      transform="scale(0.00530864, 0.00690168)"
                    />
                  </pattern>
                  <image
                    id={`icon${index+1}`}
                    width="190"
                    height="140"
                    // xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhYYGRgaGhgaHRwcHB4cHhwaGBoaGhocHiEeIS8lJB4rIRgaJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISHjEhISE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0MTE0NDQ0NDQ0NDQxNDQ0NDQ0Mf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EADsQAAEDAQUGBAUDAgYDAQAAAAEAAhEhAzFBUWEEEnGBkfChscHRBRMi4fEGMkJSYgcUFXKSoiOCwtL/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBQT/xAAhEQEBAQEAAgMAAgMAAAAAAAAAARECAxIhMUETUTJhsf/aAAwDAQACEQMRAD8A2BECltbr5JgAXqvHWEQKEAIhGSgMIwEAerDlAyVYKWLRMa5FG0owUsuUD1kODkbSlAqw4o0cEcpIcjBKi6YHJgcEkFGAs1Td4KwUrcKY0HsqKMIwUIYUe6s6sQHVEOKtrQrELNrWIJzRAlWAEQCmtYqTkrB0VhytpCgocEQfoequVGuUaQWnFWH6q+ikjRQEHIt4pZMKmvyPVTF07fUDwlNfy4IgRopi6YHq51QtdmPVWDkVMWUcqITxCLe4Ir5q1yJWHq97Vem81YByKZBySw7uqNtoCoqwia3uVA7VTeUUwNVga99Etr9UYtBx6e6BrQi+UUn5gGSMW3dVkMa0hNY4Hv2QB5vjw9UO+3GiNNAsxojBI/CzNfSd7x9L0fzxnPVTDY0tfOBR8FiNtkJVM2k5eSz6r7OgHuxCv5gyhYhtJyCLfJxU9T2bQ9GHjNc3dPFFvxeE9V9nQc/WUJtslka8cPBNbN8qYvsd885JgtidFhttpDd2RO84N8zPChSPhO2/Ns7N9AX2e8QMHU8L+inqstdbfKIPKSqFsZuUxdPa9FIzS7O1YdDqrew3iIWcXTTIV/MB480ttrgb0bHtPsmNSmAnOQrLtOiU1gvkhFXioujpmULgaxVSmSm7kURQdxCMWmB6qn2J4HwRDZ3HKO7lNjWUQei30RsIiWuPCqb8pYtjUlfLA8og85pDTw8vAow7j0XovPNa8j8Ig7XxSmg5R0+6ue6oHB2qtpSQ4Iw9A4P18UW+c/FJ3tfVE06+CinbyJJB7oraO4QNgqw/u9A3gPVGga1+ngi3Qs449+aJrgMu+KyrRFEe8UnfF8eSJr2kIG74RNg9kJPdFYeM/JBpCIP0SGuKNruHfJTF1op391e6e6rOQMYXO+N/GW7MwOjeLjutFYoJJOl1FMWfJ/xq2LQ0mPpbbPp/bZPH/wBK/gpDWMaf42Nn4l/sF4kfFy8O+ZtDyD8wboYCd20ADmhxmBAAGUL0OwfqWzAA3Guo0VLid0XD6QBib3BSx0z8ess3tuBITns58lxti2jflzWAXUE41FK+ZXW2bZ7U0DY1PjRY6/tJv0FzBkeNEbCRUGmS12WxWhMO6wD2dFps/hjDifLrRYvfM+25x1WL5meWajTvGLzotzfhzWn9uN8yOYJWltluj6Gg+Hgs3ufjU8d/XN+S4UuIrBKbY2BJEimJ7C1Mtpkndbyv5yo+2cR9JjoVna3OYWdgBEtcefktBs6QW5XfZcr4s+1NhaNsxNo8Fog37wif7TExrCX+l7N9jYtZaSHuJMOmRIENrjS4Jebm6sslzHdZZjVU9oxI5q98EfinFZ/mseSASYv79lzkrdw9pj8qt/8As8vdC0tApPCSD0clvtnAxuu/6+6Zqa+TB3DkjB1SDxHfNQEC+Rzj1XpvPagRpxMIwTl4/ZY2PGElOY+ez6JqYcOfmoHdxXpCAOn8InOOnMIDb070TADn4H3WUWoz6ImvOg5yg01znhAR93pDLWbnT0TAZy1qEDAeSJsZd9EoDh5q90flA8nl5qb/AA8EnfylNbaajr90UTX6V4om2h+1xQAZmOYV7jr69T6LIYLYi8RxgdKpnzgsReZw6/ZadmsHvMMYeZPgEpGmze09lMtdnF4Mzr7rZsP6de6C925mBBPWTxXbsvhFmG7pExjNedbua5deXmX7defF1XkzZ5EV18jPkvH/AK9sXsbYBzy4ONoQCBI3dwGov/cPcr65as2ayG88sZEVe4Dh+7FfK/8AEv4xZ7Tb2TbF2+2yY4FzaAueWyBN8Bja3VUnl9rkjpz4/X5teU2aya7+UH+4U6j2XR2VsFZ9m2VxoABxPZXZ2T4af5PdGTABP/sf/wAlbkZ6se4/w+fW1DondYYMXAuBvuvC9Vb/ABKxbTfZOTYcRyAJXzPZth3KtDWj+47x5l1OjQtuzbK17oBLiafSCZjCQIi/Fc+vFLdtWeWyZI9bbfqazEgNcdY3R7+C5lp+pnl0ts26GHOPWQEix+DPN1ldcXu8g3ePkt9l8FfjaNZfIYyb/wC51SmePk3vpmbtW224Jbvht2DDXKK+KQ34e4u/8u0sbhu7++6eFTK9BY/AxTeL3in7nndkf2iBGi1bPsQZG4xrM91oE8wJWP5JPrI16W/bk7J8KsBFLRx/uAYP+0HwXT/05kfsaLrjJp4LS6zaRkdAZ50RlstkAk/8SFzvdv7XScyfjO/ZiBDQROREjWqPZ7AiA4hwr++9Ba7SRfTE/VS7KdLlzto+NBpoQQdY9PdanPXUxL1zz8uwWMjeEROEET6LNabYxsh1a4e5XJ/1FzxU0nM+oCptoCcdZBrhktTxZ9s3yz8bW/E2D+L4n+medJjpgg/1SyNfr6H2SQxpg7tcRJimWSZ8puXj91fWRn2r5mLTuIRB4OZ5OWf5kf1Imux+vmSV9b58aRONOR91QeBj1B9fRKD2jPyTWv1cBqiCZaZFp1+pEbUZtni70S98f1E84TGvGfkgPfm4jkXD0RCfy73lKLq3joiDyMQgMTnT/f7BG1x7NUsOxgc0e9OI5IHNfqepPkmA97yyfVg0Hy85U+rEDkERubXIcwfRF8s5nwXONtaA0b5eoTLD4g5j2l7Q4TVsxI4hZV6H4fstmWjeD3G8hgkNE+cVoutsOxiYax4bjIieAdjW8+K8q/4y0OG6xwGAJE45Bdd1q/cL7Jwc3+UXtp/IG6/hqufUt/XTnqT8ddvwFjx9T6TXdEG4Q3h50TXs2TZgJcGmALyXUM1AqK46aLxm1/FdoLd3ecG5AwK6Lz22WdqTWa0BGfK9T+Lq/wCV+P8ATc8nM+o97tv66s2khjDNRL3QP+IrXkvJ7f8AqvaHPeS9zWHd3Ws+iBEH6h9UTquVY7NaukNYd4GgYCXCtRi7Feo2L9D27gA87s3l0fTwrJmtKJnHC7308labSXEkRJkkmSSTeZKv4f8AB7S2edxu/ESAAAJu3iSAMehXu9m/w8YAd+0e87wI3YZ9I/iZmpkV0Xptl+HWVkzcY1jADNJmTSs1JUvl5/PlZ4+v15HY/wBDW26CXsYcmgujnSq6Fj+iJq+2c7/a2OIqSvS2e0sa07z2NFNMLqmhWd/x+wEw7ngcM6rn7+S34/4168T7K2P9N2FnG62TeHPq7xoOQC6jLEAYDSR6HzXn3fq2xaSC8OwA3bj/AMjTuVY/VVnNJNRTQnL7rN58nX2s64j0RMUp9kLrUwSBdhu38l54/qNhM7ryPDKKCvNG/wCLsew7szMgm+eBkAHRJ4uv2H8vP5W7aPizWmC1xIyJHWKXoGfFHXlpAIN8fTxK5DtqeTR7QMqGOEjxSrRriIcQQLpH2XWePlyvlrftPxd1DBJExuwYnVyQPirnk4cYJHisdnYvB/jER90I2V4/l4U/C3OOYxe+q1v2hzjDgSD/ALURswY+kjHC9ZDZPGLvNA0OqL8g6RyCuf0zv9txswfpPifus9psQOJjPfPobkppzBA1w+yvcOBEY3+iuWfot3w8mKmlQQ48vynfKfm//n91TbRwuMjjH5R/NOZ6KfJ8PnrXu7Km+7CvepQAm+ERtMzA6lbBtL+CL5mZB74pYeCf5HiKJk6DzQG21n9oB5Si+acQeQSi6ReD3xVB4GXT3Rk9tqP6CjFo03gjhCzi37w6IxaNxhA0Fs4nl9kUjgcylC3ZdQcolMlhy8UEJYb3+PsrY5g/l4q/pPYCB+zMzPeqAnNbP7vVKtNmB/nTKYRjZ23AjqPRR+x6oOe7Y3g0dK6Gz7RbsAh5pdF4GhvCA7JFQev2Vtszge+ZUxda9m+IHf8A/ICQbySccb10mtsXX2rRJilTxilFxflv/GPVQOeL78jXomI9rsVptTGj5TrMsNxAYJpeagzqQj2r4ttTAC+0sLrjRwNaEB4M400XkrC3dhIIy9/uitXSZNTqa86rF8ct3I6fyWT7ruH4pt7gXNLy0mZbZyMqEA0XP274ht7pBNrWkBjm3cAs9lbllWbzDfQx6pT9stQ7ebaPBzD3DyKvpJ9SJ72/dpf+R2l97LbhuPjpCOz+F2s/Uy0JjFrgOcjBOs/im0TItX43vcRXQk+SZ/mrV/7rR7tC8kG7WJ9lflLhdj8LJaXHdkRA3mgnOdRljKoWL8ICf8qoy4meoV7sEwRzv+60yS3ZbT+vxTXbEYguMow8A3DxHfVO+aD/AFDyQZWbGRc4phs3C8+fRPs7SmfCUZfOPfRANlaPbeeqczaHDE8zI6pTHAUUdIuAI4oNTNqdNQPArQ22HDjcucKijeX5oq3crssuR8wp6xdrqPAN0d6qMZpHCOq5js7+d6LZ7ZzLgY18jjzUxfZtewzr59Evedl/13vFDbbbF4oe76I/8yMj0UymvmwecuZHuUxpyPghDezRXuT9lpR/M58YRNtBj31SmjIxzUIAvrpKJjQ20GE+nmmB+YAWQTg0Dx81W+BeQrpja1wmgJ70KosBqRHT8rMLY4QPFFZknFNMaNxsUHX7pb7Mn7wrDgMK9FbbcnHogtlmR/LxTGNpnz9kpw4+iIPOcIHsZIug6A+iMN/uI0ifNZmWvEpm+0xf0CMmtAF8clb3xXepnfyIS90ERVQNiRJ5XoNLDxi/LopvnCvJZ2tux/3X+aIG+Ov5uQam1F57yQTfM+IQttCKEjwPpKJppSeaC3aH1KB2qJzwha7iiIWRfU99wtFjaYX3d+CTtJr3dgVdi3PlkitjLQYmTrEoy9pEwDrTzCykEVmBXD7plm2mU5INLbTCDGpuTGPE/uasJNcZGYomsfNCG11rPqg0tJEx0UbwplEjilM598EW6ZuBzg+NyBjpFxHl6KWe0xfzOSGtxrl36FCXgGoA40HNBqDgOHeiBwbUyS3K+DzuQWLxcI4e2iHeLSYB1E+SB9iBEVjxB0VEOBiTwImeiFsXinr31VOvkU0qR4IHF4cIPsQed6NlnTv0oszmm8Trd7wr3nZHlPY4IPn7Qe6K2vHceyQG6TxKY1h7hYdTxaDCSiZaHQd6lLaI7KgtW8VdTDyJvdPBWyzaLz0BWc2hNADCriY74JpjVvt/pB5JjHjThELE18XdfzRNFRUz4pqY172ioOGXqsu914iqjbeaR5pqY2QcwOACos7os4cMInija4/j7q6mHNgfxPO5Rz2j+JHAeqWAMj1n0VucO/wimh03HwRb5xJHD7JQeMJCP5mojj6oycwdn2lVJk1nRLG6TUwdbuMpz7OcTxQVZ2hFIjmj3x3d5pdkyt/qrc41GIyx6lAz5kj7fZU20ANRBzS2OkfeUQdNMeCCy/UJzXGolI3JynWEbQS27iL4j0QaA4xCtoIup3gQFkYa1MHp191sa7WveioptqXGC718hKhmINeQ9go9ta/ZE6cDHU+JQW21Op0uTQ8G6ZGB91keTjJ6U9UxjgRqOI78kG6xtGuoTByJ8Ex7TgfCVznsBrjrLTpimWFq4iBflX8oNIZIgiDoUVox1IcJyIv8Vk/zhF4p18CFqG0ggDwQSwtCKEcRf5BELQawc6ifMKmWgMiPFJc2CY9+smoQbWuBu3XDEGhQ7rcHEaJIAc2hFO8bkO4cmnVB4IPKJpnPmkxHZ9VHPXN2wwurUprAOws7HgYV6oydJRMPFoBj4IpBreswDsgEbXRjPJNMOceHiibOSULWfvKIGn5TTDZGIQ33KMchdpVVDw6O71BaYX80tgyMog8DIeJTQw2Z5eCsEC8Twr1QB03Gh0ogJOdfNNRpMERFEtriD7oW2hFx75K3EX3HIq6mNG/OSKztDdRZrO0Gqjy4x5hNMa53cRWohULf2r+Epj5G64GiBjKxQcb01Mb222cBCTrM5RgkB+6CCFdm4xIk+CphrjXjpf6J4oZCxPtCDd6haHvph7aIiPtDjyMefunNeCPMgjrwSN+Rgqszum6mVZ5INLLSsX5VlNe8Gkjr6FY3ETvA+gn0V2hm6QcMK86KjWwm50ZjD0VuBBkRPPxSLFxiMcrkLXGcZ5+KDSH0kACLxf0MoSK0kca9hCx77xQi8EeRRMtTMGJwwnS6/RA3fm/vyUY4g0gjKs+SC2s/q3m3nCL1dm8AjWhBKBrrUmooeoPSsJuz25N4nnf6hY3jdu3scLuou4Km2jReaHS7I6INu5BkUGOmhTSzULM1wvD7hX0KElwgQLqX3IPn28UTSi3AL1RcNFyfSjQmh8fmUrf7oo0qJhxtJVseliUbXRcqmGtHVEs28cUxsTgmphheiZaG6EsMxkAK3PAVD5OJHVE0jRZXurRE1pxKmpjW10Y10VB4drySDTAKp4BNMaqjL1UcaV7BSQ6cfCURDhBjwVQ1mNPdEx4SGW0FNLga9+SBrHgnPkKeCp7q8LrkjGgnvzTSw4GFUwb3G9Sz6TXvVBZOrGMFC+3N0UTTGx7ZbM54ecoLC0ik+UeVFVlbOIvqMc/ujY4Hlh7KoNhk4Dn7JzLQzBw0pxCzOIinnfpx0UNoeXGYVBWzHNcYuzwPorsycbk4Op9Q1pMe4WZ9DvA+446Iy1OiLpHPqJ8lbXkGou5+fks1paRBAnT2T2WrSJwNDNCCUBC2BMEGeCj3g8fNZ5IdBJp+0ioTt4E1pOsg8KX6FVcabV28AZjXI6iFCwlsG/Cpg6tI8lmYxwMiARpeMaJ4gCgjQXcQPZEUA4GCKcbxqCltaIugnKIMd3Jtla0g3YEXDiLwitGVvibj70u1QIZakG67SDByI+4Ty44ER/7f/NFnFTBbW+lJWxliIqwnX3reg8Fuqbqii4vpWAr3lFEBNlG08FFEQMk4IxzUUQE96pj9FFEQbXK95Uoqgt6Ue7OACiipUa4jLqja+8G7yUUUAvKYx/fZVKKhrSc4yvgonvIqFFEZAX1kQjdaTe3mMFFERRcBUFND5i+c81FEKhfmBfjd9k8QZqD981FFYlQAjKl2RGSveaQDEg5X+aiioNpDmxNQaYFSwZIcBeooqBgRMwReMDTRUwg1BAwIMKKILewibomCMvtqtDnEtAInzOt9TqooqyFtsIrN99JGf4Wqx+ugLfprXK6mMqlEGfaQQZbhoJGeH2W3Z7d26KeAVKIP/9k="
                    href={getIcon(
                      filteredMarker.iconType,
                    )}
                  />
                </defs>

                {/* Display only the "Name," "Type," and "popUp" properties */}
                <text
                  x="95"
                  y="100"
                  fontSize="10"
                  letterSpacing="1"
                  fontFamily="Roboto"
                  fill={darkMode === true ? "white" : "black"}
                >
                  Name: {filteredMarker.info.Name}
                </text>
                <text
                  x="95"
                  y="115"
                  fontSize="10"
                  letterSpacing="1"
                  fontFamily="Roboto"
                  fill={darkMode === true ? "white" : "black"}
                >
                  Class: {filteredMarker.info.Type}
                </text>
                <text
                  x="95"
                  y="130"
                  fontSize="10"
                  letterSpacing="1"
                  fontFamily="Roboto"
                  fill={darkMode === true ? "white" : "black"}
                >
                  Type: {filteredMarker.popUp}
                </text>
                <image
                  x="0"
                  y="81"
                  id="image0_13_168"
                  width="110"
                  height="60"
                  href={getImage(filteredMarker.targetType)}
                />
              </g>
            ))}
        </svg>
      </div>
      </Draggable>
    )
  );
}
