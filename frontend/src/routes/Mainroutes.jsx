import React from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Authwrapper from "./Authwrapper";
const Mainroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Authwrapper><Dashboard /></Authwrapper>} />
    </Routes>
  );
};

export default Mainroutes;
