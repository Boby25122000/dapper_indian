import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("products")) || [];
    } catch {
      return [];
    }
  });
  const [editing, setEditing] = useState(null);

  const sellerEmail = import.meta.env.VITE_SELLER_EMAIL;

  // 🔹 Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email === sellerEmail) {
        toast.success("Login Successful!");
      }
    });
    return () => unsub();
  }, []);

  // 🔹 Persist products in localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const isSeller = currentUser && currentUser.email === sellerEmail;

  // 🔹 Save or update product
  const handleSaveProduct = (product) => {
    if (products.some((p) => p.id === product.id)) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts([
        { ...product, likes: 0, liked: false, comments: [] },
        ...products,
      ]);
    }
    setEditing(null);
    setShowProductForm(false);
    toast.success("Product Saved Successfully!");
  };

  // 🔹 Delete product
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  // 🔹 Edit product
  const handleEdit = (product) => {
    setEditing(product);
    setShowProductForm(true);
  };

  // 🔹 Like / Unlike product
  const handleLike = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              likes: p.liked ? Math.max(0, p.likes - 1) : p.likes + 1,
              liked: !p.liked,
            }
          : p
      )
    );
  };

  // 🔹 Add comment
  const handleComment = (id, text) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, text] } : p
      )
    );
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successful!");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed!");
    }
  };

  return (
    <Router>
      <Navbar
        isSeller={!!isSeller}
        onLogin={() => setShowLogin(true)}
        onLogout={logout}
        onAddProduct={() => setShowProductForm(true)}
      />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* 🔹 Product Form Popup */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-xl relative">
            <button
              className="absolute top-2 right-3 text-xl text-gray-600 hover:text-black"
              onClick={() => setShowProductForm(false)}
            >
              ✕
            </button>
            <ProductForm
              onSave={handleSaveProduct}
              editingProduct={editing}
            />
          </div>
        </div>
      )}

      <main className="mx-auto">
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <ProductList
                  products={products}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onLike={handleLike}
                  onComment={handleComment}
                  isSeller={!!isSeller}
                />
              </>
            }
          />

          {/* Other pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Toasts */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </Router>
  );
}

export default App;
