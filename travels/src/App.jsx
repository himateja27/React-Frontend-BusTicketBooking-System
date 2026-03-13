import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./deepcomponents/LoginForm";
import RegisterForm from "./deepcomponents/RegisterForm";
import BusList from "./deepcomponents/BusList";
import BusSeats from "./deepcomponents/BusSeats";
import UserBookings from "./deepcomponents/UserBookings";
import Wrapper from "./deepcomponents/Wrapper";
import PrivateRoute from "./deepcomponents/PrivateRoute";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(
    Number(localStorage.getItem("userId")) || null,
  );

  const handleLogin = (token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", String(userId));
    setToken(token);
    setUserId(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  };

  return (
    <Wrapper handleLogout={handleLogout} token={token}>
      <Routes>
        {/* Default route → go to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

        {/* Protected routes */}
        <Route
          path="/buses"
          element={
            <PrivateRoute>
              <BusList />
            </PrivateRoute>
          }
        />
        <Route
          path="/seats"
          element={
            <PrivateRoute>
              <BusSeats />
            </PrivateRoute>
          }
        />
        <Route
          path="/bus/:busId"
          element={
            <PrivateRoute>
              <BusSeats token={token} />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <UserBookings token={token} userId={userId} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Wrapper>
  );
};

export default App;
