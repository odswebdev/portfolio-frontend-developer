import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaTools,
  FaProjectDiagram,
  FaComment,
  FaPhone,
  FaServicestack,
} from "react-icons/fa";

const sidebarItems = [
  { path: "/hero", icon: <FaHome />, label: "Главная" },
  { path: "/about", icon: <FaUser />, label: "Обо мне" },
  { path: "/stack", icon: <FaTools />, label: "Стек" },
  { path: "/services", icon: <FaServicestack />, label: "Услуги" },
  { path: "/projects", icon: <FaProjectDiagram />, label: "Проекты" },
  { path: "/contact", icon: <FaPhone />, label: "Контакты" },
];

const text = "<DmitryOrlov.dev/>";
const highlightStart = 7;
const highlightEnd = 15;

const headerAnimation2 = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delayChildren: 0.2, // Задержка для дочерних элементов
      staggerChildren: 0.3, // Плавное поочередное появление элементов
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.1 },
  }),
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  return (
    <motion.div
      className={`fixed space-y-5 top-0 left-0 h-full w-[285px] p-6 z-50 transform transition-transform bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 shadow-2xl`}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        className="navbar__logo-container"
        custom={1}
        initial="hidden"
        animate="visible"
        variants={headerAnimation2}
        whileInView="visible"
      >
        <Link to="/">
          <img src="./src/assets/logo.png" />
        </Link>
        <span className="navbar__logo-text">
          <a href="/">
            <motion.span
              className="navbar__logo-text-content"
              custom={2}
              initial="hidden"
              whileInView="visible"
            >
              {text.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={textAnimation}
                  className={`navbar__logo-text-content-letter ${
                    index >= highlightStart && index <= highlightEnd
                      ? "text-theme-hover hover:-mt-2 transition-all duration-500 hover:duration-100"
                      : "hover:text-theme-hover hover:-mt-2 transition-all duration-500 hover:duration-100"
                  }`}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </a>
        </span>
      </motion.div>

      <ul className="flex flex-col items-start">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <motion.li
              key={item.path}
              className={`flex items-center justify-center pt-3 pb-3 rounded-lg transition-all relative ${
                isActive
                  ? "text-white font-bold line-through decoration-2 decoration-yellow-500"
                  : "text-white hover:text-yellow-300"
              }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                onClick={toggleSidebar}
                className="flex items-start w-full text-left"
              >
                {item.label.toUpperCase()}
              </Link>
            </motion.li>
          );
        })}
      </ul>

      <motion.div
        className="h-px bg-gradient-to-r from-transparent to-transparent my-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-6 transform -translate-x-1/2 text-gray-400 text-sm text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Copyright &copy; 2024-2025.
        <br /> Все права защищены
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
