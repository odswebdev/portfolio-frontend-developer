import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const FogEffect = () => {
  const fogRefs = useRef([]);

  useEffect(() => {
    fogRefs.current.forEach((fog, index) => {
      gsap.to(fog, {
        x: Math.random() * 300 - 150, // Случайное движение по X
        y: Math.random() * 300 - 150, // Случайное движение по Y
        repeat: -1,
        yoyo: true,
        duration: Math.random() * 5 + 5, // Случайная продолжительность
        opacity: Math.random() * 0.4 + 0.3, // Прозрачность
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 bg-gray-900 overflow-hidden pointer-events-none z-[-1]">
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (fogRefs.current[index] = el)}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 200 + 100}px`, // Случайный размер
            height: `${Math.random() * 200 + 100}px`,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(40px)",
            opacity: 0.3,
            left: `${Math.random() * 100}vw`, // Случайное начальное положение
            top: `${Math.random() * 100}vh`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
};

export default FogEffect;
