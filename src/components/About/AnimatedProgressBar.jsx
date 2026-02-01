import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { technologies } from "../constans/data";

const AnimatedProgressBar = ({ percentage, label }) => {
  const progressBarRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const updateTooltipPosition = () => {
      if (progressBarRef.current) {
        const progressBarWidth = progressBarRef.current.offsetWidth;
        const newPosition = progressBarWidth - 25;
        setTooltipPosition(newPosition);
      }
    };

    if (inView) {
      controls
        .start({
          width: `${percentage}%`,
          transition: { duration: 2 },
        })
        .then(() => {
          updateTooltipPosition();
          if (
            progressBarRef.current &&
            progressBarRef.current.offsetWidth > 0
          ) {
            setShowTooltip(true);
          }
        });
    }

    window.addEventListener("resize", updateTooltipPosition);

    return () => {
      window.removeEventListener("resize", updateTooltipPosition);
    };
  }, [inView, controls, percentage]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
      className="progress__bar__container"
      ref={ref}
      whileHover={{ x: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
      initial="hidden"
      whileInView="visible"
    >
      <motion.label
        className="progress__bar__label"
        custom={1}
        variants={variants}
      >
        {label}
      </motion.label>
      <motion.div
        className="progress__bar__item shadow-theme-cs"
        custom={2}
        variants={variants}
      >
        <motion.div
          ref={progressBarRef}
          initial={{ width: 0 }}
          animate={controls}
          className="progress__bar__indicator"
          onAnimationComplete={() => {
            const progressBarWidth = progressBarRef.current.offsetWidth;
            const newPosition = progressBarWidth;
            setTooltipPosition(newPosition);
            if (progressBarWidth > 0) {
              setShowTooltip(true);
            }
          }}
          custom={3}
          variants={variants}
        >
          {showTooltip && (
            <motion.div
              className="tooltip__percentage__container"
              style={{ left: `${tooltipPosition}px` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              variants={variants}
              custom={4}
            >
              <div className="tooltip__percentage__textcont">
                {percentage}%<div className="tooltip__percentage__arrow"></div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedProgressBar;
