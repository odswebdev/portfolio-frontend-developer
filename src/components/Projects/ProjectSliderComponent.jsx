import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink, faGlobe } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faGithub, faLink);

const element1 = <FontAwesomeIcon icon={faGithub} />;
const element2 = <FontAwesomeIcon icon={faGlobe} />;

const ProjectSliderComponent = ({ projects }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex);
  };

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
        slidesPerView={1}
        navigation
        onSlideChange={handleSlideChange}
        className="mySwiper"
      >
        {projects.map((project) => (
          <SwiperSlide className="!py-0" key={project.id}>
            <motion.div
              className="slide-content"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="slide-image"
              />
              <div className="slide-info">
                <h2 className="slide-title">{project.name}</h2>
                <p className="slide-description">{project.description}</p>
                <div className="slide-buttons">
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slide-button"
                  >
                    {element1}
                  </a>
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="slide-button"
                  >
                    {element2}
                  </a>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectSliderComponent;
