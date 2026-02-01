import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GradientOverlayService from "./GradientOverlayService";
import { gradients, themes, servicesData } from "../constans/data";
import ServiceIcons from "./ServiceIcons";

const randomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const Services = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[3]);

  return (
    <section
      id="services"
      style={{
        backgroundImage: `var(--section-bg)`,
        backgroundSize: "cover",
        /*   backgroundPosition: "100% 100%", */
        backgroundAttachment: "fixed",
        padding: "50px 0",
      }}
    >
      <div className="services__container">
        <motion.div className="services__wrapper">
          <div className="services__heading__content">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="services__title"
            >
              Мои услуги
            </motion.h2>
          </div>
          <div className="services__content">
            {servicesData.map((service, index) => {
              const ServiceIcon = ServiceIcons[service.icon];
              return (
                <motion.div
                  key={index}
                  className="services__item shadow-lg rounded-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <GradientOverlayService />
                  <div>
                    <motion.h3
                      className="break-words"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {service.title}
                    </motion.h3>
                    <div className="icon-wrapper">
                      <ServiceIcon />
                    </div>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {service.description}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
