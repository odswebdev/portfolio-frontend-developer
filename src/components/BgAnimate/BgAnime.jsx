import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Line, OrbitControls } from "@react-three/drei";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useSpring, animated } from "react-spring";
import * as THREE from "three";
import { gsap } from "gsap";

const BgAnime = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { offsetWidth, offsetHeight } = containerRef.current;

      // Рассчитываем позицию курсора по отношению к контейнеру
      const x = (clientX / offsetWidth) * 100;
      const y = (clientY / offsetHeight) * 100;

      // Обновляем CSS-переменные для управления градиентом
      containerRef.current.style.setProperty("--mouse-x", `${x}%`);
      containerRef.current.style.setProperty("--mouse-y", `${y}%`);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <div className="liquid-metal" ref={containerRef}></div>;
};

export default BgAnime;
