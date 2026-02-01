import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.3,
      ease: "easeInOut",
    },
  }),
};

const EducationCard = ({ title, subTitle, des, onHover }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="education-card"
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <motion.div
        variants={fadeInUp}
        custom={2}
        className="education-card__line"
      >
        <span className="education-card__icon">
          <span className="education-card__inner-icon"></span>
        </span>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        custom={3}
        className="education-card__content"
      >
        <div className="education-card__header">
          <div>
            <h3 className="education-card__title">{title}</h3>
            <p className="education-card__subtitle">{subTitle}</p>
          </div>
        </div>
        <p className="education-card__description">{des}</p>
      </motion.div>
    </motion.div>
  );
};

export default EducationCard;
