// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
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
  };

  // 🔹 Delete product
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setProducts(products.filter((p) => p.id !== id));
  };

  // 🔹 Edit product
  const handleEdit = (product) => {
    setEditing(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Router>
      {/* ✅ Navbar */}
      <Navbar
        isSeller={!!isSeller}
        onLogin={() => setShowLogin(true)}
        onLogout={logout}
      />

      {/* ✅ Login Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* ✅ Routes */}
      <main className="mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              isSeller ? (
                <ProductForm
                  onSave={handleSaveProduct}
                  editingProduct={editing}
                />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* ✅ Product List - visible everywhere */}
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onLike={handleLike}
          onComment={handleComment}
          isSeller={!!isSeller}
        />
      </main>
    </Router>
  );
}

export default App;
