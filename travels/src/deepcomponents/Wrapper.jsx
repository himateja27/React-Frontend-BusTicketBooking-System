import React from "react";
import { Link } from "react-router-dom";

const Wrapper = ({ token, handleLogout, children }) => {
  const logout = () => {
    handleLogout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navbar */}
      <header className="bg-blue-600 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-white text-xl font-bold tracking-wide">
            🚌 HMT Travels
          </h1>
          {token ? (
            <button
              onClick={logout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-xl p-6">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-3 text-center text-sm">
        © 2026 React Travels. All rights reserved.
      </footer>
    </div>
  );
};

export default Wrapper;
