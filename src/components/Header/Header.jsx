import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import GoToBottom from "../GoToBottom/GoToBottom";
import NavBar from "../../components/NavBar/NavBar";

const Header = ({ hamburgerRef, onThemeChange, onLayoutChange }) => {
  const [nav, setNav] = useState(false);

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

  const imageAnimation = {
    hidden: { opacity: 0, x: 400 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      className="header"
      variants={headerVariants}
      style={{
        backgroundImage: "var(--header-hero-bg)", // Добавляем изображение для header
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // Чтобы header был достаточной высоты
      }}
    >
      <motion.div variants={itemVariants}>
        <NavBar
          hamburgerRef={hamburgerRef}
          onThemeChange={onThemeChange}
          onLayoutChange={onLayoutChange}
        />
      </motion.div>
      <motion.section
        id="hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="hero__section"
      >
        <div className="hero__container">
          <div className="hero__container__flex">
            <motion.div className="hero__content">
              <motion.h1 className="hero__content__title">
                <TypeAnimation
                  custom={1}
                  initial="hidden"
                  whileInView="visible"
                  variants={textAnimation}
                  sequence={[
                    "Привет 👋!",
                    1000,
                    "Я Дмитрий Орлов",
                    1000,
                    "Frontend developer",
                    1000,
                    "Web разработчик",
                    1000,
                    "Верстальщик",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.h1>
              <motion.p
                initial="hidden"
                whileInView="visible"
                custom={2}
                variants={textAnimation}
                className="hero__content__desc"
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                Ниже Вы сможете ознакомиться с моим резюме, ссылками на проекты
                и социальные сети.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                whileInView="visible"
                variants={textAnimation}
                className="download__cv__cont"
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <a
                  className="download__cv__btn"
                  href="../src/assets/docs/resume.pdf"
                  download="resume"
                >
                  <span>Скачать CV</span>
                  <img src="../src/assets/icons/download.svg" alt="" />
                </a>
                <a className="download__cv__btn" href="#projects">
                  <span>Посмотреть все</span>
                  <img src="../src/assets/icons/arrow_r2.svg" alt="" />
                </a>
              </motion.div>

              <motion.div
                className="hero__content__soclinks"
                initial="hidden"
                whileInView="visible"
              >
                <motion.span custom={4} variants={textAnimation}>
                  <a
                    href="https://github.com/odswebdev"
                    aria-label="github"
                    target="_blank"
                    rel="noreferrer"
                    className="hero__soc__link"
                  >
                    <GitHubIcon
                      className="hover:drop-shadow-[0px_0px_25px_#0fc]"
                      style={{ fontSize: 36 }}
                    />
                  </a>
                </motion.span>
                <motion.span custom={5} variants={textAnimation}>
                  <a
                    href="mailto:ods90@mail.ru"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="mail"
                    className="hero__soc__link"
                  >
                    <EmailIcon
                      className="hover:drop-shadow-[0px_0px_25px_#0fc]"
                      style={{ fontSize: 36 }}
                    />
                  </a>
                </motion.span>
                <motion.span custom={6} variants={textAnimation}>
                  <a
                    href="tel:+79379676127"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="phone"
                    className="hero__soc__link"
                  >
                    <PhoneIcon
                      className="hover:drop-shadow-[0px_0px_25px_#0fc]"
                      style={{ fontSize: 36 }}
                    />
                  </a>
                </motion.span>
                <motion.span custom={7} variants={textAnimation}>
                  <a
                    href="tel:+79379676127"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="phone"
                    className="hero__soc__link"
                  >
                    <WhatsAppIcon
                      className="hover:drop-shadow-[0px_0px_25px_#0fc]"
                      style={{
                        fontSize: 36,
                      }}
                    />
                  </a>
                </motion.span>
                <motion.span custom={8} variants={textAnimation}>
                  <a
                    href="https://t.me/dmitry_251190"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="phone"
                    className="hero__soc__link"
                  >
                    <TelegramIcon
                      className="hover:drop-shadow-[0px_0px_25px_#0fc]"
                      style={{ fontSize: 36 }}
                    />
                  </a>
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero__wrapper__img"
              initial="hidden"
              whileInView="visible"
            >
              <motion.div
                custom={9}
                variants={imageAnimation}
                className="hero__cont__img"
              >
                <motion.img
                  className="hero__img"
                  variants={imageAnimation}
                  src=".../src/assets/hero-img.png"
                  alt=""
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <GoToBottom />
      </motion.section>
    </motion.header>
  );
};

export default Header;
