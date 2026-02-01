import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ViewSwitcher from "./ViewSwitcher";
import CategorySwitcher from "./CategorySwitcher";
import ProjectCardModal from "./ProjectCardModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectSwiperComponent from "./ProjectSwiperComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimes, faLink, faGlobe } from "@fortawesome/free-solid-svg-icons";
import ProjectSliderComponent from "./ProjectSliderComponent";
import useWindowSize from "./useWindowSize";
import SidebarProject from "./SidebarProject";
import { categories, tbs, projects } from "../constans/data";
import { Typography } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

library.add(fab, faGithub, faLink, faTimes);

const element1 = <FontAwesomeIcon icon={faGithub} />;
const element2 = <FontAwesomeIcon icon={faGlobe} />;

gsap.registerPlugin(ScrollTrigger);

const getLoadMoreItems = () => {
  return 3; // Всегда загружать по 3 проекта
};

const getInitialItemsToShowCategory = (category) => {
  switch (category) {
    case "two-columns":
      return 2;
    case "four-columns":
      return 4;
    case "one-column":
      return 3;
    case "grid":
      return 3;
    default:
      return 3;
  }
};

const getInitialItemsToShow = (view, projectCount) => {
  const defaultCount = (() => {
    switch (view) {
      case "slider5":
        return 1;
      case "imageslider3":
        return 1;
      case "flipcarousel":
        return 3;
      case "two-columns":
        return 2;
      case "four-columns":
        return 4;
      case "one-column":
        return 3;
      case "three-columns":
        return 3;
      case "grid":
        return 3;
      default:
        return 3;
    }
  })();
  return Math.min(defaultCount, projectCount);
};

const ProjectGallery = ({ initialCategory = "Все" }) => {
  // Проекты по умолчанию
  const defaultProjectIds = [1, 2, 3, 4];
  const defaultProjects = projects.filter((project) =>
    defaultProjectIds.includes(project.id)
  );

  const defaultTechnologies = useMemo(() => {
    const techs = Array.from(
      new Set(
        defaultProjects.flatMap((project) =>
          project.technologies.map((t) => t.trim().toLowerCase())
        )
      )
    ).map((tech) => tech.charAt(0).toUpperCase() + tech.slice(1));
    console.log("Default Technologies:", techs);
    return techs;
  }, []);

  const [selectedView, setSelectedView] = useState("grid");
  const [selectedTech, setSelectedTech] = useState(["Html", "Css", "Js"]);
  const [visibleCount, setVisibleCount] = useState(
    getInitialItemsToShow("grid")
  );
  const visibleCountRef = useRef(visibleCount);
  const [selectedCategory, setSelectedCategory] = useState("Разработка");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Landing");
  const [modalProject, setModalProject] = useState(false);
  const galleryRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentEffect, setCurrentEffect] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const technologies = ["React", "Js", "Jquery", "Html", "Css", "Wordpress"];
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isGridView =
    selectedView !== "slider" &&
    selectedView !== "masnory" &&
    selectedView !== "original" &&
    selectedView !== "carousel" &&
    selectedView !== "slider-caption";

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "Разработка" ||
      project.category === selectedCategory;

    const technologiesMatch =
      selectedTech.length === 0 ||
      selectedTech.some((tech) => project.technologies.includes(tech));

    return matchesCategory && technologiesMatch;
  });

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const hasMoreProjects = visibleCount < filteredProjects.length;

  useEffect(() => {
    visibleCountRef.current = visibleCount;
  }, [visibleCount]);

  console.log("filteredProjects.length after filter:", filteredProjects.length);
  console.log("selectedTech:", selectedTech);
  console.log("selectedCategory:", selectedCategory);
  console.log("projects total:", projects.length);

  useEffect(() => {
    const defaultCount = getInitialItemsToShow(
      selectedView,
      filteredProjects.length
    );
    const initialCount =
      filteredProjects.length > 3
        ? Math.min(3, filteredProjects.length) // Показываем не более 3 изначально
        : filteredProjects.length;
    setVisibleCount(initialCount);
    console.log("filteredProjects.length:", filteredProjects.length);
    console.log("visibleCount:", initialCount);
    console.log("selectedView:", selectedView);
    console.log("isGridView:", isGridView);
    console.log("Should show button:", filteredProjects.length > initialCount);
  }, [selectedView, selectedTech, selectedCategory, filteredProjects.length]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const openModal = (project, index) => {
    setCurrentSlide(index);
    setModalProject(true);
    document.body.style.overflowY = "hidden";
  };

  const closeModal = (e) => {
    setModalProject(false);
    document.body.style.overflowY = "auto";
    if (e.target.classList.contains("project__modal-background")) {
      onClose();
      document.body.style.overflowY = "auto";
    }
  };

  const changeSlide = (direction) => {
    setCurrentSlide((prevSlide) => {
      const newSlide = prevSlide + direction;
      return Math.max(0, Math.min(newSlide, projects.length - 1));
    });
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSubCategoryChange = (newSubCategory) => {
    setSelectedSubCategory(newSubCategory);
  };

  const handleViewChange = (newView) => {
    setSelectedView(newView);
  };

  return (
    <motion.section
      id="projects"
      className=""
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="container mx-auto flex flex-col justify-between items-center px-4 relative">
        <div>
          <div className="flex items-center justify-between mb-6 xs:justify-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-theme-heading text-clamp-h2 leading-[16px] font-[600] tracking-[0.15em] font-['Marck_Script'] mb-[20px] uppercase text-center"
            >
              Проекты
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-theme text-clamp-desc mt-3 mb-12 text-center"
          >
            Мои последние работы
          </motion.p>
        </div>

        <div className="flex xl:flex-row xs:flex-col justify-center items-start w-full">
          <div className="flex flex-col justify-center items-start max-w-full xl:!w-full xs:w-full">
            <CategorySwitcher
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onSubcategoryChange={handleSubCategoryChange}
            />

            <div className="project-gallery" ref={galleryRef}>
              {filteredProjects.length === 0 ? (
                <div className="flex items-center justify-center h-48 w-full bg-white/10 rounded-lg shadow-lg">
                  <Typography variant="h6" className="text-gray-400">
                    Проекты в данной категории временно отсутствуют.
                  </Typography>
                </div>
              ) : (
                <Typography variant="h6" className="text-gray-400"></Typography>
              )}
              {selectedView === "slider" ? (
                <div className="slider-view">
                  <ProjectSwiperComponent projects={filteredProjects} />
                </div>
              ) : (
                <div
                  className={`grid gap-4 xs:grid-cols-1 ${
                    selectedView === "one-column"
                      ? "xl:grid-cols-1 xl:justify-start xs:grid-cols-1 sm:grid-cols-1"
                      : selectedView === "two-columns"
                      ? "xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2"
                      : selectedView === "grid"
                      ? "xl:grid-cols-3 lg:grid-cols-3"
                      : selectedView === "four-columns"
                      ? "xl:grid-cols-4"
                      : "xl:grid-cols-3"
                  }`}
                >
                  {visibleProjects
                    .slice(0, visibleCount)
                    .map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        openModal={() => openModal(project, index)}
                      />
                    ))}
                </div>
              )}
              {modalProject && (
                <ProjectCardModal
                  isOpen={modalProject}
                  onClose={closeModal}
                  project={projects[currentSlide]}
                  changeSlide={changeSlide}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectGallery;
