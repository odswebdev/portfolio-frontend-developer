import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const form = useRef();
  const serviceId = "service_0xubreo";
  const templateId = "template_9d5he0n";
  const publicKey = "WHmOpK9xuyHFI8_Qw";
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [isServerRunning, setIsServerRunning] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  const [formData, setFormData] = useState({
    to_name: "",
    phone_number: "",
    from_email: "",
    from_subject: "",
    message: "",
  });

  const fieldRefs = {
    to_name: useRef(null),
    from_email: useRef(null),
    from_subject: useRef(null),
    phone_number: useRef(null),
  };

  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await axios.get("/api/ping");
        setIsServerRunning(response.status === 200);
      } catch (error) {
        /*    console.warn("Ошибка соединения с сервером:", error); */
        setIsServerRunning(false);
      }
    };
    checkServerConnection();
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const isValidEmail = (from_email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(from_email).toLowerCase());
  };

  const isValidPhoneNumber = (phone_number) => {
    const phoneRegex = /^[0-9+]{10,15}$/; // Валидация для телефонного номера
    return phoneRegex.test(phone_number);
  };

  const isValidName = (to_name) => {
    const NameRegex = /[a-zA-Zа-яА-Я]{3,16}$/;
    return NameRegex.test(to_name);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.to_name) {
      newErrors.to_name = "Введите Ваше имя";
    } else if (!isValidName(formData.to_name)) {
      newErrors.to_name = "В поле нельзя ввести цифры";
    }

    if (formData.to_name.length < 3) {
      newErrors.to_name = "Минимальное количество символов 3";
    }

    if (!formData.phone_number) {
      newErrors.phone_number = "Введите номер телефона";
    } else if (!isValidPhoneNumber(formData.phone_number)) {
      newErrors.phone_number = "Неправильный формат номера телефона";
    }

    if (!formData.from_subject) {
      newErrors.from_subject = "Введите тему сообщения";
    }
    if (!formData.from_email) {
      newErrors.from_email = "Введите Email";
    } else if (!isValidEmail(formData.from_email)) {
      newErrors.from_email = "Неправильный формат email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      const firstErrorField = Object.keys(newErrors)[0];
      fieldRefs[firstErrorField].current.focus();
    } else {
      console.log("Form submitted successfully");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      if (isServerRunning) {
        try {
          const response = await fetch("/api/send2", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            console.log("SUCCESS!");
            setIsFormSubmitted(true);
            e.target.reset();
            setTimeout(() => {
              setIsFormSubmitted(false);
              setFormData({
                to_name: "",
                phone_number: "",
                from_email: "",
                from_subject: "",
                message: "",
              });
            }, 10000); // 10 секунд
          } else {
            console.log("FAILED...", await response.json());
          }
        } catch (error) {
          console.log("Ошибка соединения с сервером:", error);
        }
      } else {
        emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
          () => {
            console.log("SUCCESS!");
            setIsFormSubmitted(true);
            e.target.reset();
            setTimeout(() => {
              setIsFormSubmitted(false);
              setFormData({
                to_name: "",
                phone_number: "",
                from_email: "",
                from_subject: "",
                message: "",
              });
            }, 10000); // 10 секунд
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
      }
    } else {
      console.log("Form Validation Failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleBlur = () => {
    setErrors({});
    setIsFocused(false);
  };

  const formAnimation = {
    hidden: {
      x: -800,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      id="contacts"
      onViewportEnter={() => setIsFormSubmitted(false)}
      className="contacts__section"
      ref={ref}
      style={{
        backgroundImage: `var(--section-bg)`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundAttachment: "fixed",
        padding: "50px 0",
      }}
    >
      <div className="contacts__container">
        <div className="contacts__wrapper">
          <div className="contacts__heading__wrapper">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              id="heading_d1"
              className="contacts__title"
            >
              Контакты
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              id="text_d1"
              className="contacts__subtitle"
            >
              Вы можете связаться со мной или задать интересующие Вас вопросы
              через форму обратной связи
            </motion.p>
          </div>
          <motion.div
            className="contacts__content"
            variants={formAnimation}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {isFormSubmitted ? (
              <motion.div
                className="feed__msg2"
                id="feed__msg2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="my_success2 show__msg2" id="my_success2">
                  Спасибо большое!
                  <br /> Ваша заявка успешно отправлена.
                  <br /> Я свяжусь с Вами в ближайшее время.
                </div>
              </motion.div>
            ) : (
              <motion.form
                variants={formAnimation}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                method="POST"
                ref={form}
                onSubmit={handleSubmit}
                id="contacts__form"
                className="contacts__form"
              >
                <div className="contacts__form__wrapper">
                  <div className="f__errors">
                    <input
                      id="cont_f_i"
                      type="text"
                      placeholder="имя"
                      name="to_name"
                      className="contacts__form__input input-field"
                      value={formData.to_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      ref={fieldRefs.to_name}
                      autoComplete="off"
                      onFocus={handleFocus}
                      style={{
                        borderColor: errors.to_name ? "red" : "",
                        borderWidth: errors.to_name ? "2px" : "",
                      }}
                    />
                    {errors.to_name && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.to_name}
                      </div>
                    )}
                  </div>
                  <div className="f__errors">
                    <input
                      id="cont_f_i"
                      type="text"
                      placeholder="телефон"
                      name="phone_number"
                      className="contacts__form__input input-field"
                      value={formData.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="off"
                      onFocus={handleFocus}
                      ref={fieldRefs.phone_number}
                      style={{
                        borderColor: errors.phone_number ? "red" : "",
                        borderWidth: errors.phone_number ? "2px" : "",
                      }}
                    />
                    {errors.phone_number && (
                      <div className="error" style={{ color: "red" }}>
                        {errors.phone_number}
                      </div>
                    )}
                  </div>
                </div>
                <input
                  id="cont_f_i"
                  type="text"
                  placeholder="email"
                  name="from_email"
                  className="contacts__form__input input-field"
                  value={formData.from_email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  onFocus={handleFocus}
                  ref={fieldRefs.from_email}
                  style={{
                    borderColor: errors.from_email ? "red" : "",
                    borderWidth: errors.from_email ? "2px" : "",
                  }}
                />
                {errors.from_email && (
                  <div className="error">{errors.from_email}</div>
                )}
                <input
                  id="cont_f_i"
                  type="text"
                  placeholder="тема"
                  name="from_subject"
                  className="contacts__form__input input-field"
                  value={formData.from_subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  onFocus={handleFocus}
                  ref={fieldRefs.from_subject}
                  style={{
                    borderColor: errors.from_subject ? "red" : "",
                    borderWidth: errors.from_subject ? "2px" : "",
                  }}
                />
                {errors.from_subject && (
                  <div className="error">{errors.from_subject}</div>
                )}
                <textarea
                  id="cont_f_i"
                  placeholder="сообщение"
                  name="message"
                  className="contacts__form__textarea input-field"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <button className="contacts__btn__send hover:translate-x-2 gap-2">
                  <span className="contacts__btn__send__wrapper">
                    Отправить
                  </span>

                  <span className="contact__arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-25 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
