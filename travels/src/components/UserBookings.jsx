import React, { useState, useEffect } from "react";
import axios from "axios";

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId || isNaN(userId)) {
        console.log("Invalid token or userId:", token, userId);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${userId}/bookings/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        console.log("Booking data:", response.data);
        setBookings(response.data);
        console.log("checking for user bookings =", response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookingError(error.response?.data?.message);
      }
    };
    fetchBookings();
  }, [userId, token]);
  return (
    <div>
      {bookings.map((item) => {
        return (
          <div key={item.id}>
            <h3>User: {item.user}</h3>
            <p>Bus: {item.bus}</p>
            <p>Seat: {item.seat}</p>
            <p>Booking Time: {item.booking_time}</p>
          </div>
        );
      })}
    </div>
  );
};
export default UserBookings;
