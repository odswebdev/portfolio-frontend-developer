import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const Loader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [rocketColor, setRocketColor] = useState("#FFFFFF");

  const colors = [
    "#FF6F61",
    "#6B5B95",
    "#88B04B",
    "#F7CAC9",
    "#92A8D1",
    "#955251",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 10) {
          clearInterval(interval);
          gsap.to(".rocket__container", {
            x: window.innerWidth * 0.4,
            y: -window.innerHeight * 0.4,
            scale: 0.5,
            duration: 0.2,
            ease: "power3.inOut",
            opacity: 0,
            onComplete: onLoadComplete,
          });
          return 10;
        }

        const colorIndex = Math.floor((oldProgress / 100) * colors.length);
        setRocketColor(colors[colorIndex]);

        return oldProgress + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  const totalLength = 500;
  const offset = totalLength - (totalLength * progress) / 100;

  return (
    <div className="overlay__body">
      <div className="loader__container">
        <div className="rocket__container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 480.61 480.61"
            width={100}
            height={100}
            fill="none"
          >
            <defs>
              <linearGradient
                id="fuelGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#ff6f61", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#ffe4c4", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>

            <path
              d="M469.012,20.343l-2.395-6.339l-6.339-2.394C439.878,3.906,418.436,0,396.547,0c-48.104,0-93.33,18.733-127.346,52.749 l-48.227,48.227l-107.787,5.228l-90.214,90.213l77.783,24.777l-28.763,28.762l16.802,16.802l-37.224,57.056l105.235,105.237 l57.057-37.224l16.802,16.802l28.763-28.763l24.775,77.783l90.216-90.214l5.227-107.786l48.227-48.227 C477.832,161.462,493.98,86.459,469.012,20.343z"
              fill={rocketColor}
              stroke="#FFFFFF"
              strokeWidth="2"
            />

            <motion.path
              d="M469.012,20.343l-2.395-6.339l-6.339-2.394C439.878,3.906,418.436,0,396.547,0c-48.104,0-93.33,18.733-127.346,52.749 l-48.227,48.227l-107.787,5.228l-90.214,90.213l77.783,24.777l-28.763,28.762l16.802,16.802l-37.224,57.056l105.235,105.237 l57.057-37.224l16.802,16.802l28.763-28.763l24.775,77.783l90.216-90.214l5.227-107.786l48.227-48.227 C477.832,161.462,493.98,86.459,469.012,20.343z"
              fill="url(#fuelGradient)"
              stroke="none"
              style={{
                strokeDasharray: totalLength,
                strokeDashoffset: offset,
                transition: "stroke-dashoffset 0.2s ease",
              }}
            />

            <text
              x="250"
              y="200"
              textAnchor="middle"
              fontSize="44"
              fill="#fff"
              fontWeight="bold"
            ></text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
