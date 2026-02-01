import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const RadialProgressBar = ({ percentage, technology }) => {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const normalizedPercentage = Math.min(percentage, 100);

  const [isHovered, setIsHovered] = useState(false);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (isHovered) {
      const duration = 1;
      const startTime = Date.now();

      const updatePercentage = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        setDisplayedPercentage(Math.floor(progress * normalizedPercentage));
        if (progress < 1) {
          requestAnimationFrame(updatePercentage);
        }
      };

      updatePercentage();
    } else {
      setDisplayedPercentage(normalizedPercentage);
    }
  }, [isHovered, normalizedPercentage]);

  const strokeDashoffset =
    circumference - (displayedPercentage / 100) * circumference;

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <motion.div
      className="radial-progress-bar"
      ref={ref}
      initial="hidden"
      whileInView="visible"
    >
      <motion.svg
        height={radius * 2}
        width={radius * 2}
        className="radial-progress-bar__circle"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        custom={1}
        variants={variants}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#0bef", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#0fc", stopOpacity: 1 }} />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r="60"
          cx={radius}
          cy={radius}
          custom={2}
          variants={variants}
        />
        <motion.circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          r="60"
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1 }}
          style={{ filter: "url(#glow)" }}
          custom={3}
          variants={variants}
        />
      </motion.svg>
      <motion.div
        className="radial-progress-bar__percentage-wrapper"
        variants={variants}
        custom={4}
      >
        <motion.span
          className="radial-progress-bar__percentage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          custom={5}
          variants={variants}
        >
          {displayedPercentage}%
        </motion.span>
      </motion.div>
      <motion.span
        className="radial-progress-bar__technology"
        custom={6}
        variants={variants}
      >
        {technology}
      </motion.span>
    </motion.div>
  );
};

export default RadialProgressBar;
