import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { themes } from "../constans/data";
import { useSwipeable } from "react-swipeable";

const MobilePanel = ({ hamburgerRef, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (hamburgerRef?.current) {
      hamburgerRef.current.style.zIndex = isOpen ? "-2" : "10";
    }
  }, [isOpen]);

  // Проверяем и применяем тему из localStorage при загрузке страницы
  useEffect(() => {
    try {
      const savedThemeClass = localStorage.getItem("theme");
      const savedTheme = themes.find(
        (theme) => theme.class === savedThemeClass
      );

      if (savedTheme) {
        setCurrentTheme(savedTheme);
        document.documentElement.className = savedTheme.class;
      } else {
        setCurrentTheme(themes[0]);
        document.documentElement.className = themes[0].class;
      }
    } catch (error) {
      console.error("Ошибка при работе с localStorage:", error);
      setCurrentTheme(themes[0]);
      document.documentElement.className = themes[0].class;
    }
  }, []);

  // Функция для изменения темы
  const handleThemeChange = (theme) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTheme(theme); // Устанавливаем новую тему
      onThemeChange(theme); // Вызываем callback, если требуется
      try {
        localStorage.setItem("theme", theme.class); // Сохраняем в localStorage
      } catch (error) {
        console.error("Ошибка при сохранении в localStorage:", error);
      }
      document.documentElement.className = theme.class; // Применяем класс темы
      setIsTransitioning(false);
    }, 500);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIsOpen(false),
    onSwipedRight: () => setIsOpen(true),
  });

  return (
    <div className="mobilepanel__container" {...swipeHandlers}>
      <motion.div
        className="swipe__control"
        initial={{ y: 0 }}
        animate={{ y: isOpen ? -50 : 0 }}
        whileHover={{ scale: 1.2 }}
        onClick={() => setIsOpen(!isOpen)}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="swipe__circle"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobilepanel__open fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="mobilepanel__open-bg"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.6 }}
            >
              <div className="mobilepanel__open-wrapper p-4 flex justify-between items-center border-b">
                <h2 className="mobilepanel__open-title">Выберите тему</h2>
                <button
                  className="close__button z-10"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>
              <ul className="mobilepanel__open-list max-h-[60vh] overflow-y-auto">
                {themes.map((theme, index) => (
                  <li
                    key={index}
                    className={`mobilepanel__open-item group p-4 m-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                      currentTheme.class === theme.class
                        ? "bg-[#0fc] text-white border-2 border-[#0fc] hover:bg-white/50 hover:border-none"
                        : "bg-white/10 hover:bg-white/50"
                    }`}
                    onClick={() => handleThemeChange(theme)}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: "0px 4px 20px #0bf",
                    }}
                  >
                    {theme.img ? (
                      <img
                        src={theme.img}
                        alt={theme.name}
                        className="mobilepanel__open__item-object"
                      />
                    ) : theme.video ? (
                      <video
                        src={theme.video}
                        alt={theme.name}
                        className="mobilepanel__open__item-object"
                        loop
                        autoPlay
                        muted
                      />
                    ) : (
                      <div
                        className="mobilepanel__open__item-object"
                        style={{ background: theme.color }}
                      />
                    )}
                    <span>{theme.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobilePanel;
