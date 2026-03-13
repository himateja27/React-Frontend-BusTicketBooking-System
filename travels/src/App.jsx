import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./deepcomponents/LoginForm";
import RegisterForm from "./deepcomponents/RegisterForm";
import BusList from "./deepcomponents/BusList";
import BusSeats from "./deepcomponents/BusSeats";
import UserBookings from "./deepcomponents/UserBookings";
import Wrapper from "./deepcomponents/Wrapper";

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
        <Route path="/buses" element={<BusList />} />
        <Route path="/seats" element={<BusSeats />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/bus/:busId" element={<BusSeats token={token} />} />
        <Route
          path="/my-bookings"
          element={<UserBookings token={token} userId={userId} />}
        />
      </Routes>
    </Wrapper>
  );
};

export default App;
