// src/components/Navbar.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ isSeller, onLogin, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <nav className="px-4 py-3 flex justify-between items-center border-[#e3000f] border-2 bg-white md:px-8 md:py-4 relative">
      <Link
        to="/"
        className="font-bold text-lg md:text-2xl flex items-center gap-2"
        onClick={handleClose}
      >
        <img className="h-10 md:h-12" src="/assets/logo.jpg" alt="Logo" />
        <span className="hidden md:inline text-[#000055] font-serif text-3xl">
          DAPPER INDIAN
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-center items-center gap-x-6">
        <ul className="flex space-x-6 text-[#000055] font-bold text-lg font-serif">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => {
                return isActive
                  ? "bg-[#000055] text-white px-5 py-1 rounded"
                  : "";
              }}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => {
                return isActive
                  ? "bg-[#000055] text-white px-5 py-1 rounded"
                  : "";
              }}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>

        {isSeller ? (
          <button
            className="px-2 py-1 text-white bg-red-600 rounded-md cursor-pointer 
                     hover:bg-white hover:text-red-600 hover:border-red-600 hover:border-2
                     md:px-4 md:py-1.5 md:text-lg"
            onClick={onLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="px-2 py-1 bg-blue-400 text-white rounded-md border-blue-400 cursor-pointer
                     hover:bg-white hover:text-blue-400 hover:border-blue-400 hover:border-2
                     md:px-4 md:py-1.5 md:text-lg"
            onClick={onLogin}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden text-[#000055]">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X size={28} className="text-[#e3000f]" />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col items-center py-4 gap-4 md:hidden">
          <ul className="flex flex-col justify-center items-center gap-4 text-[#000055] font-bold text-lg font-serif">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => {
                  return isActive
                    ? "bg-[#000055] text-white px-5 py-1 rounded"
                    : "";
                }}
                onClick={handleClose}
              >
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => {
                  return isActive
                    ? "bg-[#000055] text-white px-5 py-1 rounded"
                    : "";
                }}
                onClick={handleClose}
              >
                CONTACT
              </NavLink>
            </li>
          </ul>

          {isSeller ? (
            <button
              className="px-4 py-2 text-white bg-red-600 rounded-md cursor-pointer 
                       hover:bg-white hover:text-red-600 hover:border-red-600 hover:border-2"
              onClick={() => {
                onLogout();
                handleClose();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-md border-blue-400 cursor-pointer
                       hover:bg-white hover:text-blue-400 hover:border-blue-400 hover:border-2"
              onClick={() => {
                onLogin();
                handleClose();
              }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
