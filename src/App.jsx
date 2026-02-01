import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  Loader,
  Header,
  HeroSection,
  HeroSection2,
  About,
  Contact,
  GoToTop,
  Services,
  ProjectSection,
  FAQ,
  Footer
} from "./components";
import TechSlider from "./components/Stack/TechSlider";
import Cursor from "./components/Cursor";
import BgGradientAnime from "./components/BgAnimate/BgGradientAnime";
import "./src/components/variables.css";
import { themes, layouts } from "./components/constans/data";
import Sidebar from "./Sidebar";
import AppRoutes from "./AppRoutes";

function App() {
  const hamburgerRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    try {
      return savedTheme ? JSON.parse(savedTheme) : themes[0];
    } catch (error) {
      console.error(
        "Invalid theme in localStorage, resetting to default:",
        error
      );
      localStorage.removeItem("theme"); // Очистить поврежденное значение
      return themes[0];
    }
  });

  const [currentLayout, setCurrentLayout] = useState("layout1");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = () => setLoading(false);

  const handleThemeChange = (theme) => {
    setIsTransitioning(true);
    setCurrentTheme(theme);
    try {
      localStorage.setItem("theme", JSON.stringify(theme)); // Сохраняем тему
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  };

  const handleLayoutChange = (layout) => {
    setCurrentLayout(layout);
    console.log("Макет изменён на:", layout);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const preferredTheme = mediaQuery.matches ? themes[1] : themes[0]; // Если у пользователя тёмная тема
    setCurrentTheme(preferredTheme);
  }, []);

  const memoizedTheme = useMemo(() => currentTheme, [currentTheme]);
  const memoizedLayout = useMemo(() => currentLayout, [currentLayout]);

  const savedTheme = sessionStorage.getItem("theme");
  const savedLayout = sessionStorage.getItem("layout");

  useEffect(() => {
    if (savedTheme) setCurrentTheme(JSON.parse(savedTheme));
    if (savedLayout) setCurrentLayout(savedLayout);
  }, []);

  useEffect(() => {
    document.documentElement.className = currentTheme.class; // Меняем класс у <html>
  }, [currentTheme]);

  useEffect(() => {
    if (window.ga) {
      window.ga(
        "send",
        "pageview",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  useEffect(() => {
    const savedSidebarState = localStorage.getItem("sidebarState");
    if (savedSidebarState) {
      setIsOpen(JSON.parse(savedSidebarState));
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prevState) => {
      const newState = !prevState;
      localStorage.setItem("sidebarState", JSON.stringify(newState)); // Сохраняем состояние боковой панели
      return newState;
    });
  };

  const renderLayout = () => {
    switch (currentLayout) {
      case "layout1":
        return (
          <Layout1
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
            onLayoutChange={handleLayoutChange}
          />
        );
      case "layout2":
        return (
          <Layout2
            onThemeChange={handleThemeChange}
            onLayoutChange={handleLayoutChange}
          />
        );
      default:
        return (
          <Layout1
            currentTheme={currentTheme}
            onThemeChange={handleThemeChange}
            onLayoutChange={handleLayoutChange}
          />
        );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => setIsTransitioning(false)}
        className={loading ? "loader-container" : "app-container"}
      >
        {loading ? (
          <Loader onLoadComplete={handleLoadComplete} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderLayout()}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

const Layout1 = (props) => {
  return (
    <div
      className={`layout1 min-h-screen transition-colors duration-500 relative`}
    >
      <Header {...props} />
      <About />
      <TechSlider />
      <Services {...props} />
      <ProjectSection />
      <FAQ />
      <Contact />
      <Footer {...props} />
      <GoToTop />
    </div>
  );
};

const Layout2 = ({ theme, currentTheme }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`layout2 min-h-screen transition-colors duration-500`}>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-4">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
