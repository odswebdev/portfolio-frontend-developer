import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { projects } from "../constans/data";

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
  return `hsl(${hue}, 100%, 70%)`;
};

const getRandomGradient = () => {
  const gradients = [
    { start: "#80b9d8", end: "#d89e7f" },
    { start: "#a99b17", end: "#d89e7f" },
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const ProjectCard = ({ project, openModal, effect }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      setHasAnimated(true);
    } else if (!hasAnimated) {
      controls.start("hidden");
    }
  }, [inView, controls, hasAnimated]);

  const gradientColors = getRandomGradient();

  return (
    <motion.div
      className="project__card group bg-white/10 shadow-lg backdrop-blur-md"
      style={{ minHeight: "450px" }}
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
      <div className="project__card-image__wrapper relative group">
        <motion.div
          className="project__card-image__overlay"
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.9 }}
        >
          {project?.images?.desktop && (
            <motion.img
              src={project.images.desktop}
              alt={project.title}
              className="project__card-image w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.div>

        {/* КНОПКИ ТЕПЕРЬ ПРИВЯЗАНЫ ТОЛЬКО К КАРТИНКЕ */}
        <div className="absolute inset-0 flex items-center bg-black/70 justify-center gap-4 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-500 pointer-events-none z-20">
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project__item-btn-git text-white bg-black/70 p-3 rounded-full hover:bg-black transition"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="project__item-btn-live text-white bg-black/70 p-3 rounded-full hover:bg-black transition"
          >
            <FontAwesomeIcon icon={faLink} size="lg" />
          </a>
        </div>
      </div>

      <div className="project__card-info">
        <motion.p
          className="project__card-info-detail-desc"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {project.details}
        </motion.p>
      </div>
      <div ref={ref} className="project__card-info__footer">
        <motion.h3
          className="project__card-info__footer-title line-clamp-2 min-h-[3.5rem]"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="project__card-info__footer-desc line-clamp-2 min-h-[3.5rem]"
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

        {/* технологии (2 строки) */}
        <motion.div
          className="project__card-tech-stack flex flex-wrap gap-2 max-h-[4.5rem] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.6 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 30 },
          }}
        >
          {project.technologies.map((tech, index) => {
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
                  background: hoverGradient.start,
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
