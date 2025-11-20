import React from 'react';
import { motion } from 'framer-motion';

const RevealText = ({ text, style }) => {
  // Split text into words
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 50, rotate: 5 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="visible" 
      style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", ...style }}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default RevealText;