import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { useSpring } from "react-spring";
import { motion, AnimatePresence } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { certificates } from "../constans/data";

const GalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1200px;
`;

const Cert = () => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false); // Новое состояние для отслеживания закрытия модального окна

  const springProps = useSpring({
    transform: isHovered ? "scale(1.05)" : "scale(1)",
    boxShadow: isHovered
      ? "0 4px 15px rgba(0, 0, 0, 0.3)"
      : "0 2px 5px rgba(0, 0, 0, 0.1)",
  });

  const modalRef = useRef(null);

  const handleCertificateClick = (index) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsClosingModal(true); // Устанавливаем состояние закрытия
  };

  const handleNextImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === certificates.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? certificates.length - 1 : prevIndex - 1
    );
  };

  // Управляем прокруткой с использованием useLayoutEffect
  useLayoutEffect(() => {
    const overlay = document.querySelector("[data-rmiz-modal-overlay]");

    const blockScroll = () => {
      if (!isZoomed || overlay?.classList.contains("hidden")) {
        document.body.style.overflow = "auto"; // Восстанавливаем прокрутку
      }

      if (showModal && !isZoomed) {
        document.body.style.overflow = "hidden"; // Блокируем прокрутку
      }
    };

    blockScroll();

    return () => {
      document.body.style.overflow = "auto"; // Восстановим прокрутку при размонтировании компонента
    };
  }, [isZoomed, showModal]); // Зависят от состояния зума и модального окна

  // Когда модальное окно закрыто, восстанавливаем прокрутку
  useEffect(() => {
    if (isClosingModal) {
      setTimeout(() => {
        setShowModal(false);
        setIsClosingModal(false);
      }, 300); // Задержка, чтобы дать завершиться анимации
    }
  }, [isClosingModal]);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  const closeButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const handleImageClick = (event) => {
    event.stopPropagation(); // Предотвращаем закрытие модального окна при клике по картинке
  };

  const handleZoomIn = () => {
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
  };

  return (
    <section className="cert" id="cert">
      <div className="cert__container">
        <GalleryWrapper className="gallery__cert__cont">
          {certificates.map((cert, index) => (
            <motion.div
              className="cert__wrap"
              style={springProps}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              key={index}
              onClick={() => handleCertificateClick(index)}
              data={cert}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img className="cert__img" src={cert.imageUrl} alt={cert.title} />
            </motion.div>
          ))}
        </GalleryWrapper>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="cert__modal__overlay"
            >
              <motion.div
                className="cert__modal__slider"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  variants={closeButtonVariants}
                  initial="hidden"
                  animate={showModal ? "visible" : "hidden"}
                  className="project__card-modal__close-btn"
                  onClick={handleCloseModal}
                >
                  <span className="project__card-modal__close-icon">
                    &#10006;
                  </span>
                </motion.div>
                <Zoom
                  isZoomed={isZoomed}
                  onZoom={handleZoomIn}
                  onUnzoom={handleZoomOut}
                  onClose={handleZoomOut}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleImageClick}
                  >
                    <img
                      src={certificates[currentImageIndex].imageUrl}
                      alt={`Image ${currentImageIndex + 1}`}
                      className="cert__modal__image"
                    />
                  </motion.div>
                </Zoom>
              </motion.div>
              <div className="cert__button__container">
                <motion.button
                  className="cert__button__modal"
                  onClick={handlePreviousImage}
                >
                  <svg
                    className="cert__arrow__icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.button
                  className="cert__button__modal"
                  onClick={handleNextImage}
                >
                  <svg
                    className="cert__arrow__icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Cert;
