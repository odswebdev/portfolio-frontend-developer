import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProjectSlider({ images }) {
  return (
    <Swiper spaceBetween={10} slidesPerView={1}>
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <img
            src={img}
            alt={`slide-${i}`}
            className="w-full h-80 object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
