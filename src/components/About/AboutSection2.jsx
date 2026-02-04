import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
// import ScrollTrigger from "react-scroll-trigger";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHistory,
  faFaceSmile,
  faGift,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AnimatedProgressBar from "./AnimatedProgressBar";
import RadialProgressBar from "./RadialProgressBar";
import BgAboutImg from "./BgAboutImg";
import Education from "./Education";
import Timeline from "./Timeline";
import Cert from "../Cert/Cert";

const techs = [
  { name: "Photoshop", percentage: 85 },
  { name: "Figma", percentage: 75 },
  { name: "Git", percentage: 65 },
  { name: "VSCode", percentage: 70 },
];

library.add(faHistory);
library.add(faFaceSmile);
library.add(faGift);
library.add(faUser);

const featureAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: custom * 0.2 },
  }),
};

const tabAnimation = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: custom * 0.2 },
  }),
};

const AboutSection2 = () => {
  const [counterState, setCounterState] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (inView) => setCounterState(inView),
    threshold: 0.1,
  });

  const technologies = [
    { label: "React", percentage: 80 },
    { label: "JavaScript", percentage: 70 },
    { label: "CSS", percentage: 90 },
    { label: "Node.js", percentage: 60 },
  ];

  const [activeTab, setActiveTab] = useState("tab1");

  const renderContent = () => {
    switch (activeTab) {
      case "tab1":
        return content_tab1();
      case "tab2":
        return (
          <div>
            <div className="skills__progress__container">
              {technologies.map((tech) => (
                <AnimatedProgressBar
                  key={tech.label}
                  label={tech.label}
                  percentage={tech.percentage}
                />
              ))}
            </div>
            <div className="skills__radial__container">
              {techs.map((tech) => (
                <RadialProgressBar
                  key={tech.name}
                  technology={tech.name}
                  percentage={tech.percentage}
                />
              ))}
            </div>
          </div>
        );
      case "tab3":
        return <Timeline />;
      case "tab4":
        return <Education />;
      case "tab5":
        return <Cert />;
      default:
        return null;
    }
  };

  function content_tab1() {
    return (
      <motion.div initial="hidden" whileInView="visible">
        <motion.div
          custom={2}
          variants={tabAnimation}
          className="about__content__subtitle"
        >
          <span className="about__content__subtitle__sel">7 лет опыта</span> во
          Frontend-разработке
        </motion.div>
        <motion.div
          custom={3}
          variants={tabAnimation}
          className="about__content__desc"
        >
          <p>Привет! Я Дмитрий Орлов.</p>
          <br />
          <p>
            Frontend-разработчик, специализируюсь на создании современных,
            красивых и функциональных веб-интерфейсов, веб-сайтов,
            интернет-магазинов и их доработки, а также наполнении сайтов
            контентом.
          </p>
          <br />
          <p>
            Приглашаю вас ознакомиться с моим портфолио и узнать больше о моих
            навыках, проектах и достижениях, которыми я горжусь.
          </p>
          <ul className="about__content__list">
            <li className="about__content__item">Имя: Дмитрий Орлов</li>
            <li className="about__content__item">Дата рождения: 25.11.1990</li>
            <li className="about__content__item">Возраст: 33 года</li>
            <li className="about__content__item">
              Место проживания: Россия, Саратов
            </li>
            <li className="about__content__item">Языки: English</li>
            <li className="about__content__item">Freelance: свободен</li>
          </ul>
        </motion.div>

        <div className="counter__wrapper">
          <div className="counter__wrapper__trigger">
            <div className="achievements" ref={ref}>
              <motion.div
                className="achievements__item"
                custom={1}
                variants={featureAnimation}
              >
                <FontAwesomeIcon icon="history" />
                <h2 className="achievements__item__title">
                  {counterState && (
                    <CountUp start={0} end={800} duration={2.75}></CountUp>
                  )}
                </h2>
                <p className="achievements__item__desc">CТРОЧЕК КОДА</p>
              </motion.div>

              <motion.div
                className="achievements__item"
                custom={2}
                variants={featureAnimation}
              >
                <FontAwesomeIcon icon="gift" />
                <h2 className="achievements__item__title">
                  {counterState && (
                    <CountUp start={0} end={15} duration={2.75}></CountUp>
                  )}
                </h2>
                <p className="achievements__item__desc">ПРОЕКТОВ</p>
              </motion.div>

              <motion.div
                className="achievements__item"
                custom={3}
                variants={featureAnimation}
              >
                <FontAwesomeIcon icon="face-smile" />
                <h2 className="achievements__item__title">
                  {counterState && (
                    <CountUp start={0} end={30} duration={2.75}></CountUp>
                  )}
                </h2>
                <p className="achievements__item__desc">КЛИЕНТОВ</p>
              </motion.div>

              <motion.div
                className="achievements__item"
                custom={4}
                variants={featureAnimation}
              >
                <FontAwesomeIcon icon="user" />
                <h2 className="achievements__item__title">
                  {counterState && (
                    <CountUp start={0} end={10} duration={2.75}></CountUp>
                  )}
                </h2>
                <p className="achievements__item__desc">ЛЕТ ОПЫТА</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const imageAnimation = {
    hidden: { opacity: 0, x: 400 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{
          backgroundImage: `var(--section-bg)`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="about__container !w-[700px]">
          <div>
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="about__content__title"
            >
              Обо мне
            </motion.h2>
          </div>
          <motion.div
            className="about__wrapper"
            initial="hidden"
            whileInView="visible"
          >
            <motion.div
              custom={1}
              variants={imageAnimation}
              className="about__img"
            >
              <div className="bganim__container">
                <div
                  className="bganim__img"
                  custom={2}
                  variants={imageAnimation}
                >
                  <motion.img
                    custom={3}
                    variants={imageAnimation}
                    src="./assets/images/photo-about.png"
                    alt=""
                  />
                </div>
                <BgAboutImg />
              </div>
            </motion.div>
            <div className="about__content">
              <motion.div>
                <ul className="tabs">
                  {[
                    "Опыт",
                    "Мои навыки",
                    "Мой путь",
                    "Образование",
                    "Сертификаты",
                  ].map((tab, index) => (
                    <motion.li
                      key={tab}
                      initial="hidden"
                      whileInView="visible"
                      variants={tabAnimation}
                      custom={index + 1}
                      className={
                        activeTab === `tab${index + 1}` ? "active" : ""
                      }
                      onClick={() => setActiveTab(`tab${index + 1}`)}
                    >
                      <span>{tab}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="tab__content">{renderContent()}</div>
              </motion.div>
              {activeTab === "tab1" && <div></div>}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default AboutSection2;
