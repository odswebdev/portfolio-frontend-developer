import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { categories, tbs, projects } from "../constans/data";

library.add(fab, faGithub, faLink);

const getRandomShadow = () => {
  const xOffset = Math.floor(Math.random() * 20) - 10;
  const yOffset = Math.floor(Math.random() * 20) - 10;
  const blurRadius = Math.floor(Math.random() * 30) + 10;
  const color = getRandomBrightColor();

  return `${xOffset}px ${yOffset}px ${blurRadius}px ${color}`;
};

const getRandomBrightColor = () => {
  let hue;
  do {
    hue = Math.floor(Math.random() * 360);
  } while ((hue >= 200 && hue <= 240) || (hue >= 270 && hue <= 300));
  const saturation = 100;
  const lightness = 70;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const getRandomGradient = () => {
  const gradients = [
    { start: "#80b9d8", end: "#d89e7f" }, // Original gradient
    { start: "#a99b17", end: "#d89e7f" }, // Another gradient example
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const ProjectCard = ({ project, openModal, effect }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const isPlaceholder = project.image.includes("plug");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setHasAnimated(true); // Помечаем, что анимация уже выполнена
    } else if (!hasAnimated) {
      controls.start("hidden");
    }
  }, [inView, controls, hasAnimated]);

  const formatDate = (dateString1, dateString2) => {
    const date = new Date(dateString1);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const dateBegin = date.toLocaleDateString("ru-RU", options);
    const date2 = new Date(dateString2);
    const dateEnd = date2.toLocaleDateString("ru-RU", options);

    return `${dateBegin} - ${dateEnd}`;
  };

  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const heights = Array.from(document.querySelectorAll(".project__card")).map(
      (el) => el.offsetHeight
    );
    setMaxHeight(Math.max(...heights));
  }, [projects]);

  const gradientColors = getRandomGradient(); // Get the start and end colors
  const startColor = gradientColors.start;
  const endColor = gradientColors.end;

  return (
    <motion.div
      className={`project__card bg-white/10 shadow-lg backdrop-blur-md ${
        effect === "Fade"
          ? "opacity-50 hover:opacity-100"
          : effect === "Zoom"
          ? "transform scale-95 hover:scale-100"
          : effect === "Rotate"
          ? "transform rotate-0 hover:rotate-6"
          : effect === "Slide"
          ? "translate-x-0 hover:translate-x-2"
          : "opacity-100" // Класс по умолчанию, если эффект не выбран
      }`}
      style={{ minHeight: "600px" }}
      onClick={() => openModal(project)}
      whileHover={{
        borderColor: getRandomBrightColor(),
        boxShadow: getRandomShadow(),
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      <div className="project__card-image__wrapper">
        <motion.div
          className="project__card-image__overlay"
          animate={{
            backgroundColor: [startColor, endColor, startColor], // Animate between colors
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            opacity: 0.9,
          }}
        >
          <motion.img
            src={project.image}
            alt={project.name}
            className="project__card-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        <div className="project__card-info">
          <motion.p
            className="project__card-info-detail-desc"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {project.details}
          </motion.p>
          {!isPlaceholder && (
            <motion.div
              className="project__btns-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <a
                href={project.live_link}
                target="_blank"
                className="project__item-btn-live"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLink} />
              </a>
              <a
                href={project.github_link}
                target="_blank"
                className="project__item-btn-git"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </motion.div>
          )}
        </div>
      </div>
      <div ref={ref} className="project__card-info__footer">
        <motion.h3
          className="project__card-info__footer-title"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
        >
          {project.name}
        </motion.h3>
        <motion.p
          className="project__card-info__footer-date"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.8 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
        >
          {formatDate(project.dateBegin, project.dateEnd)}
        </motion.p>
        <motion.p
          className="project__card-info__footer-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
        >
          {project.description}
        </motion.p>
        <motion.div
          className="project__card-tech-stack"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.6 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
        >
          {project.tech.map((tech, index) => {
            const textColor = getRandomBrightColor();
            const hoverGradient = getRandomGradient();
            return (
              <motion.span
                key={index}
                style={{
                  color: textColor,
                  transition:
                    "background 0.5s ease-in-out, color 0.3s ease-in-out",
                }}
                whileHover={{
                  scale: 1.0,
                  background: hoverGradient.start, // Use a solid color for hover background
                  transition: "borderColor 0.5s ease-in-out",
                }}
                className="project__card-tech-item"
              >
                #{tech.toUpperCase()}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
