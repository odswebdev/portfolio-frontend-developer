import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";
import ProjectCard3 from "./ProjectCard3"; // твой компонент карточки
import SidebarFilters from "./SidebarFilters"; // твой компонент фильтров
import { projects } from "../constans/data";

const ProjectGallery3 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [grid, setGrid] = useState(3); // 2,3,4 колонки
  const [filters, setFilters] = useState({
    category: null,
    subcategory: null,
    technologies: [],
  });
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...projects];
    if (filters.category)
      filtered = filtered.filter((p) => p.category === filters.category);
    if (filters.subcategory)
      filtered = filtered.filter((p) => p.subCategory === filters.subcategory);
    if (filters.technologies.length > 0)
      filtered = filtered.filter((p) =>
        filters.technologies.every((tech) => p.technologies.includes(tech))
      );
    setFilteredProjects(filtered);
  }, [filters, projects]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex w-full relative">
      {/* Иконка для открытия/закрытия sidebar */}
      {!isMobile && (
        <button
          className="fixed top-20 left-4 z-50 p-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:scale-110 transition-transform"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      {!isMobile && isSidebarOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="w-64 bg-gray-900/80 p-4 flex-shrink-0 h-screen overflow-y-auto"
        >
          <SidebarFilters
            filters={filters}
            setFilters={setFilters}
            grid={grid}
            setGrid={setGrid}
          />
        </motion.div>
      )}

      {/* Галерея */}
      <div className="flex-1 p-4">
        {isMobile ? (
          // Мобильная сетка
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard3 key={project.id} project={project} />
            ))}
          </div>
        ) : isSidebarOpen ? (
          <div className={`grid gap-4 grid-cols-${grid}`}>
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard3 project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          // 3D-подобная карусель
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            className="mySwiper"
          >
            {filteredProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard3 project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ProjectGallery3;
