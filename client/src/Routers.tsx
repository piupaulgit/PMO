import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
