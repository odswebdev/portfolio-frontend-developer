import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MouseColorBackground = () => {
  const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 1)");

  // Обработка движения мыши для изменения цвета фона
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const red = Math.floor((clientX / window.innerWidth) * 255);
    const green = Math.floor((clientY / window.innerHeight) * 255);
    setBgColor(`rgba(${red}, ${green}, 150, 0.5)`);
  };

  return (
    <motion.div
      className="absolute inset-0 transition-colors duration-500"
      style={{ backgroundColor: bgColor }}
      onMouseMove={handleMouseMove}
      animate={{
        opacity: 1,
        transition: { duration: 1 },
      }}
    />
  );
};

export default MouseColorBackground;
