import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
import ModalFeedback from "../ModalFeedback/ModalFeedback";
import IconDropdownMenu from "../NavBar/IconDropdownMenu";
import { FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { themes, layouts } from "../constans/data";
import { ThemeProvider, useTheme } from "/src/ThemeContext";
import AnimatedThemePreview from "../BgAnimate/AnimatedThemePreview";
import MouseColorBackground from "../BgAnimate/MouseColorBackground";
import FogEffect from "../BgAnimate/FogEffect";
import WaterfallShinyDrops from "../BgAnimate/WaterfallShinyDrops";
import ElectricFlashes from "../BgAnimate/ElectricFlashes";

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

const headerAnimation3 = {
  hidden: { opacity: 0, y: -30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.5,
      type: "spring",
      stiffness: 120,
    },
  }),
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const dropdownAnimation = {
  hidden: { opacity: 0, y: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const dropdownAnimation2 = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Анимация для элементов списка внутри меню
const dropdownItemAnimation2 = {
  hidden: { opacity: 0, y: -10 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1, // Появление элементов с задержкой
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const NavBar = ({ hamburgerRef, onThemeChange, onLayoutChange }) => {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const { currentTheme, setCurrentTheme } = useTheme();
  const [isShowModal, setShowModal] = useState(false);
  const [nav, setNav] = useState(false);
  const [bodyScroll, setBodyScroll] = useState(false);
  const [activeLink, setActiveLink] = useState("#");
  const [linkClicked, setLinkClicked] = useState(false);
  const location = useLocation();
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const moreDropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState("layout1");

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const aboutImg = document.querySelector(".about__img");
    const slickSlider = document.querySelector(".slick-slider");
    const swiper = document.querySelector(".swiper");
    if (aboutImg) {
      aboutImg.style.zIndex = isOpen ? "0" : "initial";
    }
    if (slickSlider) {
      slickSlider.style.zIndex = isOpen ? "0" : "initial";
    }
    if (swiper) {
      swiper.style.zIndex = isOpen ? "0" : "initial";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const heroSection = document.querySelector("#hero");
      if (
        heroSection &&
        heroSection.offsetTop <= scrollPosition &&
        heroSection.offsetTop + heroSection.offsetHeight >= scrollPosition
      ) {
        if (!linkClicked) {
          setActiveLink("");
        }
        return;
      }

      const links = document.querySelectorAll(".navbar__link");
      links.forEach((link) => {
        const section = document.querySelector(link.getAttribute("href"));
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight >= scrollPosition
        ) {
          setActiveLink(link.getAttribute("href"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [linkClicked]);

  /*  const handleLayoutChange = (layout) => {
    if (layout && layout.class) {
      setCurrentLayout(layout.class);
    } else {
      console.error("Некорректный объект макета:", layout);
    }
  }; */

  const handleDesktopLinkClick = (e, href) => {
    e.preventDefault();
    setActiveLink(href);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setNav(false);
    setBodyScroll(false);
    setActiveLink(href);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleThemeDropdown = () => {
    setIsThemeDropdownOpen((prev) => !prev);
  };

  const toggleLayoutDropdown = () => {
    setIsLayoutDropdownOpen((prev) => !prev);
  };

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen((prev) => !prev);
  };

  const links = [
    { id: 1, link: "Обо мне", href: "#about" },
    { id: 2, link: "Стек", href: "#experience" },
    { id: 3, link: "Услуги", href: "#services" },
    { id: 4, link: "Проекты", href: "#projects" },
    { id: 5, link: "FAQ", href: "#faq" },
    { id: 6, link: "Контакты", href: "#contacts" },
  ];

  const handleButtonClick = () => {
    setShowModal(true);
    setBodyScroll(true);
  };

  const Close2 = () => {
    setShowModal(false);
    setBodyScroll(false);
    setNav(false);
  };

  useEffect(() => {
    document.body.style.overflowY = bodyScroll ? "hidden" : "auto";
    const el1 = document.getElementById("mbnav");
    const ft = document.getElementById("ft");

    if (el1 !== null) {
      el1.style.display = bodyScroll ? "flex" : "none";
      if (ft !== null) {
        ft.style.display = bodyScroll ? "block" : "none";
      }
    }
  }, [bodyScroll]);

  useEffect(() => {
    document.body.style.overflowY = nav ? "hidden" : "auto";
  }, [nav]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target) &&
        isThemeDropdownOpen
      ) {
        setIsThemeDropdownOpen(false);
      }

      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target) &&
        isLayoutDropdownOpen
      ) {
        setIsThemeDropdownOpen(false);
      }

      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target) &&
        isMoreDropdownOpen
      ) {
        setIsMoreDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isThemeDropdownOpen, isMoreDropdownOpen, isLayoutDropdownOpen]);

  const [keyTrigger, setKeyTrigger] = useState(0);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    onThemeChange(theme);
    setIsThemeDropdownOpen(false);
    // Обновляем ключ, чтобы вызвать перерисовку компонента WaterfallShinyDrops
    setKeyTrigger((prevKey) => prevKey + 1);
  };

  const handleLayoutChange = (layout) => {
    onLayoutChange(layout);
    setIsLayoutDropdownOpen(false);
  };

  const buttonVariants = {
    open: {
      rotate: 180,
      scale: 1.2,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    closed: {
      rotate: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  const headerVariantsX = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.1 },
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

  return (
    <div
      className="navbar__container"
      style={{ backgroundImage: `var(--hero-bg)`, backgroundSize: "cover" }}
    >
      {currentTheme.video && (
        <video className="navbar__theme-video-background" autoPlay loop muted>
          <source src={currentTheme.video} type="video/mp4" />
        </video>
      )}
      <nav className="navbar__wrapper">
        <motion.div
          className="navbar__logo-container"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={headerAnimation2}
          whileInView="visible"
        >
          <a href="/">
            <img
              className="navbar__logo-img"
              src="./assets/logo.png"
              alt=""
            />
          </a>
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

        <motion.ul
          className="navbar__list"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {links.map(({ id, link, href }) => (
            <motion.li
              key={id}
              className="navbar__item"
              custom={id}
              initial="hidden"
              animate="visible"
              variants={headerAnimation3}
              whileHover="hover"
            >
              <a
                className={`navbar__link center ${
                  activeLink === href ? "active" : ""
                }`}
                href={href}
                onClick={(e) => handleDesktopLinkClick(e, href)}
              >
                {link}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="navbar__ddmenu-container relative"
          custom={4}
          initial="hidden"
          animate="visible"
          variants={dropdownAnimation2}
        >
          <a
            href="#"
            onClick={toggleMoreDropdown}
            className="navbar__ddmenu-link-parent p-2 rounded-md font-bold"
          >
            ...
          </a>
          {isMoreDropdownOpen && (
            <ul
              ref={moreDropdownRef}
              className="navbar__ddmenu-list absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border-none shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              initial="hidden"
              animate="visible"
              variants={dropdownAnimation2}
            >
              {links
                .filter(({ link }) => link === "Отзывы" || link === "Контакты")
                .map(({ id, link, href }, index) => (
                  <li
                    key={id}
                    className="w-full transition-all duration-300"
                    custom={index}
                    variants={dropdownItemAnimation2}
                  >
                    <a
                      className={`navbar__ddmenu-link-child font-bold block p-2 bg-transparent text-[#fff] rounded-md hover:bg-gradient-to-r hover:from-[#0fc] hover:to-[#0fc] hover:text-white transition-all ${
                        activeLink === href ? "bg-[#0fc] text-white" : ""
                      }`}
                      href={href}
                      onClick={(e) => handleDesktopLinkClick(e, href)}
                    >
                      {link}
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </motion.div>

        <div className="navbar__layout-dd-btn-container">
          <motion.div
            className="navbar__theme-dd-container"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={headerAnimation2}
          >
            <button
              onClick={toggleThemeDropdown}
              className="navbar__theme-dd-btn shadow-color-sc"
            >
              <FiMoon xl:size={24} lg:size={24} md:size={16} />
            </button>
            {isThemeDropdownOpen && (
              <ul
                ref={dropdownRef1}
                className="navbar__themes-dd-list dropdown-menu-shadow dropdown-menu-scroll dropdown-menu-animation"
              >
                {themes.map((t, index) => (
                  <li key={index} className="navbar__themes-dd-item">
                    <button
                      onClick={() => handleThemeChange(t)}
                      className="navbar__themes-dd-item-btn"
                      title={t.name}
                    >
                      {/* Отображение превью темы */}
                      {t.img ? (
                        <img
                          src={t.img}
                          alt={t.name}
                          className="navbar__themes-dd-item-obj"
                        />
                      ) : t.video ? (
                        <div className="navbar__themes-dd-item-obj-container">
                          <video
                            className="navbar__themes-dd-item-obj"
                            autoPlay
                            loop
                            muted
                          >
                            <source src={t.video} type="video/mp4" />
                          </video>
                        </div>
                      ) : t.name === "MouseColorBackground" ? (
                        <motion.div
                          className="navbar__themes-dd-item-obj w-32 h-32 overflow-hidden relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                        >
                          {/* Оборачиваем в контейнер с фиксированным размером и скрытым оверфлоу */}
                          <MouseColorBackground />
                        </motion.div>
                      ) : t.name === "WaterfallShinyDrops" ? (
                        <motion.div
                          key={keyTrigger} // Использование keyTrigger для перерисовки
                          className="navbar__themes-dd-item-obj w-32 h-32 overflow-hidden relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                        >
                          <WaterfallShinyDrops keyTrigger={keyTrigger} />
                        </motion.div>
                      ) : t.name === "ElectricFlashes" ? (
                        <motion.div
                          className="navbar__themes-dd-item-obj w-32 h-32 overflow-hidden relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1 }}
                        >
                          {/* Оборачиваем в контейнер с фиксированным размером и скрытым оверфлоу */}
                          <ElectricFlashes />
                        </motion.div>
                      ) : (
                        <div
                          className="navbar__themes-dd-item-obj"
                          style={{
                            background:
                              t.color ||
                              "linear-gradient(to right, #2c3e50, #bdc3c7)",
                          }}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.button
            className="navbar__btn__contacts"
            onClick={handleButtonClick}
            custom={1}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ duration: 0.3 }}
            variants={headerVariantsX}
          >
            Связаться
          </motion.button>

          {isShowModal && (
            <ModalFeedback isOpen={isShowModal} onClose={Close2} />
          )}

          <motion.div
            ref={hamburgerRef}
            onClick={() => setNav(!nav)}
            className={`mobile__bar transition-all duration-300 ${
              nav ? "z-10" : "!z-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              className="relative"
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: nav ? 1.2 : 1, rotate: nav ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {nav ? (
                <FaTimes size={30} className="text-white hover:text-[#0fc]" />
              ) : (
                <FaBars size={30} className="text-white hover:text-[#0fc]" />
              )}
            </motion.div>
          </motion.div>
        </div>

        {nav && (
          <motion.ul
            className="mobile__nav__list"
            id="mbnav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(({ id, link, href }) => (
              <motion.li
                key={id}
                className="mobile__nav__item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: id * 0.1 }}
              >
                <a
                  className={`mobile__navbar__link center ${
                    activeLink === href ? "active" : ""
                  }`}
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                >
                  {link}
                </a>
              </motion.li>
            ))}
            <motion.li
              className="mobile__nav__item lg:hidden xl:hidden"
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={headerAnimation2}
            >
              <button onClick={handleButtonClick} className="contact__button">
                Связаться
              </button>
            </motion.li>
          </motion.ul>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
