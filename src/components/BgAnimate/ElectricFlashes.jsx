import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import * as THREE from "three";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const ElectricFlashes = () => {
  return (
    <div className="relative h-screen bg-black">
      <div className="absolute inset-0 grid grid-cols-10 gap-1 opacity-30">
        {Array.from({ length: 100 }).map((_, index) => (
          <motion.div
            key={index}
            className="w-full h-0.5 bg-blue-500"
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ElectricFlashes;
