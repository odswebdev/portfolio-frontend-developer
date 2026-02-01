import React, { useEffect, useState, useRef } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);
  const elementsRef = useRef(Array(5).fill({ x: 0, y: 0 }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateElementsPosition = () => {
      elementsRef.current = elementsRef.current.map((el, index) => {
        const dx = position.x - el.x;
        const dy = position.y - el.y;
        const speed = 0.1 + index * 0.02;

        return {
          x: el.x + dx * speed,
          y: el.y + dy * speed,
        };
      });

      requestAnimationFrame(updateElementsPosition);
    };

    requestAnimationFrame(updateElementsPosition);
  }, [position]);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor__container"
        style={{
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
          animation: "pulse 1.5s infinite",
        }}
      />

      {elementsRef.current.map((el, index) => (
        <div
          key={index}
          className="cursor__item"
          style={{
            width: `${3 + index * 0.3}px`,
            height: `${3 + index * 0.3}px`,
            left: `${el.x}px`,
            top: `${el.y}px`,
            transform: `translate(-50%, -50%) scale(${1 - index * 0.02})`,
            backgroundColor: `hsl(${index * 10}, 100%, 70%)`,
            borderRadius: "50%",
            boxShadow: `0 0 10px 2px hsl(${index * 10}, 100%, 70%)`,
            opacity: 1 - index * 0.02,
            transition:
              "transform 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out",
            animation: `particlePulse ${1 + index * 0.05}s infinite`,
          }}
        />
      ))}
    </>
  );
};

export default Cursor;
