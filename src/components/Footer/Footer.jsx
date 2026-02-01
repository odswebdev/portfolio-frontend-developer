import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Подключаем useInView
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import MobilePanel from "../NavBar/MobilePanel";

const Footer = ({ hamburgerRef, onThemeChange }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Анимация срабатывает только один раз
    threshold: 0.2, // Срабатывает, когда 20% футера становится видимым
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer
      ref={ref}
      id="footer"
      style={{
        backgroundImage: `var(--section-bg)`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundAttachment: "fixed",
        padding: "20px 0",
      }}
    >
      <div className="footer__container">
        {/* Логотип и копирайт */}
        <motion.div
          className="footer__col__item__copy"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <a href="\">
            <img src="./src/assets/logo.png" alt="Logo" />
          </a>
          <p className="footer__copy__text">
            Copyright &copy; 2024-2025. Все права защищены
          </p>
        </motion.div>

        {/* Социальные ссылки */}
        <motion.div
          className="footer__col__item__soclinks"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {[
            {
              href: "https://github.com/odswebdev",
              icon: <GitHubIcon style={{ fontSize: 30 }} />,
              label: "GitHub",
            },
            {
              href: "mailto:ods90@mail.ru",
              icon: <EmailIcon style={{ fontSize: 30 }} />,
              label: "Email",
            },
            {
              href: "tel:+79379676127",
              icon: <PhoneIcon style={{ fontSize: 30 }} />,
              label: "Phone",
            },
            {
              href: "tel:+79379676127",
              icon: <WhatsAppIcon style={{ fontSize: 30 }} />,
              label: "WhatsApp",
            },
            {
              href: "https://t.me/dmitryOrlov90",
              icon: <TelegramIcon style={{ fontSize: 30 }} />,
              label: "Telegram",
            },
          ].map((link, index) => (
            <motion.span
              key={link.label}
              custom={index + 1}
              variants={containerVariants}
            >
              <a
                aria-label={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="footer__soc__link hover:scale-110 transition-transform"
              >
                {link.icon}
              </a>
            </motion.span>
          ))}
        </motion.div>

        {/* Мобильная панель */}
        <motion.div
          className="mobile__panel-container"
          variants={containerVariants}
          custom={6}
        >
          <MobilePanel
            onThemeChange={onThemeChange}
            hamburgerRef={hamburgerRef}
          />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
