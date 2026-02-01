import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaShareAlt,
  FaGithub,
  FaExternalLinkAlt,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

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

/* const getRandomGradient = () => {
  const gradients = [
    "linear-gradient(315deg, #80b9d8 0%, #d89e7f 100%)",
    "linear-gradient(315deg, #a99b17 0%, #d89e7f 100%)",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}; */

const ProjectViewList = ({
  openModal,
  selectedTech,
  projects,
  element1,
  element2,
}) => {
  const [likes, setLikes] = useState({});
  const [shareProjectId, setShareProjectId] = useState(null);

  const handleLike = (projectId) => {
    setLikes((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1,
    }));
  };

  const toggleShareMenu = (projectId) => {
    setShareProjectId((prev) => (prev === projectId ? null : projectId));
  };

  const shareIcons = (project) => (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-md shadow-lg p-4 z-50">
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(
          project.live_link
        )}&text=${encodeURIComponent(project.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-icon"
        aria-label="Поделиться в Telegram"
      >
        <FaTelegramPlane className="text-blue-500" size={24} />
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
          project.name + " " + project.live_link
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="share-icon"
        aria-label="Поделиться в WhatsApp"
      >
        <FaWhatsapp className="text-green-500" size={24} />
      </a>
    </div>
  );

  const filteredProjects = useMemo(() => {
    if (!selectedTech || selectedTech.length === 0) return projects;

    const lowerCaseTech = selectedTech.map((tech) => tech.toLowerCase());

    const result = projects.filter((project) =>
      project.tech.some((tech) => lowerCaseTech.includes(tech.toLowerCase()))
    );

    console.log("Filtered Projects:", result);
    return result;
  }, [selectedTech, projects]);

  return (
    <div className="project__view-list__container !p-0">
      {filteredProjects.map((project, index) => {
        const isPlaceholderImage = project.image.includes("plug2.png");
        return (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }} // Эффект увеличения при наведении
            transition={{ type: "spring", stiffness: 300 }} // Плавное увеличение
            className={`project__view-list__card ${
              index % 2 === 0 ? "project__img-left" : "project__img-right"
            }`}
          >
            <motion.div
              className="project__view-list__card--modal"
              onClick={() => openModal(project, index)}
              whileHover={{
                borderColor: ["#6a11cb", "#2575fc", "#ff4e50", "#f9d423"],
                boxShadow: [
                  "0 0 20px #6a11cb",
                  "0 0 20px #2575fc",
                  "0 0 20px #ff4e50",
                  "0 0 20px #f9d423",
                ],
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              <div
                className="project__view-list__card-modal-img"
                style={{ backgroundImage: `url(${project.image2})` }}
                role="img"
                aria-label={project.name}
              ></div>
              <div className="project__view-list__card-modal-info">
                <h3 className="project__view-list__card-modal-info-title">
                  {project.name}
                </h3>
                <p className="project__view-list__card-modal-info-dates">
                  Длительность: {project.duration} <br />
                  Сроки: {project.startDate} - {project.endDate}
                </p>
                <p className="project__view-list__card-modal-info-desc">
                  {project.description}
                </p>
                <p className="project__view-list__card-modal-info-contribution">
                  Вклад: {project.contribution}
                </p>
                <p className="project__view-list__card-modal-info-results">
                  Результаты: {project.results}
                </p>
                {/* Технологии */}

                <div className="project__view-list__card-modal-tech mt-4">
                  <span className="font-semibold text-sm text-theme mb-4">
                    Технологии:
                  </span>
                  <ul className="flex flex-wrap gap-4 mt-4 xl:justify-start xl:items-start lg:justify-start xs:items-center xs:justify-center">
                    {project.tech.map((tech, index) => (
                      <motion.li
                        key={index}
                        className="tech-item flex justify-center items-center xl:text-[0.875rem] font-extrabold px-4 py-2 rounded-full tracking-[0.145rem] text-white"
                        initial={{
                          scale: 1,
                          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                        }}
                        whileHover={{
                          scale: 1.1, // Увеличение при наведении
                          boxShadow: "0px 0px 15px rgba(255, 165, 0, 0.8)", // Яркое свечение
                          background:
                            "linear-gradient(90deg, #ff7eb3, #ff758c, #ffac7d)", // Градиент
                        }}
                        whileTap={{
                          scale: 0.95, // Уменьшение при клике
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        #{tech.toUpperCase()}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                {/* Кнопки */}
                {!isPlaceholderImage && (
                  <div className="project__view-list__card-modal-item-btns mt-4 flex space-x-4 xl:justify-start lg:justify-start xs:justify-center">
                    {/* GitHub Button */}
                    <div className="relative group">
                      <a
                        href={project.github_link}
                        target="_blank"
                        className="project__view-list__card-modal-item-btn-c flex items-center justify-center bg-transparent transition-transform duration-300 group-hover:scale-110"
                        rel="noopener noreferrer"
                        aria-label={`View GitHub repository of ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-neon-green transition-transform duration-300 group-hover:rotate-45">
                          {element1}
                        </span>
                      </a>
                      <span className="absolute z-10 left-full bottom-0 transform translate-y-1/2 ml-3 px-4 py-2 text-sm text-white bg-gradient-to-r from-neon-green to-neon-blue rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg w-auto max-w-xs md:max-w-sm lg:max-w-md whitespace-nowrap">
                        View GitHub Repository
                      </span>
                    </div>

                    {/* Live Version Button */}
                    <div className="relative group">
                      <a
                        href={project.live_link}
                        target="_blank"
                        className="project__view-list__card-modal-item-btn-d flex items-center justify-center bg-transparent transition-transform duration-300 group-hover:scale-110"
                        rel="noopener noreferrer"
                        aria-label={`View live version of ${project.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="text-neon-pink transition-transform duration-300 group-hover:rotate-45">
                          {element2}
                        </span>
                      </a>
                      <span className="absolute left-full bottom-0 transform translate-y-1/2 ml-3 px-4 py-2 text-sm text-white bg-gradient-to-r from-neon-pink to-neon-purple rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg w-auto max-w-xs md:max-w-sm lg:max-w-md whitespace-nowrap">
                        View Live Version
                      </span>
                    </div>
                  </div>
                )}
                <div className="actions mt-4 flex gap-4 xl:justify-start lg:justify-start xs:justify-center">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="like-button flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(project.id);
                    }}
                  >
                    <FaHeart className="text-red-500" />
                    <span className="text-theme">{likes[project.id] || 0}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="share-button flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShareMenu(project.id);
                    }}
                  >
                    <FaShareAlt className="text-blue-700" />
                    <span className="text-theme">Поделиться</span>
                  </motion.button>

                  {shareProjectId === project.id && shareIcons(project)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

ProjectViewList.propTypes = {
  openModal: PropTypes.func.isRequired,
  selectedTech: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tech: PropTypes.arrayOf(PropTypes.string).isRequired,
      image: PropTypes.string.isRequired,
      image2: PropTypes.string.isRequired,
      live_link: PropTypes.string,
      github_link: PropTypes.string,
      duration: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      contribution: PropTypes.string,
      results: PropTypes.string,
    })
  ).isRequired,
};

export default ProjectViewList;
