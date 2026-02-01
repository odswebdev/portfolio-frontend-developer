import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import ProjectSlideModal from "./ProjectSlideModal";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ProjectSwiperComponent = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalProject, setModalProject] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [spaceBetween, setSpaceBetween] = useState(20);

  const openModal = (project, index) => {
    setSelectedProject(project);
    setCurrentSlide(index);
    setModalProject(true);
  };

  const closeModal = () => {
    setModalProject(false);
    document.body.style.overflowY = "auto";
  };

  const changeSlide = (direction) => {
    let newIndex = currentSlide + direction;
    if (newIndex < 0) newIndex = projects.length - 1;
    if (newIndex >= projects.length) newIndex = 0;
    setCurrentSlide(newIndex);
  };

  // Функция для вычисления отступов
  const calculateSpaceBetween = () => {
    const containerWidth = document.querySelector(
      ".project__swiper-container"
    ).offsetWidth;
    // Пример расчета: отступ равен 2% ширины контейнера
    return Math.max(10, Math.round(containerWidth * 0.0346));
  };

  // Обновляем отступы при изменении размера окна
  useEffect(() => {
    const updateSpaceBetween = () => setSpaceBetween(calculateSpaceBetween());
    updateSpaceBetween(); // Устанавливаем начальное значение
    window.addEventListener("resize", updateSpaceBetween);
    return () => window.removeEventListener("resize", updateSpaceBetween);
  }, []);

  return (
    <div className="project__swiper-container slider-container !border-1 !border-solid !border-[#FE7]">
      <Swiper
        className="project__swiper"
        centeredSlides={false}
        spaceBetween={spaceBetween}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 3 },
        }}
        modules={[Navigation]}
        navigation={{ prevEl: "#prev-btn", nextEl: "#next-btn" }}
      >
        {projects.map((project, index) => (
          <SwiperSlide
            key={index}
            className="project__swiper-slide"
            onClick={() => openModal(project, index)}
          >
            <motion.div
              className="project__swiper-slide__img-wrapper"
              whileHover={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: ["#6a11cb", "#2575fc", "#ff4e50", "#f9d423"],
                boxShadow: [
                  "0 0 10px #6a11cb",
                  "0 0 10px #2575fc",
                  "0 0 10px #ff4e50",
                  "0 0 10px #f9d423",
                ],
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="project__swiper-slide__img"
              />
              <div className="project__overlay__swiper">
                <div className="project__swiper-description">
                  {project.description}
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      {selectedProject && (
        <ProjectSlideModal
          isOpen={modalProject}
          onClose={closeModal}
          project={projects[currentSlide]}
          changeSlide={changeSlide}
          totalProjects={projects.length}
        />
      )}
    </div>
  );
};

export default ProjectSwiperComponent;
