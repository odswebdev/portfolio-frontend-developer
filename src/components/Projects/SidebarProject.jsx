import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { FaTh, FaList, FaTags, FaTimes } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import {
  Chip,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { projects } from "../constans/data";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaSass,
  FaNodeJs,
  FaWordpress,
} from "react-icons/fa";
import { SiJquery, SiTailwindcss } from "react-icons/si";
import ViewSwitcher from "./ViewSwitcher";
import { effects } from "../constans/data";
import clsx from "clsx";

const techIcons = {
  Html: <FaHtml5 className="text-orange-500 text-xl" />,
  Css: <FaCss3Alt className="text-blue-500 text-xl" />,
  Js: <FaJsSquare className="text-yellow-500 text-xl" />,
  React: <FaReact className="text-blue-400 text-xl" />,
  Jquery: <SiJquery className="text-blue-600 text-xl" />,
  Tailwindcss: <SiTailwindcss className="text-teal-400 text-xl" />,
  Sass: <FaSass className="text-pink-500 text-xl" />,
  Nodejs: <FaNodeJs className="text-green-500 text-xl" />,
  Wordpress: <FaWordpress className="text-indigo-500 text-xl" />,
};

const SidebarProject = ({
  activeTab,
  setActiveTab,
  categories,
  handleFilterChange,
  selectedTech,
  onTechnologySelect,
  handleViewChange,
  onEffectChange,
  effects,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // анимация сработает только один раз, при первом вхождении в область видимости
    threshold: 0.2, // когда 20% элемента окажется в области видимости
  });

  const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  // Собираем все технологии и удаляем дубликаты
  /* const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach((project) =>
      project.tech.forEach((t) => techSet.add(t.trim().toLowerCase()))
    );
    return Array.from(techSet).map(
      (tech) => tech.charAt(0).toUpperCase() + tech.slice(1)
    );
  }, []); */

  const [isTechnologiesVisible, setIsTechnologiesVisible] = useState(true);
  const [selectedEffect, setSelectedEffect] = useState("Fade");
  const [selectedView, setSelectedView] = useState("grid");
  const [selectedTech2, setSelectedTech] = useState(["Html", "React"]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Текущее разрешение экрана
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Функция для открытия/закрытия sidebar на мобильных устройствах
  const toggleSidebarM = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // При загрузке страницы, можно задать начальные активные технологии, если это необходимо.
    setSelectedTech(["Html", "React"]); // Пример начальных выбранных технологий
  }, []);

  // Функция для обновления состояния в зависимости от ширины окна
  const updateView = () => {
    if (window.innerWidth < 768) {
      setSelectedView("one-column"); // Для мобильных устройств
    } else if (window.innerWidth <= 1024) {
      setSelectedView("two-columns"); // Для планшетов
    } else {
      setSelectedView("grid"); // Для ПК
    }
  };

  useEffect(() => {
    // Изначальная настройка
    updateView();

    // Обработчик события изменения размера окна с задержкой
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      clearTimeout(windowResizeTimer);
      windowResizeTimer = setTimeout(updateView, 200); // Задержка 200 мс
    };

    let windowResizeTimer;
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(windowResizeTimer); // Очистка таймера при размонтировании
    };
  }, []);

  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(
        (project) => project.tech.map((t) => t.trim().toLowerCase()) // Приводим каждую технологию к нижнему регистру и удаляем пробелы
      )
    )
  ).map((tech) => tech.charAt(0).toUpperCase() + tech.slice(1));

  // Обработка выбора технологии
  const toggleTechnology = (tech) => {
    setSelectedTech(
      (prev) =>
        prev.includes(tech)
          ? prev.filter((t) => t !== tech) // Удаление технологии из выбранных
          : [...prev, tech] // Добавление технологии в выбранные
    );
  };

  // Фильтрация проектов
  const filteredProjects = useMemo(() => {
    if (selectedTech.length === 0) return projects;
    return projects.filter((project) =>
      selectedTech.every((tech) =>
        project.tech.map((t) => t.trim()).includes(tech)
      )
    );
  }, [selectedTech]);

  const toggleTechnologiesVisibility = () => {
    setIsTechnologiesVisible((prev) => !prev);
  };

  // Отслеживаем изменение размера окна
  useEffect(() => {
    const handleResize = () => {
      // Можем добавлять адаптивное поведение, если необходимо
    };

    window.addEventListener("resize", handleResize);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* const handleViewChange = (newView) => {
    setSelectedView(newView);
  }; */

  const [open, setOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  /* const handleSelectChange = (e) => {
    setSelectedEffect(e.target.value);
    setFadeOut(true);
    setTimeout(() => {
      setOpen(false);
      setFadeOut(false);
    }, 300);
  }; */

  /* const handleSelectChange = (event) => {
    const selectedValue = event?.target?.value; // Защита от ошибок
    if (selectedValue) {
      setSelectedEffect(selectedValue); // Устанавливаем эффект
      onEffectChange(selectedValue);
    }
  }; */

  const handleSelectChange = (event) => {
    const effect = event?.target?.value; // Это значение из выпадающего списка
    setSelectedEffect(effect);
    onEffectChange(effect); // Передаем выбранный эффект в родительский компонент
  };

  useEffect(() => {
    // Когда выпадающий список открывается
    if (open) {
      // Убираем свойство overflow: hidden у body
      document.body.style.overflow = "auto";
    } else {
      // Восстанавливаем прокрутку на body, когда меню закрыто
      document.body.style.overflow = "auto";
    }

    return () => {
      // Очистка, чтобы избежать багов при смене компонента
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    const el = document.querySelector("body"); // или body / .page / .wrapper
    if (isSidebarOpen && el) {
      el.classList.add("no-padding");
    } else {
      el.classList.remove("no-padding");
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  return (
    <>
      {/* Кнопка фильтра — только на мобильных и планшетах */}
      <button
        className="xl:hidden relative bottom-4 left-4 theme-lr text-white px-4 py-2 rounded-md z-50"
        onClick={toggleSidebarM}
      >
        Открыть фильтр
      </button>

      {/* Popup sidebar на мобильных/планшетах */}
      {isSidebarOpen && (
        <div className="hf-sidebar">
          <div className="hf-sidebar2">
            <div className="relative w-full max-w-md theme-lr p-2 rounded-lg">
              <button
                className="absolute top-4 right-4 text-[#fff] text-xl z-10"
                onClick={toggleSidebarM}
              >
                <FaTimes size={30} className="text-white hover:text-[#0fc]" />
              </button>

              <motion.div
                ref={ref}
                className={clsx(
                  "flex justify-center items-center flex-col p-6 relative top-[0%] rounded-[0.5rem] backdrop-blur-md transition-all duration-300 ease-in-out",
                  "lg:w-72", // Ширина для больших экранов
                  "sm:w-64", // Ширина для средних экранов
                  "w-full" // Ширина для маленьких экранов
                )}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Блок фильтров */}
                {isTechnologiesVisible && (
                  <motion.div
                    ref={ref} // отслеживаем видимость блока с помощью useInView
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"} // анимация запускается, когда элемент в области видимости
                    variants={{
                      visible: { opacity: 1 },
                      hidden: { opacity: 0 },
                    }}
                    transition={{ staggerChildren: 0.2, duration: 0.3 }}
                    className="flex flex-wrap gap-2 mb-6 mt-4"
                  >
                    {allTechnologies.map((tech) => (
                      <motion.div
                        key={tech}
                        variants={childVariants}
                        className="transform transition-all duration-300 hover:scale-110"
                      >
                        <Chip
                          key={tech}
                          label={
                            <div
                              className={`flex items-center gap-2 scale-120 ${
                                selectedTech.includes(tech) ? "active" : ""
                              }`}
                            >
                              {techIcons[tech] || (
                                <span className="text-gray-500 text-xl font-bold">
                                  {tech[0].toUpperCase()}
                                </span>
                              )}
                            </div>
                          }
                          onClick={() => onTechnologySelect(tech)}
                          variant={
                            selectedTech.includes(tech) ? "filled" : "outlined"
                          }
                          color="primary"
                          sx={{
                            cursor: "pointer",
                            backgroundColor: selectedTech.includes(tech)
                              ? "#0fc"
                              : "transparent",
                            color: selectedTech.includes(tech)
                              ? "#fff"
                              : "#000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            padding: 0,
                            ":hover": {
                              background:
                                "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,252,252,0.6), rgba(0,255,255,0.4))",
                              boxShadow: "0 4px 30px rgba(0, 252, 252, 0.5)",
                            },
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {isTechnologiesVisible && (
                  <motion.div>
                    <ViewSwitcher
                      setSelectedView={selectedView}
                      selectedView={selectedView}
                      handleViewChange={handleViewChange}
                    />
                  </motion.div>
                )}

                {/* Эффекты Dropdown */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
                  transition={{ staggerChildren: 0.2, duration: 0.3 }}
                  className="mt-6"
                >
                  <FormControl fullWidth>
                    <Select
                      value={selectedEffect}
                      id="effectSelect"
                      onChange={handleSelectChange} // Pass the reference here
                      className="effect-select xs:!w-full"
                      displayEmpty
                      fullWidth
                      variant="outlined"
                      label="Выберите эффект"
                      open={open}
                      onOpen={() => setOpen(true)}
                      onClose={() => setOpen(false)}
                      sx={{
                        transition: "all 0.3s ease",
                        background:
                          "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,252,252,0.6), rgba(0,255,255,0.4))", // Градиент с #0fc
                        backdropFilter: "blur(0px)",
                        color: "#fff",
                        borderRadius: "8px",
                        fontSize: "16px",
                        paddingLeft: "72px",
                        "&:hover": {
                          boxShadow: "0 4px 30px rgba(0, 252, 252, 0.3)",
                          outline: "none",
                          border: "none",
                        },
                        "&.Mui-focused": {
                          outline: "none",
                          border: "none",
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            background:
                              "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,255,255,0.4))", // Градиент для выпадающего списка
                            boxShadow: "0 6px 25px rgba(0, 0, 0, 0.5)", // Тень для глубины
                            maxWidth: "100%",
                            width: "100%",
                            opacity: fadeOut ? 0 : 1, // Ensure opacity is managed correctly
                          },
                        },
                      }}
                    >
                      {effects.map((effect) => (
                        <MenuItem
                          key={effect}
                          value={effect}
                          sx={{
                            color: "#fff",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              background:
                                "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,255,255,0.4))", // Градиент при наведении на элемент
                              color: "#fff", // Цвет текста при наведении
                              boxShadow: "0 2px 10px rgba(0, 252, 252, 0.3)", // Легкая тень
                            },
                          }}
                        >
                          {effect}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <motion.div
        ref={ref}
        className={clsx(
          "xl:flex xs:hidden flex-col p-6 h-full bg-white/10 rounded-[0.5rem] shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out xs:mb-[2rem]",
          "lg:w-72", // Ширина для больших экранов
          "sm:w-64", // Ширина для средних экранов
          "w-full" // Ширина для маленьких экранов
        )}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        {/* Технологии Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
          transition={{ staggerChildren: 0.2, duration: 0.3 }}
        >
          <Button
            variant="contained"
            color={activeTab === 2 ? "secondary" : "primary"}
            className="mb-8"
            fullWidth
            startIcon={<FaTags />}
            sx={{
              transition: "all 0.3s ease",
              background:
                "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,252,252,0.6), rgba(0,255,255,0.4))", // Градиент с #0fc
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(0, 252, 252, 0.3)",
              ":hover": {
                background:
                  "linear-gradient(90deg, rgba(0,252,252,0.9), rgba(0,252,252,0.7), rgba(0,255,255,0.5))", // Градиент для ховера
                boxShadow: "0 4px 30px rgba(0, 252, 252, 0.5)",
              },
            }}
          >
            Технологии
          </Button>
        </motion.div>

        {/* Блок фильтров */}
        {isTechnologiesVisible && (
          <motion.div
            ref={ref} // отслеживаем видимость блока с помощью useInView
            initial="hidden"
            animate={inView ? "visible" : "hidden"} // анимация запускается, когда элемент в области видимости
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            transition={{ staggerChildren: 0.2, duration: 0.3 }}
            className="flex flex-wrap gap-2 mb-6 mt-4"
          >
            {allTechnologies.map((tech) => (
              <motion.div
                key={tech}
                variants={childVariants}
                className="transform transition-all duration-300 hover:scale-110"
              >
                <Chip
                  key={tech}
                  label={
                    <div
                      className={`flex items-center gap-2 scale-120 ${
                        selectedTech.includes(tech) ? "active" : ""
                      }`}
                    >
                      {techIcons[tech] || (
                        <span className="text-gray-500 text-xl font-bold">
                          {tech[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                  }
                  onClick={() => onTechnologySelect(tech)}
                  variant={selectedTech.includes(tech) ? "filled" : "outlined"}
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    backgroundColor: selectedTech.includes(tech)
                      ? "#0fc"
                      : "transparent",
                    color: selectedTech.includes(tech) ? "#fff" : "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    padding: 0,
                    ":hover": {
                      background:
                        "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,252,252,0.6), rgba(0,255,255,0.4))",
                      boxShadow: "0 4px 30px rgba(0, 252, 252, 0.5)",
                    },
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { opacity: 1 }, hidden: { opacity: 0 } }}
          transition={{ staggerChildren: 0.2, duration: 0.3 }}
        >
          {/* Технологии Button */}
          <Button
            variant="contained"
            color={activeTab === 2 ? "secondary" : "primary"}
            className="mb-8"
            fullWidth
            startIcon={<FaTags />}
            sx={{
              transition: "all 0.3s ease",
              background:
                "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,252,252,0.6), rgba(0,255,255,0.4))", // Градиент с #0fc
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(0, 252, 252, 0.3)",
              ":hover": {
                background:
                  "linear-gradient(90deg, rgba(0,252,252,0.9), rgba(0,252,252,0.7), rgba(0,255,255,0.5))", // Градиент для ховера
                boxShadow: "0 4px 30px rgba(0, 252, 252, 0.5)",
              },
            }}
          >
            Layouts
          </Button>
        </motion.div>

        {isTechnologiesVisible && (
          <motion.div>
            <ViewSwitcher
              setSelectedView={selectedView}
              selectedView={selectedView}
              handleViewChange={handleViewChange}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default SidebarProject;
