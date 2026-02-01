import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaGlobe, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";
import PropTypes from "prop-types";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const closeButtonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const ProjectSlideModal = ({
  isOpen,
  onClose,
  project,
  changeSlide,
  currentSlide,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("projectslide__modal__background")) {
      onClose();
      document.body.style.overflowY = "auto";
    }
  };

  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
    setDragging(true);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const dragOffset = e.clientX - dragStart;
      // Если смещение больше 50px, то меняем слайд
      if (dragOffset > 50) {
        changeSlide(-1); // Сдвиг влево
        setDragging(false);
      } else if (dragOffset < -50) {
        changeSlide(1); // Сдвиг вправо
        setDragging(false);
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleTouchStart = (e) => {
    setDragStart(e.touches[0].clientX);
    setDragging(true);
  };

  const handleTouchMove = (e) => {
    if (dragging) {
      const dragOffset = e.touches[0].clientX - dragStart;
      // Если смещение больше 50px, то меняем слайд
      if (dragOffset > 50) {
        changeSlide(-1); // Сдвиг влево
        setDragging(false);
      } else if (dragOffset < -50) {
        changeSlide(1); // Сдвиг вправо
        setDragging(false);
      }
    }
  };
  const handleTouchEnd = () => {
    setDragging(false);
  };

  const slideAnimation = {
    initial: { opacity: 0, x: -50, scale: 0.9 },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: 50,
      scale: 0.9,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="projectslide__modal__background"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleModalClick}
        >
          <motion.div
            className="projectslide__modal__wrapper"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={closeButtonVariants}
              initial="visible"
              className="projectslide__modal__close-btn"
              onClick={onClose}
            >
              <span className="projectslide__modal__close-icon">&#10006;</span>
            </motion.div>
            <motion.div
              className="projectslide__modal__img-container relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                className="projectslide__modal__img-wrapper relative"
                style={{ overflow: "hidden" }}
              >
                <motion.img
                  src={project.image}
                  alt={project.name}
                  className="projectslide__modal__img rounded-lg"
                />
              </motion.div>

              <motion.div
                className="projectslide__modal__content"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={project.name}
              >
                <motion.div
                  className="projectslide__modal__title-wrapper"
                  variants={fadeInUp}
                >
                  <h2 className="projectslide__modal__title">{project.name}</h2>
                </motion.div>

                <motion.div
                  className="projectslide__modal__text"
                  variants={fadeInUp}
                >
                  <p>{project.description}</p>
                </motion.div>

                <motion.div
                  className="projectslide__modal__tech-wrapper"
                  variants={fadeInUp}
                >
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="projectslide__modal__tech-item"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  className="projectslide__modal__icons"
                  variants={fadeInUp}
                >
                  {project.github_link && (
                    <motion.a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaGithub
                        size={25}
                        className="projectslide__modal__icon-github"
                      />
                    </motion.a>
                  )}
                  {project.live_link && (
                    <motion.a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                    >
                      <FaGlobe
                        size={25}
                        className="projectslide__modal__icon-live"
                      />
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.button
            className="projectslide__modal__btn-prev"
            onClick={() => changeSlide(-1)}
            whileHover={{ scale: 1.2 }}
            variants={fadeInUp}
          >
            <FaArrowLeft size={20} />
          </motion.button>
          <motion.button
            className="projectslide__modal__btn-next"
            onClick={() => changeSlide(1)}
            whileHover={{ scale: 1.2 }}
            variants={fadeInUp}
          >
            <FaArrowRight size={20} />
          </motion.button>
          {isLightboxOpen && (
            <Lightbox mainSrc={project.image} onCloseRequest={closeLightbox} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ProjectSlideModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    tech: PropTypes.arrayOf(PropTypes.string),
    github_link: PropTypes.string,
    live_link: PropTypes.string,
  }).isRequired,
  changeSlide: PropTypes.func.isRequired,
};

export default ProjectSlideModal;
