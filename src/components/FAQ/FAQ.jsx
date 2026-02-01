import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { faqs } from "../constans/data";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      style={{
        backgroundImage: `var(--section-bg)`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundAttachment: "fixed",
        padding: "50px 0",
      }}
    >
      <div className="faq__container">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="faq__title"
        >
          Часто задаваемые вопросы
        </motion.h2>
        <div className="faq__items">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="faq__item"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2, // Задержка для последовательной анимации
              }}
            >
              <motion.button
                className={`faq__button ${
                  activeIndex === index
                    ? "faq__button--active"
                    : "faq__button--inactive"
                }`}
                onClick={() => toggleAccordion(index)}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{
                  scale: activeIndex === index ? 1.05 : 1,
                  opacity: 1,
                  filter:
                    activeIndex === index ? "brightness(1.2)" : "brightness(1)",
                }}
                transition={{ duration: 0.5 }}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-content-${index}`}
                whileHover={{ scale: 1.03 }}
              >
                <span className="faq__question">
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: activeIndex === index ? 1.5 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="faq__icon"
                  >
                    <AiOutlineQuestionCircle size={28} />
                  </motion.span>
                  <span>{faq.question}</span>
                </span>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="faq__chevron"
                >
                  <FiChevronDown size={24} />
                </motion.span>
              </motion.button>
              <motion.div
                id={`faq-content-${index}`}
                className="faq__content"
                initial={{ height: 0, opacity: 0, filter: "blur(5px)" }}
                animate={{
                  height: activeIndex === index ? "auto" : 0,
                  opacity: activeIndex === index ? 1 : 0,
                  filter: activeIndex === index ? "blur(0)" : "blur(5px)",
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  className="faq__answer"
                  initial={{ opacity: 0, translateY: 20 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    translateY: activeIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {faq.answer}
                </motion.p>
              </motion.div>
              <motion.div
                className={`faq__background ${
                  activeIndex === index ? "faq__background--active" : ""
                }`}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
