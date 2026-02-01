import React, { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    // Прокручиваем страницу в начало
    const bodyElement = document.body || document.documentElement;
    bodyElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScrolling = () => {
      // Проверяем прокрутку для body или html
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > 500) {
        setShowButton(true); // Показываем кнопку
      } else {
        setShowButton(false); // Прячем кнопку
      }
    };

    // Добавляем обработчик события прокрутки
    document.body.addEventListener("scroll", handleScrolling);

    // Убираем обработчик события при размонтировании компонента
    return () => {
      document.body.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  return (
    <div className="xs:pt-[2rem] sm:pt-[2rem] md:pt-[1rem] lg:!pt-0 xl:!pt-0">
      <button
        onClick={scrollToTop}
        className={`fixed xl:right-[2rem] xl:bottom-[1rem] p-2 lg:bottom-20 lg:right-0 md:bottom-4 md:right-0 sm:bottom-[1%] sm:right-0 xs:bottom-0 xs:right-[-2%] rounded-full bg-theme text-white shadow-lg transition-opacity duration-300 ${
          showButton ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-label="Scroll to top"
      >
        <MdKeyboardDoubleArrowUp className="text-3xl hover:text-theme-hover animate-bounce" />
      </button>
    </div>
  );
};

export default GoToTop;
