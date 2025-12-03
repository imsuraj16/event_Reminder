import React from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Mainroutes;
