import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React, { useRef, useState } from "react";
import "/src/input.css";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { reviews } from "../constans/data";

export default function Testimonials() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const swiperRef = useRef(null);

  const handleSlideChange = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    }
  };

  // Анимации для слайда
  const slideVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="testimonials"
      style={{
        backgroundImage: `var(--section-bg)`,
        backgroundSize: "cover",
        /*   backgroundPosition: "100% 100%", */
        backgroundAttachment: "fixed",
        padding: "50px 0",
      }}
    >
      <div className="testimonials__container">
        <div className="testimonials__wrapper">
          <motion.div
            className="testimonials__content-container"
            initial="hidden"
            whileInView="visible"
            variants={slideVariant}
          >
            <motion.h2
              className="testimonials__content-title"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Отзывы
            </motion.h2>
            <motion.p
              className="testimonials__content-subtitle"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Отзывы других людей о моей работе
            </motion.p>
            <Swiper
              ref={swiperRef}
              loop={false}
              modules={[Navigation]}
              navigation={{ prevEl: "#prev-btn", nextEl: "#next-btn" }}
              slidesPerView={1.3}
              spaceBetween={10}
              centeredSlides={true}
              autoHeight={true}
              onSlideChange={handleSlideChange}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                  centeredSlides: true,
                  autoplay: true,
                  allowTouchMove: true,
                },
                767: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  centeredSlides: true,
                  autoplay: true,
                  allowTouchMove: true,
                },
                768: {
                  slidesPerView: 2,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  centeredSlides: false,
                },
                1025: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                  centeredSlides: false,
                },
              }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="testimonials__ss__container-img"
                    variants={slideVariant}
                    initial="hidden"
                    whileInView="visible"
                  >
                    <motion.img
                      className="testimonials__ss-img"
                      alt="icon"
                      width={150}
                      height={150}
                      src={review.image}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    <motion.h2
                      className="testimonials__ss-name"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {review.name}
                    </motion.h2>
                    <motion.p
                      className="testimonials__ss-position"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      {review.position}
                    </motion.p>
                    <motion.p
                      className="testimonials__ss-project"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      {review.project}
                    </motion.p>
                    <motion.p
                      className="testimonials__ss-dates"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      Даты: {review.dates}
                    </motion.p>
                    <motion.div
                      className="testimonials__ss-ratings"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="testimonials__ss-ratings-svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21 16.54 14.55 22 9.24 15.81 8.63 12 2 8.19 8.63 2 9.24 7.46 14.55 5.82 21 12 17.27z" />
                        </svg>
                      ))}
                    </motion.div>
                    <motion.p
                      className="testimonials__ss-review"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {review.review}
                    </motion.p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="testimonials__swiper__wrapper-btns">
              <motion.div
                id="prev-btn"
                className={`testimonials__swiper-prev-btn ${
                  isBeginning ? "opacity-50" : "opacity-100 pointer-events-auto"
                }`}
                initial={{ opacity: 1 }}
                animate={{ opacity: isBeginning ? 0.5 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  className="testimonials__swiper-prev-btn-img"
                  src="../.../src/assets/icons/angle-double-left.svg"
                  alt="Previous"
                />
              </motion.div>
              <motion.div
                id="next-btn"
                className={`testimonials__swiper-next-btn ${
                  isEnd ? "opacity-50" : "opacity-100 pointer-events-auto"
                }`}
                initial={{ opacity: 1 }}
                animate={{ opacity: isEnd ? 0.5 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  className="testimonials__swiper-next-btn-img"
                  src="../.../src/assets/icons/angle-double-right.svg"
                  alt="Next"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
