import React from "react";
//import RegisterForm from "./components/RegisterForm";
//import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
//import BusList from "./components/BusList";
//import BusSeats from "./components/BusSeats";
//import UserBookings from "./components/UserBookings";
//import Wrapper from "./components/Wrapper";
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
    <div>
      {/*<Wrapper handleLogout={handleLogout} token={token} />
      <Routes>
        <Route path="/" element={<BusList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/bus/:busId" element={<BusSeats token={token} />} />
        <Route
          path="/my-bookings"
          element={<UserBookings token={token} userId={userId} />}
        />
      </Routes>
      <Wrapper />*/}

      <Wrapper handleLogout={handleLogout} token={token} />
      <Routes>
        <Route path="/" element={<BusList />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/bus/:busId" element={<BusSeats token={token} />} />
        <Route
          path="/my-bookings"
          element={<UserBookings token={token} userId={userId} />}
        />
      </Routes>
      <Wrapper />
    </div>
  );
};
export default App;
