import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const getRandomBrightColor = () => {
  let hue;
  do {
    hue = Math.floor(Math.random() * 360);
  } while ((hue >= 200 && hue <= 240) || (hue >= 270 && hue <= 300));
  return `hsl(${hue}, 100%, 70%)`;
};

const getRandomGradient = () => {
  const gradients = [
    "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
    "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(90deg, #fa709a 0%, #fee140 100%)",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const ProjectCard3 = ({ project, openModal }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="project__card bg-white/10 shadow-lg backdrop-blur-md rounded-xl overflow-hidden cursor-pointer relative"
      onClick={() => openModal(project)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      style={{
        border: "2px solid transparent",
        backgroundImage: hovered ? getRandomGradient() : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Основное изображение */}
      <img
        src={project.images["desktop"]}
        alt={project.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      {/* Мини-слайдер при hover */}
      {hovered && project.images.length > 1 && (
        <motion.div
          className="absolute top-0 left-0 w-full h-48 bg-black/30 flex items-end p-2 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Swiper
            slidesPerView={
              project.images.length > 4 ? 4 : project.images.length
            }
            spaceBetween={4}
          >
            {project.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`${project.title}-${index}`}
                  className="w-full h-16 object-cover rounded-md border-2 border-white/30"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}

      {/* Информация */}
      <div className="p-4 flex flex-col gap-2 relative z-10">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-300 text-sm">{project.description}</p>

        {/* Технологии */}
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.map((tech, index) => (
            <motion.span
              key={index}
              className="px-2 py-1 rounded-full text-sm font-semibold cursor-pointer border-2 border-white/30"
              style={{ color: getRandomBrightColor() }}
              whileHover={{
                scale: 1.2,
                background: "rgba(255,255,255,0.1)",
                transition: { duration: 0.3 },
              }}
            >
              #{tech}
            </motion.span>
          ))}
        </div>

        {/* Ссылки */}
        <div className="flex gap-4 mt-3">
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <FontAwesomeIcon icon={faLink} size="lg" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard3;
