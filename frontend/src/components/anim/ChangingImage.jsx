import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChangingImage = ({ folder, prefix, count = 5, label }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Change image every 3-5 seconds (randomized slightly so they don't all switch at once)
    const intervalTime = 3000 + Math.random() * 2000;
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="changing-img-card">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={`/images/${folder}/${prefix}${index + 1}.png`}
          alt={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      </AnimatePresence>
      
      {/* Label Overlay */}
      <div className="img-label-overlay">
        {label}
      </div>
    </div>
  );
};

export default ChangingImage;