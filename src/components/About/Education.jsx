import React, { useState } from "react";
import { motion } from "framer-motion";
import EducationCard from "./EducationCard";

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

const Education = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <motion.section
      id="education"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="education"
    >
      <div className="education__container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="education__wrapper"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            className="education__wrapper-group group lgl:flex-row lgl:gap-20"
          >
            <motion.div variants={fadeInUp} custom={0}>
              <div className="education__header lgl:py-12 font-titleFont">
                <h2 className="education__title">Образование</h2>
                <p className="education__year">2007 - 2012</p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              custom={1}
              className={`education__content-wrapper lgl:mt-14 ${
                isHovered ? "education__content-wrapper--hover" : ""
              }`}
            >
              <EducationCard
                title="Инженер-программист"
                subTitle="Саратовский государственный технический университет им. Ю.А. Гагарина"
                result="Саратов"
                des="(МФПИТ) Международный факультет прикладных информационных технологий, Информационные системы и технологии"
                onHover={handleHover}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;
