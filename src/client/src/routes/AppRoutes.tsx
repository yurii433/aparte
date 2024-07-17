import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
/* 

import ClientDashboard from '../pages/client/ClientDashboard';
import ClientProfile from '../pages/client/ClientProfile';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import HostDashboard from '../pages/host/HostDashboard';
import HostListings from '../pages/host/HostListings'; */

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*        
       
        
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/profile" element={<ClientProfile />} />
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        
        <Route path="/host/dashboard" element={<HostDashboard />} />
        <Route path="/host/listings" element={<HostListings />} /> */}

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
