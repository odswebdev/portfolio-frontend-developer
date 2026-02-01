import React, { useState, useEffect, useRef, useCallback } from "react";
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
import MasnoryProjectGallery from "./MasnoryProjectGallery";
import useWindowSize from "./useWindowSize";
import ProjectViewList from "./ProjectViewList";
import SidebarProject from "./SidebarProject";
import { categories, tbs, effects, projects } from "../constans/data";
import { Typography } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

library.add(fab, faGithub, faLink, faTimes);

const element1 = <FontAwesomeIcon icon={faGithub} />;
const element2 = <FontAwesomeIcon icon={faGlobe} />;

gsap.registerPlugin(ScrollTrigger);

const ProjectCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [gap, setGap] = useState(16);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 640) setGap(16);
    else if (width < 1024) setGap(24);
    else setGap(32);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = (index) => {
    setCurrent(index);
  };

  const getPosition = (index) => {
    const offset = index - current;
    if (offset === 0) return "center";
    if (offset === 1 || (offset === 0 && current === projects.length - 1))
      return "left";
    if (offset === -1 || (offset === projects.length - 1 && current === 0))
      return "right";
    return "hidden";
  };

  return (
    <div className="carousel-container" style={{ gap: `${gap}px` }}>
      {projects.map((project, index) => {
        const position = getPosition(index);
        const isActive = index === current;

        return (
          <motion.div
            key={project.id}
            className={`carousel-card ${position} ${isActive ? "active" : ""}`}
            onClick={() => handleCardClick(index)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isActive ? 1 : 0.5,
              scale: isActive ? 1 : 0.8,
              zIndex: isActive ? 2 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={project.image}
              alt={project.name}
              className="carousel-image"
            />
            <div className="carousel-info">
              <h3>{project.name}</h3>
              <div className="carousel-links">
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGlobe} />
                </a>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const getLoadMoreItems = (view) => {
  if (!view) return 6;
  switch (view) {
    case "two-columns":
      return 2;
    case "four-columns":
      return 4;
    case "one-column":
      return 3;
    case "grid":
      return 9;
    default:
      return 6;
  }
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

const getInitialItemsToShow = (view) => {
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
      return 6;
    default:
      return 9;
  }
};

const ProjectGallery = ({ initialCategory = "Все" }) => {
  const [selectedView, setSelectedView] = useState("grid");
  const [selectedTech, setSelectedTech] = useState([]);
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
  const [selectedEffect, setSelectedEffect] = useState("Fade");
  const [activeTab, setActiveTab] = useState(0);
  const technologies = ["React", "JavaScript", "HTML", "CSS"];
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleEffectChange = (effect) => {
    setSelectedEffect(effect);
  };

  const sidebarVariants = {
    expanded: {
      width: "20%",
      opacity: 1,
      transition: { duration: 0.4 },
    },
    collapsed: {
      width: "60px",
      opacity: 0,
      transition: { duration: 0.4 },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
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
    // Устанавливаем visibleCount в соответствии с новым выбранным видом только если оно не было изменено вручную
    setVisibleCount(getInitialItemsToShow(newView));
  };

  /* useEffect(() => {
    setVisibleCount(getInitialItemsToShow(selectedView));
  }, [selectedView]); */

  useEffect(() => {
    const ctx = gsap.context(() => {
      let animationParams;

      switch (selectedEffect) {
        case "Fade":
          animationParams = {
            from: { opacity: 0 },
            to: { opacity: 1 },
          };
          break;
        case "Zoom":
          animationParams = {
            from: { scale: 0.8, opacity: 0 },
            to: { scale: 1, opacity: 1 },
          };
          break;
        case "Rotate":
          animationParams = {
            from: { rotation: -15, opacity: 0 },
            to: { rotation: 0, opacity: 1 },
          };
          break;
        case "Slide":
          animationParams = {
            from: { y: 50, opacity: 0 },
            to: { y: 0, opacity: 1 },
          };
          break;
        default:
          animationParams = {
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0 },
          };
          break;
      }

      gsap.fromTo(".project__card", animationParams.from, {
        ...animationParams.to,
        duration: 1,
        ease: "power3.out",
        stagger: { amount: 0.3 },
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }, galleryRef);

    return () => ctx.revert();
  }, [selectedView, selectedTech, selectedCategory, selectedEffect]);

  // Локальная анимация для наведения
  const handleMouseEnter = (cardRef) => {
    let animationParams;

    switch (selectedEffect) {
      case "Fade":
        animationParams = { opacity: 0.5 };
        break;
      case "Zoom":
        animationParams = { scale: 1.1 };
        break;
      case "Rotate":
        animationParams = { rotation: 5 };
        break;
      case "Slide":
        animationParams = { y: -10 };
        break;
      default:
        animationParams = { scale: 1.05 };
        break;
    }

    gsap.to(cardRef, {
      ...animationParams,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (cardRef) => {
    gsap.to(cardRef, {
      scale: 1,
      rotation: 0,
      y: 0,
      opacity: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "Разработка" ||
      project.category === selectedCategory;

    const technologiesMatch =
      selectedTech.length === 0 ||
      selectedTech.every((tech) => project.tech.includes(tech));

    return matchesCategory && technologiesMatch;
  });

  const handleTechnologySelect = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  /* useEffect(() => {
    setVisibleCount(getInitialItemsToShow(selectedView));
  }, [selectedTech, selectedCategory]); */

  const loadMore = useCallback(() => {
    console.log("📌 Load more clicked");
    console.log("Before:", visibleCount);

    const itemsToShow = getLoadMoreItems(selectedView || "grid"); // Подстраховка
    console.log("Adding:", itemsToShow);

    setVisibleCount((prev) => {
      const newVisibleCount = prev + itemsToShow;
      console.log("New visibleCount:", newVisibleCount);
      return newVisibleCount;
    });
  }, [selectedView, visibleCount, getLoadMoreItems]);

  useEffect(() => {
    console.log("visibleCount changed:", visibleCount);
  }, [visibleCount]);

  /*  useEffect(() => {
    const initialCount = getInitialItemsToShow(selectedView);
    if (visibleCount < initialCount) {
      setVisibleCount(initialCount);
    }
  }, [selectedView]);

  useEffect(() => {
    const initialCount = getInitialItemsToShow(selectedView);
    if (visibleCount < initialCount) {
      setVisibleCount(initialCount);
    }
  }, [selectedTech, selectedCategory]); */

  const visibleProjects = filteredProjects.slice(0, visibleCount);

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
          {/* Sidebar на ПК — скрыт на мобильных */}
          <SidebarProject
            className="!w-[20%] max-w-[20%]"
            effects={effects}
            onEffectChange={handleEffectChange}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            categories={categories}
            technologies={technologies}
            selectedTech={selectedTech}
            onTechnologySelect={handleTechnologySelect}
            handleViewChange={handleViewChange}
          />

          <div className="flex flex-col justify-center items-start max-w-full xl:!w-[80%] xs:w-full">
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
              ) : selectedView === "masnory" ? (
                <MasnoryProjectGallery
                  projects={projects}
                  openModal={openModal}
                  selectedTech={selectedTech}
                />
              ) : selectedView === "original" ? (
                <ProjectViewList
                  openModal={openModal}
                  selectedTech={selectedTech}
                  projects={projects}
                  element1={element1}
                  element2={element2}
                />
              ) : selectedView === "carousel" ? (
                <ProjectCarousel
                  openModal={openModal}
                  selectedTech={selectedTech}
                />
              ) : selectedView === "slider-caption" ? (
                <ProjectSliderComponent
                  projects={projects}
                  visibleCount={visibleCount}
                />
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
                  {visibleProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      openModal={() => openModal(project, index)}
                      effect={selectedEffect}
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
              {selectedView !== "slider" &&
                selectedView !== "masnory" &&
                selectedView !== "original" &&
                selectedView !== "carousel" &&
                selectedView !== "slider-caption" &&
                visibleCount < filteredProjects.length && (
                  <button
                    onClick={loadMore}
                    className="proj__btn__showall border-theme"
                  >
                    Показать еще
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectGallery;
