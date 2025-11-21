import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const AuroraBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create parallax offsets based on mouse position
  // Range: [Screen Start, Screen End] -> [Move -50px, Move +50px]
  const x1 = useTransform(mouseX, [0, window.innerWidth], [-50, 50]);
  const y1 = useTransform(mouseY, [0, window.innerHeight], [-50, 50]);

  const x2 = useTransform(mouseX, [0, window.innerWidth], [50, -50]);
  const y2 = useTransform(mouseY, [0, window.innerHeight], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        overflow: "hidden",
        zIndex: 0,
        background: "#ffffff",
      }}
    >
      {/* Blob 1: Blue/Grey (Follows Mouse) */}
      <motion.div
        style={{
          x: x1, y: y1,
          position: "absolute", top: "-10%", left: "-10%",
          width: "60vw", height: "60vw",
          background: "rgba(200, 220, 255, 0.5)",
          borderRadius: "50%", filter: "blur(100px)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Blob 2: Purple (Opposite Mouse) */}
      <motion.div
        style={{
          x: x2, y: y2,
          position: "absolute", top: "10%", right: "-10%",
          width: "50vw", height: "50vw",
          background: "rgba(230, 200, 255, 0.4)",
          borderRadius: "50%", filter: "blur(120px)",
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Blob 3: Silver (Slow Drift) */}
      <motion.div
        animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: "absolute", bottom: "-20%", left: "20%",
          width: "70vw", height: "60vw",
          background: "rgba(245, 245, 245, 0.9)",
          borderRadius: "50%", filter: "blur(150px)",
        }}
      />
    </div>
  );
};

export default AuroraBackground;