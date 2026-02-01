import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaTh } from "react-icons/fa";
import clsx from "clsx";
import useWindowSize from "./useWindowSize";

const ViewSwitcher = ({ selectedView, handleViewChange }) => {
  const { width } = useWindowSize(); // Получаем ширину экрана
  const [activeTab, setActiveTab] = useState(0); // Состояние для активного таба
  const [userSelectedTab, setUserSelectedTab] = useState(null); // Храним информацию о выбранном табе пользователем

  // Функция для проверки доступности таба в зависимости от ширины экрана
  const isTabAvailable = (tabIndex) => {
    if (width < 768 && tabIndex === 2) {
      // Если на мобильном устройстве, таб 2 скрыт
      return false;
    }
    return true;
  };

  useEffect(() => {
    // Если пользователь уже выбрал таб, не сбрасываем его
    if (userSelectedTab !== null) return;

    // Если ширина экрана <= 768px (мобильное устройство), сбрасываем на первый таб
    if (width < 768) {
      setActiveTab(1); // Сбрасываем на первый таб для мобильных
      handleViewChange("one-column");
    }
    // Если ширина экрана <= 1024px (планшет)
    else if (width <= 1024) {
      setActiveTab(2); // Сбрасываем на второй таб для планшетов
      handleViewChange("two-columns");
    }
    // Для ПК (ширина экрана > 1024px)
    else {
      setActiveTab(0); // Оставляем активным таб "grid" для ПК
      handleViewChange("grid");
    }
  }, [width, userSelectedTab, handleViewChange]);

  // Функция для переключения таба
  const handleTabChange = (tabIndex, viewType) => {
    setUserSelectedTab(tabIndex); // Сохраняем выбор пользователя
    setActiveTab(tabIndex); // Обновляем активный таб
    handleViewChange(viewType); // Обновляем представление
  };

  // Функция для выбора первого доступного таба, если текущий скрыт
  useEffect(() => {
    // Если текущий активный таб скрыт, ищем первый доступный таб
    if (!isTabAvailable(activeTab)) {
      for (let i = 0; i < 3; i++) {
        if (isTabAvailable(i)) {
          setActiveTab(i);
          // Обновляем представление в зависимости от выбранного таба
          if (i === 0) handleViewChange("grid");
          if (i === 1) handleViewChange("one-column");
          if (i === 2) handleViewChange("two-columns");
          break;
        }
      }
    }
  }, [activeTab, width, handleViewChange]);

  useEffect(() => {
    // Если мы переходим на мобильное устройство или планшет, сбрасываем выбор пользователя
    if (width < 768 || width <= 1024) {
      setUserSelectedTab(null); // Сбрасываем выбор пользователя на мобильных и планшетах
    }
  }, [width]);

  const { ref, inView } = useInView({
    triggerOnce: false, // анимация сработает только один раз, при первом вхождении в область видимости
    threshold: 0.2, // когда 20% элемента окажется в области видимости
  });

  const switcherVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  /* view__switcher-first__wrapper */
  return (
    <motion.div
      ref={ref}
      className="view__switcher-container"
      initial="hidden"
      animate={inView ? "visible" : "hidden"} // анимация запускается, когда элемент в области видимости
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      transition={{ staggerChildren: 0.2, duration: 0.3 }}
    >
      <motion.div
        className="!flex !flex-wrap !gap-4 !mb-6 !mt-4 items-center justify-between"
        variants={childVariants}
      >
        <button
          onClick={() => handleTabChange(0, "grid")}
          className={clsx(
            "view__switcher-btn lg:block sm:hidden xs:hidden",
            activeTab === 0
              ? "view__switcher-btn--active"
              : "view__switcher-btn--inactive"
          )}
          title="Сетка"
        >
          <FaTh size={24} />
        </button>
        <button
          onClick={() => handleTabChange(1, "one-column")}
          className={clsx(
            "view__switcher-btn xl:block lg:hidden md:hidden sm:block xs:block",
            activeTab === 1
              ? "view__switcher-btn--active active bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white"
              : "view__switcher-btn--inactive bg-gradient-to-r from-[#FFB147] to-[#FFB147] hover:from-[#FF4B2B] hover:to-[#FF416C]"
          )}
          title="Колонка"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V5Z"
              stroke="#FFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => handleTabChange(2, "two-columns")}
          className={clsx(
            "view__switcher-btn xl:block lg:block md:block sm:hidden xs:hidden",
            activeTab === 2
              ? "view__switcher-btn--active active bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white"
              : "view__switcher-btn--inactive bg-gradient-to-r from-[#FFB147] to-[#FFB147] hover:from-[#FF4B2B] hover:to-[#FF416C]"
          )}
          title="2 колонки"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm6 0H5v4h4V5zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5zm6 0h-4v4h4V5zM3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4zm6 0H5v4h4v-4zm4 0a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4zm6 0h-4v4h4v-4z"
              fill="#FFF"
            />
          </svg>
        </button>
        <button
          onClick={() => handleTabChange(3, "four-columns")}
          className={clsx(
            "view__switcher-btn xl:block lg:hidden md:hidden sm:hidden xs:hidden",
            activeTab === 3
              ? "view__switcher-btn--active active bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white"
              : "view__switcher-btn--inactive bg-gradient-to-r from-[#FFB147] to-[#FFB147] hover:from-[#FF4B2B] hover:to-[#FF416C]"
          )}
          title="4 колонки"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="-0.5 0 19 19"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
          >
            <title>4 колонки</title>
            <defs></defs>
            <g
              id="out"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              sketch:type="MSPage"
            >
              <path
                d="M1,9.88888892 L4.66666663,9.88888892 L4.66666663,13.5555555 L1,13.5555555 L1,9.88888892 L1,9.88888892 Z M5.44444446,9.88888892 L9.11111108,9.88888892 L9.11111108,13.5555555 L5.44444446,13.5555555 L5.44444446,9.88888892 L5.44444446,9.88888892 Z M9.88888892,9.88888892 L13.5555555,9.88888892 L13.5555555,13.5555555 L9.88888892,13.5555555 L9.88888892,9.88888892 L9.88888892,9.88888892 Z M14.3333334,9.88888892 L18,9.88888892 L18,13.5555555 L14.3333334,13.5555555 L14.3333334,9.88888892 L14.3333334,9.88888892 Z M1,14.3333334 L4.66666663,14.3333334 L4.66666663,18 L1,18 L1,14.3333334 L1,14.3333334 Z M5.44444446,14.3333334 L9.11111108,14.3333334 L9.11111108,18 L5.44444446,18 L5.44444446,14.3333334 L5.44444446,14.3333334 Z M9.88888892,14.3333334 L13.5555555,14.3333334 L13.5555555,18 L9.88888892,18 L9.88888892,14.3333334 L9.88888892,14.3333334 Z M14.3333334,14.3333334 L18,14.3333334 L18,18 L14.3333334,18 L14.3333334,14.3333334 L14.3333334,14.3333334 Z M1,5.44444446 L4.66666663,5.44444446 L4.66666663,9.11111108 L1,9.11111108 L1,5.44444446 L1,5.44444446 Z M5.44444446,5.44444446 L9.11111108,5.44444446 L9.11111108,9.11111108 L5.44444446,9.11111108 L5.44444446,5.44444446 L5.44444446,5.44444446 Z M9.88888892,5.44444446 L13.5555555,5.44444446 L13.5555555,9.11111108 L9.88888892,9.11111108 L9.88888892,5.44444446 L9.88888892,5.44444446 Z M14.3333334,5.44444446 L18,5.44444446 L18,9.11111108 L14.3333334,9.11111108 L14.3333334,5.44444446 L14.3333334,5.44444446 Z M1,1 L4.66666663,1 L4.66666663,4.66666663 L1,4.66666663 L1,1 L1,1 Z M5.44444446,1 L9.11111108,1 L9.11111108,4.66666663 L5.44444446,4.66666663 L5.44444446,1 L5.44444446,1 Z M9.88888892,1 L13.5555555,1 L13.5555555,4.66666663 L9.88888892,4.66666663 L9.88888892,1 L9.88888892,1 Z M14.3333334,1 L18,1 L18,4.66666663 L14.3333334,4.66666663 L14.3333334,1 L14.3333334,1 Z"
                id="path"
                fill="#FFF"
                sketch:type="MSShapeGroup"
              ></path>
            </g>
          </svg>
        </button>
        <button
          onClick={() => handleTabChange(4, "slider")}
          className={clsx(
            "view__switcher-btn",
            activeTab === 4
              ? "view__switcher-btn--active active bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white"
              : "view__switcher-btn--inactive bg-gradient-to-r from-[#FFB147] to-[#FFB147] hover:from-[#FF4B2B] hover:to-[#FF416C]"
          )}
          title="Слайдер"
        >
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 512 512"
            fill="#FFF"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M490.667,0H21.333C9.552,0,0,9.551,0,21.333v128v341.333C0,502.449,9.552,512,21.333,512h469.333
			c11.782,0,21.333-9.551,21.333-21.333V149.333v-128C512,9.551,502.45,0,490.667,0z M469.334,469.333H42.667V384h426.667V469.333z
			 M469.334,341.334H42.667V170.667h426.667V341.334z M469.334,128H42.667V42.667h426.667V128z"
                />
              </g>
            </g>
            <g>
              <g>
                <path d="M85.333,64C73.557,64,64,73.557,64,85.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333S97.109,64,85.333,64z" />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M149.333,64C137.557,64,128,73.557,128,85.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
			S161.109,64,149.333,64z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M213.333,64C201.557,64,192,73.557,192,85.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
			S225.109,64,213.333,64z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M192,405.333c-11.776,0-21.333,9.557-21.333,21.333S180.224,448,192,448s21.333-9.557,21.333-21.333
			S203.776,405.333,192,405.333z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M256,405.333c-11.776,0-21.333,9.557-21.333,21.333S244.224,448,256,448s21.333-9.557,21.333-21.333
			S267.776,405.333,256,405.333z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M320,405.333c-11.776,0-21.333,9.557-21.333,21.333S308.224,448,320,448s21.333-9.557,21.333-21.333
			S331.776,405.333,320,405.333z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M115.503,256l27.582-27.582c8.331-8.331,8.331-21.838,0-30.17c-8.331-8.331-21.839-8.331-30.17,0l-42.667,42.667
			c-8.331,8.331-8.331,21.839,0,30.17l42.667,42.667c8.331,8.331,21.839,8.331,30.17,0s8.331-21.839,0-30.17L115.503,256z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M441.753,240.915l-42.667-42.667c-8.331-8.331-21.839-8.331-30.17,0s-8.331,21.839,0,30.17L396.497,256l-27.582,27.582
			c-8.331,8.331-8.331,21.839,0,30.17c8.331,8.331,21.839,8.331,30.17,0l42.667-42.667
			C450.083,262.754,450.083,249.246,441.753,240.915z"
                />
              </g>
            </g>
          </svg>
        </button>
        <button
          onClick={() => handleTabChange(5, "original")}
          className={clsx(
            "view__switcher-btn",
            activeTab === 5
              ? "view__switcher-btn--active"
              : "view__switcher-btn--inactive"
          )}
          title="Список"
        >
          <svg
            fill="#FFF"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M19,13 C20.6568542,13 22,14.3431458 22,16 L22,19 C22,20.6568542 20.6568542,22 19,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,16 C2,14.3431458 3.34314575,13 5,13 L19,13 Z M19,15 L5,15 C4.44771525,15 4,15.4477153 4,16 L4,19 C4,19.5522847 4.44771525,20 5,20 L19,20 C19.5522847,20 20,19.5522847 20,19 L20,16 C20,15.4477153 19.5522847,15 19,15 Z M19,2 C20.6568542,2 22,3.34314575 22,5 L22,8 C22,9.65685425 20.6568542,11 19,11 L5,11 C3.34314575,11 2,9.65685425 2,8 L2,5 C2,3.34314575 3.34314575,2 5,2 L19,2 Z M19,4 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,8 C4,8.55228475 4.44771525,9 5,9 L19,9 C19.5522847,9 20,8.55228475 20,8 L20,5 C20,4.44771525 19.5522847,4 19,4 Z"
            />
          </svg>
        </button>
        <button
          onClick={() => handleTabChange(6, "carousel")}
          className={clsx(
            "view__switcher-btn",
            activeTab === 6
              ? "view__switcher-btn--active"
              : "view__switcher-btn--inactive"
          )}
          title="Карусель"
        >
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#FFF"
            width="24"
            height="24"
          >
            <path
              d="m22 4.75c0-.206-.163-.75-.75-.75-.159 0-.305.071-.45.15-1.772.966-3.4 1.85-3.4 1.85v11.996s1.913 1.054 3.399 1.854c.146.079.292.15.451.15.583 0 .75-.533.75-.75zm-20 0c0-.206.163-.75.75-.75.159 0 .305.071.45.15 1.772.966 3.4 1.85 3.4 1.85v11.996s-1.913 1.054-3.399 1.854c-.146.079-.292.15-.451.15-.583 0-.75-.533-.75-.75zm14 2.25c0-.552-.448-1-1-1h-6c-.552 0-1 .448-1 1v10c0 .552.448 1 1 1h6c.552 0 1-.448 1-1z"
              fillRule="nonzero"
              fill="#FFF"
            />
          </svg>
        </button>
        <button
          onClick={() => handleTabChange(7, "slider-caption")}
          className={clsx(
            "view__switcher-btn hidden xl:block",
            activeTab === 7
              ? "view__switcher-btn--active"
              : "view__switcher-btn--inactive"
          )}
          title="Слайдер с подписью"
        >
          <svg
            id="Capa_1"
            enableBackground="new 0 0 512 512"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <g>
              <g>
                <path
                  d="m444.63 301.447c-2.062 0-4.14-.635-5.927-1.952-4.445-3.277-5.392-9.538-2.114-13.983l11.741-15.924-11.745-15.949c-3.275-4.447-2.325-10.707 2.123-13.982 4.447-3.274 10.707-2.324 13.982 2.123l16.114 21.883c2.598 3.528 2.597 8.338-.003 11.864l-16.114 21.854c-1.96 2.659-4.989 4.066-8.057 4.066z"
                  fill="#FFF"
                ></path>
              </g>
              <g>
                <path
                  d="m387.73 72.61c5.523 0 10-4.478 10-10s-4.477-10-10-10h-.057c-5.523 0-9.972 4.478-9.972 10s4.507 10 10.029 10z"
                  fill="#FFF"
                ></path>
                <path
                  d="m441.716 72.61c5.523 0 10-4.478 10-10s-4.477-10-10-10h-.057c-5.523 0-9.972 4.478-9.972 10s4.506 10 10.029 10z"
                  fill="#FFF"
                ></path>
                <path
                  d="m333.773 72.61c5.523 0 10-4.478 10-10s-4.477-10-10-10h-.057c-5.523 0-9.972 4.478-9.972 10s4.506 10 10.029 10z"
                  fill="#FFF"
                ></path>
                <path
                  d="m70.284 72.61h150.241c5.523 0 10-4.478 10-10s-4.477-10-10-10h-150.241c-5.523 0-10 4.478-10 10s4.477 10 10 10z"
                  fill="#FFF"
                ></path>
                <path
                  d="m479.901 0h-447.83c-17.684 0-32.071 14.379-32.071 32.053v447.866c0 17.689 14.387 32.081 32.071 32.081h447.83c17.7 0 32.099-14.392 32.099-32.081v-447.866c0-17.674-14.399-32.053-32.099-32.053zm-447.83 20h447.83c6.671 0 12.099 5.407 12.099 12.053v73.167h-472v-73.167c0-6.646 5.415-12.053 12.071-12.053zm447.83 472h-447.83c-6.656 0-12.071-5.42-12.071-12.081v-354.699h472v354.699c0 6.661-5.428 12.081-12.099 12.081z"
                  fill="#FFF"
                ></path>
                <path
                  d="m346.709 422.014h-29.078c-5.523 0-10 4.478-10 10s4.477 10 10 10h29.078c5.523 0 10-4.478 10-10s-4.477-10-10-10z"
                  fill="#FFF"
                ></path>
                <path
                  d="m273.745 422.014h-29.078c-5.523 0-10 4.478-10 10s4.477 10 10 10h29.078c5.523 0 10-4.478 10-10s-4.477-10-10-10z"
                  fill="#FFF"
                ></path>
                <path
                  d="m110.681 422.014h-29.078c-5.523 0-10 4.478-10 10s4.477 10 10 10h29.078c5.523 0 10-4.478 10-10s-4.477-10-10-10z"
                  fill="#FFF"
                ></path>
                <path
                  d="m177.66 398.969c-18.231 0-33.064 14.824-33.064 33.045 0 18.237 14.833 33.074 33.064 33.074 18.247 0 33.092-14.837 33.092-33.074 0-18.221-14.845-33.045-33.092-33.045zm0 46.119c-7.204 0-13.064-5.865-13.064-13.074 0-7.193 5.86-13.045 13.064-13.045 7.219 0 13.092 5.852 13.092 13.045 0 7.209-5.873 13.074-13.092 13.074z"
                  fill="#FFF"
                ></path>
                <path
                  d="m419.702 422.014h-29.078c-5.523 0-10 4.478-10 10s4.477 10 10 10h29.078c5.523 0 10-4.478 10-10s-4.477-10-10-10z"
                  fill="#FFF"
                ></path>
                <path
                  d="m305.414 372.057h94.28c5.495 0 10.051-4.625 10.008-10.115v-199.838c0-5.522-4.477-10-10-10h-98.78c-5.523 0-10 4.478-10 10s4.477 10 10 10h88.78v157.842l-61.03-88.482c-1.867-2.706-4.944-4.322-8.231-4.322-3.287 0-6.365 1.615-8.231 4.321l-38.979 56.502-56.218-81.502c-1.867-2.706-4.944-4.322-8.232-4.322s-6.365 1.616-8.231 4.322l-78.28 113.485v-157.844h88.78c5.523 0 10-4.478 10-10s-4.477-10-10-10h-98.78c-5.523 0-10 4.478-10 10v199.839c-.053 5.49 4.521 10.113 10.008 10.113h193.092c.014.001.029.001.044.001zm15.025-107.304 60.217 87.304h-70.116l-25.163-36.48zm-111.659-25 77.465 112.304h-154.93z"
                  fill="#FFF"
                ></path>
                <path
                  d="m255.986 172.104h.057c5.523 0 9.972-4.478 9.972-10s-4.505-10-10.028-10-10 4.478-10 10 4.476 10 9.999 10z"
                  fill="#FFF"
                ></path>
                <path
                  d="m452.69 241.779c-3.275-4.447-9.535-5.397-13.982-2.123-4.447 3.275-5.397 9.535-2.123 13.982l11.745 15.949-11.741 15.924c-3.277 4.445-2.331 10.706 2.114 13.983 1.787 1.317 3.865 1.952 5.927 1.952 3.068 0 6.096-1.407 8.057-4.066l16.114-21.854c2.6-3.526 2.602-8.336.003-11.864z"
                  fill="#FFF"
                ></path>
                <path
                  d="m75.411 285.512-11.741-15.924 11.745-15.949c3.275-4.447 2.325-10.707-2.123-13.982-4.448-3.274-10.708-2.324-13.982 2.123l-16.114 21.883c-2.598 3.528-2.597 8.338.003 11.864l16.114 21.854c1.961 2.659 4.988 4.066 8.057 4.066 2.061 0 4.141-.636 5.927-1.952 4.445-3.277 5.391-9.538 2.114-13.983z"
                  fill="#FFF"
                ></path>
              </g>
            </g>
          </svg>
        </button>
        <button
          onClick={() => handleTabChange(8, "masnory")}
          className={clsx(
            "view__switcher-btn xs:hidden sm:hidden md:hidden lg:hidden xl:block",
            activeTab === 8
              ? "view__switcher-btn--active"
              : "view__switcher-btn--inactive"
          )}
          title="MasnoryGrid"
        >
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#FFF"
            width="24"
            height="24"
          >
            <path
              d="m22 4.75c0-.206-.163-.75-.75-.75-.159 0-.305.071-.45.15-1.772.966-3.4 1.85-3.4 1.85v11.996s1.913 1.054 3.399 1.854c.146.079.292.15.451.15.583 0 .75-.533.75-.75zm-20 0c0-.206.163-.75.75-.75.159 0 .305.071.45.15 1.772.966 3.4 1.85 3.4 1.85v11.996s-1.913 1.054-3.399 1.854c-.146.079-.292.15-.451.15-.583 0-.75-.533-.75-.75zm14 2.25c0-.552-.448-1-1-1h-6c-.552 0-1 .448-1 1v10c0 .552.448 1 1 1h6c.552 0 1-.448 1-1z"
              fillRule="nonzero"
              fill="#FFF"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ViewSwitcher;
