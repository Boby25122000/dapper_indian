import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center md:min-h-[70vh] min-h-[40vh] bg-[#000055] text-white py-10 overflow-hidden">
      {/* Text Animation */}
      <motion.h1
        className="font-bold text-3xl mb-6 md:text-5xl"
        initial={{ opacity: 0, y: -60, scale: 0.9 }} // start state
        animate={{ opacity: 1, y: 0, scale: 1 }}     // end state
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to
      </motion.h1>

      {/* Image Animation */}
      <motion.img
        src="/assets/homeWallpaper.png"
        alt="Home Wallpaper"
        className="w-10/12 max-w-2xl rounded-lg object-contain"
        initial={{ opacity: 0, y: 80, scale: 0.9 }} // start state
        animate={{ opacity: 1, y: 0, scale: 1 }}    // end state
        transition={{
          duration: 1,
          delay: 0.4,
          type: "spring",
          stiffness: 70,
        }}
      />
    </div>
  );
}
