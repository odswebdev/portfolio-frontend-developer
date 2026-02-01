import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = ["image1.jpg", "image2.jpg", "image3.jpg"];

const ModalSlider = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleNextImage = () => nextImage();
    const handlePrevImage = () => prevImage();

    document.addEventListener("nextImage", handleNextImage);
    document.addEventListener("prevImage", handlePrevImage);

    return () => {
      document.removeEventListener("nextImage", handleNextImage);
      document.removeEventListener("prevImage", handlePrevImage);
    };
  }, [currentIndex]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="modal__slider-container"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal__slider-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
      >
        <img src={images[currentIndex]} alt="Slider" />
      </motion.div>
    </motion.div>
  );
};

export default ModalSlider;
