import React from "react";
import { motion } from "framer-motion";

const AuroraBackground = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        background: "#ffffff", // White Base
      }}
    >
      {/* Blob 1: Soft Blue/Grey */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          background: "rgba(200, 220, 255, 0.4)", // Very subtle blue
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
      />

      {/* Blob 2: Soft Purple/Pink (For creative vibe) */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          background: "rgba(240, 200, 255, 0.3)", // Very subtle purple
          borderRadius: "50%",
          filter: "blur(120px)",
        }}
      />

      {/* Blob 3: Soft Grey/Silver (Premium feel) */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "20%",
          width: "60vw",
          height: "60vw",
          background: "rgba(240, 240, 240, 0.8)", // Silver
          borderRadius: "50%",
          filter: "blur(150px)",
        }}
      />
    </div>
  );
};

export default AuroraBackground;