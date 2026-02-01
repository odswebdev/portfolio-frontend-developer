import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import * as THREE from "three";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const WaterfallShinyDrops = ({ keyTrigger }) => {
  return (
    <div className="relative h-screen overflow-hidden">
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute h-32 bg-gradient-to-b from-transparent to-blue-500 opacity-50"
          style={{
            width: `${Math.random() * 5 + 1}px`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ y: ["0%", "100%"], opacity: [1, 0] }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default WaterfallShinyDrops;
