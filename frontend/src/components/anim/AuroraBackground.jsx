import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const AuroraBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x1 = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const y1 = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 0, background: "#ffffff" }}>
      {/* Blob 1: Canva Teal */}
      <motion.div
        style={{ x: x1, y: y1, position: "absolute", top: "-20%", left: "-10%", width: "60vw", height: "60vw", background: "rgba(0, 196, 204, 0.3)", borderRadius: "50%", filter: "blur(100px)" }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Blob 2: Canva Purple */}
      <motion.div
        style={{ position: "absolute", top: "10%", right: "-20%", width: "50vw", height: "50vw", background: "rgba(139, 61, 255, 0.25)", borderRadius: "50%", filter: "blur(120px)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, -50, 0] }} transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Blob 3: Pink/Soft Mix */}
      <motion.div
        style={{ position: "absolute", bottom: "-30%", left: "20%", width: "70vw", height: "70vw", background: "rgba(255, 100, 200, 0.15)", borderRadius: "50%", filter: "blur(150px)" }}
        animate={{ x: [0, 30, -30, 0] }} transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default AuroraBackground;