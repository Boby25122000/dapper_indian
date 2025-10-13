import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ isSeller, onLogin, onLogout, onAddProduct }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  // Common button class for same look
  const baseBtn =
    "px-4 py-2 rounded-md text-white font-semibold text-base border-2 transition-all duration-200";

  return (
    <nav className="px-4 py-3 flex justify-between items-center border-[#e3000f] border-2 bg-white md:px-8 md:py-4 relative">
      {/* LOGO */}
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
              className={({ isActive }) =>
                isActive
                  ? "bg-[#000055] text-white px-5 py-1 rounded"
                  : ""
              }
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#000055] text-white px-5 py-1 rounded"
                  : ""
              }
            >
              CONTACT
            </NavLink>
          </li>
        </ul>

        {/* 🔹 Add Product Button (Visible only for Seller) */}
        {isSeller && (
          <button
            className={`${baseBtn} bg-green-600 border-green-600 hover:bg-white hover:text-green-600`}
            onClick={onAddProduct}
          >
            Add Product
          </button>
        )}

        {/* 🔹 Login / Logout Buttons */}
        {isSeller ? (
          <button
            className={`${baseBtn} bg-red-600 border-red-600 hover:bg-white hover:text-red-600`}
            onClick={onLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className={`${baseBtn} bg-blue-500 border-blue-500 hover:bg-white hover:text-blue-500`}
            onClick={onLogin}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden text-[#000055]">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} className="text-[#e3000f]" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col items-center py-4 gap-4 md:hidden">
          <ul className="flex flex-col justify-center items-center gap-4 text-[#000055] font-bold text-lg font-serif">
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#000055] text-white px-5 py-1 rounded"
                    : ""
                }
                onClick={handleClose}
              >
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#000055] text-white px-5 py-1 rounded"
                    : ""
                }
                onClick={handleClose}
              >
                CONTACT
              </NavLink>
            </li>
          </ul>

          {/* 🔹 Add Product Button in Mobile Menu */}
          {isSeller && (
            <button
              className={`${baseBtn} bg-green-600 border-green-600 hover:bg-white hover:text-green-600`}
              onClick={() => {
                onAddProduct();
                handleClose();
              }}
            >
              Add Product
            </button>
          )}

          {/* 🔹 Login / Logout Buttons */}
          {isSeller ? (
            <button
              className={`${baseBtn} bg-red-600 border-red-600 hover:bg-white hover:text-red-600`}
              onClick={() => {
                onLogout();
                handleClose();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className={`${baseBtn} bg-blue-500 border-blue-500 hover:bg-white hover:text-blue-500`}
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
