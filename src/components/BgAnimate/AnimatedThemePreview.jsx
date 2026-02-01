import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import * as THREE from "three";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import MouseColorBackground from "../BgAnimate/MouseColorBackground";

const AnimatedThemePreview = () => {
  return (
    <div className="relative w-32 h-32">
      <motion.div
        className="w-full h-full bg-cover bg-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
        }}
      />
    </div>
  );
};

export default AnimatedThemePreview;
