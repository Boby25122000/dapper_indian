import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle } from "lucide-react"; // icons

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 px-6 py-12">
      <h2 className="text-3xl md:text-5xl font-bold text-[#0A1540] mb-6">
        Contact Us
      </h2>

      <p className="text-gray-700 mb-10 text-center max-w-xl">
        Have questions or need help? Feel free to reach out to us through any of
        the following platforms.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Email */}
        <Link
          to="dapperindian24@gmail.com"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
        >
          <Mail className="h-10 w-10 text-blue-500 mb-3" />
          <span className="font-semibold">Email</span>
          <p className="text-sm text-gray-600">dapperindian24@gmail.com</p>
        </Link>

        {/* Phone */}
        <Link
          to="tel:+919820684505"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
        >
          <Phone className="h-10 w-10 text-green-500 mb-3" />
          <span className="font-semibold">Call Us</span>
          <p className="text-sm text-gray-600">+91 9820684505</p>
        </Link>

        {/* WhatsApp */}
        <Link
          to="https://wa.me/919820684505"
          target="_blank"
          className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
        >
          <MessageCircle className="h-10 w-10 text-green-600 mb-3" />
          <span className="font-semibold">WhatsApp</span>
          <p className="text-sm text-gray-600">Chat with us</p>
        </Link>
      </div>
    </div>
  );
}
