import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  // // Function to handle login success
  // const handleLoginSuccess = () => {
  //   setLoggedIn(true);
  // };

  // // Function to handle login failure
  // const handleLoginFailure = () => {
  //   setLoggedIn(false);
  //   alert("Please enter correct credentials!!!");
  // };

  useEffect(()=>{
    const login = localStorage.getItem("login");
    setLoggedIn(login)
  })
  return (
    <Routes>
      {/*
    <div>
       {isLoggedIn ? (
        <Dashboard />
        ) : (
          <Login
          onLoginSuccess={handleLoginSuccess}
          onLoginFailure={handleLoginFailure}
          />
          )}
    </div> */}
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
