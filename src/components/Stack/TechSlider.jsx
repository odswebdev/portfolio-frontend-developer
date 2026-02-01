import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { techItems } from "../constans/data";

const TechSlider = () => {
  const { ref: headingRef, inView: headingInView } = useInView({
    threshold: 0.1,
  });
  const { ref: sliderRef, inView: sliderInView } = useInView({
    threshold: 0.1,
  });

  const slider = useRef(null);

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    draggable: true, // Включаем возможность перетаскивания слайдов
    swipeToSlide: true, // Включаем возможность свайпа (для мобильных)
    touchMove: true, // Включаем поддержку перемещения слайдов с помощью касания
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  // Стиль для курсора при перетаскивании
  const handleMouseDown = () => {
    document.body.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    document.body.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    document.body.style.cursor = "default";
  };

  return (
    <section
      className="experience"
      id="experience"
      style={{
        backgroundImage: `var(--section-bg)`,
        backgroundSize: "cover",
        /*   backgroundPosition: "100% 100%", */
        backgroundAttachment: "fixed",
        padding: "50px 0",
      }}
    >
      <div className="tech__slider__container">
        <div className="tech__slider__wrapper">
          <motion.div
            ref={headingRef}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.1 },
              },
            }}
            className="tech__slider__heading__content"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="tech__slider__h__title"
            >
              Мой стек
            </motion.h2>
          </motion.div>

          <motion.div
            ref={sliderRef}
            initial="hidden"
            animate={sliderInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.8, delay: 0.2 },
              },
            }}
            className="tech-slider-container"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <Slider ref={slider} {...settings} className="tech__slider">
              {techItems.map((tech, index) => (
                <motion.div
                  key={index}
                  className="tech-slide"
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  custom={index}
                >
                  <div className="tech-icon">
                    <img src={tech.icon} alt={tech.name} />
                  </div>
                  <div className="tech-name">{tech.name}</div>
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechSlider;
