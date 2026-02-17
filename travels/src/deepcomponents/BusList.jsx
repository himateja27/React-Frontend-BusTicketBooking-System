import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/buses/");
        setBuses(response.data);
      } catch (error) {
        console.log("error in fetching buses", error);
      }
    };
    fetchBuses();
  }, []);

  const handleViewSeats = (id) => {
    navigate(`/bus/${id}`);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Available Buses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buses.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">
                  {item.bus_name}
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {item.number}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Origin</p>
                  <p className="font-medium">{item.origin}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="font-medium">{item.destination}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Departure</p>
                  <p className="font-medium">{item.start_time}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Arrival</p>
                  <p className="font-medium">{item.reach_time}</p>
                </div>
              </div>

              <button
                onClick={() => handleViewSeats(item.id)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                View Seats
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BusList;
