import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr(""); setMsg("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (error) {
      setErr(error.message || "Login failed!");
    }
  };

  const handleReset = async () => {
    if (!email) return setErr("Enter email to reset password");
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Password reset email sent!");
    } catch (error) {
      setErr(error.message || "Reset failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-white bg-red-600 px-2 py-1 rounded-md hover:bg-white hover:text-red-600 hover:border-red-600" onClick={onClose}>✕</button>
        <h3 className="text-center text-2xl font-bold mb-6">Login to Your Account</h3>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          {err && <p className="text-red-600">{err}</p>}
          {msg && <p className="text-green-600">{msg}</p>}

          <div className="flex justify-between items-center gap-4">
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-white hover:text-blue-600 hover:border-blue-600">Login</button>
            <button type="button" onClick={handleReset} className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-white hover:text-yellow-500 hover:border-yellow-500">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
