import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BusSeats = ({ token }) => {
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);

  const { busId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusDeatils = async () => {
      try {
        const response = await axios(
          `http://localhost:8000/api/buses/${busId}`,
        );
        setBus(response.data);
        setSeats(response.data.seats || []);
      } catch (error) {
        console.log("error in fetching details", error);
      }
    };
    fetchBusDeatils();
  }, [busId]);

  const handleBook = async (seatId) => {
    if (!token) {
      alert("Please login to book a seat");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/booking/",
        { seat: seatId },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      alert("seat booking successfull");
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, is_booked: true } : seat,
        ),
      );
    } catch (error) {
      alert(error.response?.data?.error || "Booking failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {bus && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {bus.bus_name}
              </h1>
              <div className="flex items-center mt-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded mr-3">
                  {bus.number}
                </span>
                <span className="text-gray-600">
                  {bus.origin} → {bus.destination}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-gray-600">Departure: {bus.start_time}</p>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Select Your Seat</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleBook(seat.id)}
            disabled={seat.is_booked}
            className={`p-3 rounded-lg text-center font-medium transition-all ${
              seat.is_booked
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-green-100 text-green-800 hover:bg-green-200 hover:shadow-md"
            }`}
          >
            Seat {seat.seat_number}
          </button>
        ))}
      </div>
    </div>
  );
};
export default BusSeats;
