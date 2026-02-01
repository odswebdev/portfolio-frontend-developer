import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import * as THREE from "three";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const MouseColorBackground = () => {
  const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 1)");

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const red = Math.floor((clientX / window.innerWidth) * 255);
    const green = Math.floor((clientY / window.innerHeight) * 255);
    setBgColor(`rgba(${red}, ${green}, 150, 0.5)`);
  };

  return (
    <div
      className="absolute inset-0 transition-colors duration-500"
      style={{ backgroundColor: bgColor }}
      onMouseMove={handleMouseMove}
    />
  );
};

const PulsingCircles = () => {
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    const circles = document.querySelectorAll(".circle");

    circles.forEach((circle, index) => {
      tl.to(
        circle,
        {
          scale: 1.5,
          duration: 0.6,
          ease: "power1.inOut",
        },
        index * 0.2
      );
    });
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="circle w-40 h-40 rounded-full bg-blue-300 absolute"></div>
      <div className="circle w-60 h-60 rounded-full bg-green-300 absolute"></div>
      <div className="circle w-80 h-80 rounded-full bg-red-300 absolute"></div>
    </div>
  );
};

const FlowingGradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-400 to-blue-600 h-full w-full animate-gradient"></div>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 15s ease infinite;
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
};

const FogEffect = () => {
  const fogRefs = useRef([]);

  useEffect(() => {
    fogRefs.current.forEach((fog, index) => {
      gsap.to(fog, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        repeat: -1,
        duration: 5,
        opacity: Math.random() * 0.5 + 0.3,
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 bg-gray-900 overflow-hidden">
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (fogRefs.current[index] = el)}
          className="absolute rounded-full bg-gray-600"
          style={{
            width: "200px",
            height: "200px",
            opacity: 0.3,
            filter: "blur(30px)",
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
          }}
        />
      ))}
    </div>
  );
};

const NorthernLights = () => {
  return (
    <div className="relative h-screen bg-black">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-transparent opacity-50 blur-lg"
        animate={{ x: [0, -100, 100], y: [-20, 20, -20], rotate: [0, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

const WaterfallShinyDrops = () => {
  return (
    <div className="relative h-screen bg-black">
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

const LightRingsSchock = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1/4 h-1/4 rounded-full border-2 border-blue-500 opacity-30"
          animate={{ scale: [1, 3], opacity: [0.3, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

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

const GlowAuroraBorealis = () => {
  return (
    <div className="relative h-screen bg-gradient-to-b from-blue-900 to-purple-800 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-20 blur-2xl"
        animate={{
          y: ["-10%", "10%", "-10%"],
          x: ["-10%", "10%", "-10%"],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const LiquidFireSmoke = () => {
  return (
    <div className="relative h-screen bg-black">
      {Array.from({ length: 10 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-red-500 blur-lg opacity-60"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0%", "-10%", "0%"],
            opacity: [0.7, 0.4, 0.7],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const SpaceTravel = () => {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      {Array.from({ length: 100 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: `${Math.random() * 5 + 1}px`,
            height: `${Math.random() * 5 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.1, 1],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const WhirlpoolsWaterfalls = () => {
  return (
    <div className="relative h-screen bg-blue-600 overflow-hidden">
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            width: `${Math.random() * 20 + 5}px`,
            height: `${Math.random() * 20 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["-100%", "100%"],
            opacity: [1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)",
        }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
};

const DancingGeometricShapes = () => {
  <div className="relative h-screen bg-gray-900 overflow-hidden">
    {Array.from({ length: 30 }).map((_, index) => (
      <motion.div
        key={index}
        className={`absolute bg-${
          ["red", "green", "blue", "yellow"][Math.floor(Math.random() * 4)]
        }-500`}
        style={{
          width: `${Math.random() * 50 + 20}px`,
          height: `${Math.random() * 50 + 20}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: Math.random() * 2 + 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>;
};

const ShootingStars = () => {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {Array.from({ length: 100 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [1, 0],
          }}
          transition={{
            duration: Math.random() * 1 + 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-yellow-500 rounded-full"
          style={{
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["-100%", "100%"],
            opacity: [1, 0],
          }}
          transition={{
            duration: Math.random() * 1 + 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const InfinityFireAndSmoke = () => {
  const fireRef = useRef(null);
  const smokeRef = useRef(null);

  useEffect(() => {
    // Анимация огня по траектории бесконечности
    gsap.to(fireRef.current, {
      motionPath: {
        path: [
          { x: -50, y: -30 },
          { x: 0, y: 50 },
          { x: 50, y: -30 },
          { x: 0, y: 30 },
          { x: -50, y: -30 },
        ],
        curviness: 1.5,
        autoRotate: true,
      },
      duration: 4,
      repeat: -1,
      ease: "power1.inOut",
    });

    // Анимация дыма по той же траектории, но с задержкой и большей плавностью
    gsap.to(smokeRef.current, {
      motionPath: {
        path: [
          { x: 50, y: 30 },
          { x: 0, y: -50 },
          { x: -50, y: 30 },
          { x: 0, y: -30 },
          { x: 50, y: 30 },
        ],
        curviness: 1.5,
        autoRotate: true,
      },
      duration: 6,
      repeat: -1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Пламя */}
      <div
        ref={fireRef}
        className="w-16 h-16 bg-gradient-to-t from-yellow-500 to-red-500 rounded-full opacity-80 blur-sm"
      ></div>

      {/* Дым */}
      <div
        ref={smokeRef}
        className="absolute w-20 h-20 bg-gradient-to-t from-gray-500 via-gray-300 to-transparent rounded-full opacity-50 blur-lg"
      ></div>
    </div>
  );
};

/* 3D */

const FlyingObjects = () => {
  const ref = useRef();
  const time = useRef(0);

  useFrame(() => {
    time.current += 0.01;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
    ref.current.position.z = Math.sin(time.current) * 5;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color={`hsl(${Math.random() * 360}, 100%, 50%)`} />
    </mesh>
  );
};

const WavingGrid = () => {
  const ref = useRef();
  const time = useRef(0);

  useFrame(() => {
    time.current += 0.05;
    const positions = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] = Math.sin(positions[i] + time.current) * 0.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[5, 5, 32, 32]} />
      <meshStandardMaterial color="lightcoral" />
    </mesh>
  );
};

const PrismEffect = () => {
  const ref = useRef();
  const time = useRef(0);

  useFrame(() => {
    time.current += 0.02;
    ref.current.rotation.y += 0.01;
    ref.current.material.color.setHSL(
      (time.current % (2 * Math.PI)) / (2 * Math.PI),
      1,
      0.5
    );
  });

  return (
    <mesh ref={ref}>
      <tetrahedronGeometry args={[0.5]} />
      <meshStandardMaterial transparent opacity={0.7} />
    </mesh>
  );
};

const WaterfallEffect = () => {
  const dropRefs = useRef([...Array(50).keys()].map(() => React.createRef()));

  useFrame(() => {
    dropRefs.current.forEach((ref, index) => {
      ref.current.position.y -= 0.1; // Движение вниз
      if (ref.current.position.y < -5) {
        ref.current.position.y = 5; // Сброс положения
      }
    });
  });

  return (
    <>
      {dropRefs.current.map((ref, index) => (
        <mesh
          ref={ref}
          key={index}
          position={[Math.random() * 10 - 5, Math.random() * 5 + 5, -5]}
        >
          <cylinderGeometry args={[0.01, 0.01, 1, 16]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      ))}
    </>
  );
};

const ColorExplosions = () => {
  const explosionRefs = useRef(
    [...Array(10).keys()].map(() => React.createRef())
  );

  useFrame(() => {
    explosionRefs.current.forEach((ref, index) => {
      const scale = Math.abs(Math.sin(performance.now() / 1000 + index)) * 0.5;
      ref.current.scale.set(scale, scale, scale);
      ref.current.material.color.setHSL(
        (performance.now() / 1000 + index * 36) % 360,
        1,
        0.5
      );
    });
  });

  return (
    <>
      {explosionRefs.current.map((ref, index) => (
        <mesh
          ref={ref}
          key={index}
          position={[Math.random() * 10 - 5, Math.random() * 5, -5]}
        >
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial transparent opacity={0.8} />
        </mesh>
      ))}
    </>
  );
};

const MovingMaze = () => {
  const wallRefs = useRef([...Array(10).keys()].map(() => React.createRef()));

  useFrame(() => {
    wallRefs.current.forEach((ref, index) => {
      ref.current.position.y = Math.sin(performance.now() / 1000 + index) * 2;
      ref.current.material.color.setHSL(
        (performance.now() / 1000 + index * 36) % 360,
        1,
        0.5
      );
    });
  });

  return (
    <>
      {wallRefs.current.map((ref, index) => (
        <mesh ref={ref} key={index} position={[index - 5, 0, -5]}>
          <boxGeometry args={[0.2, 3, 0.2]} />
          <meshStandardMaterial />
        </mesh>
      ))}
    </>
  );
};

const DancingFlame = () => {
  const flameRef = useRef();
  const time = useRef(0);

  useFrame(() => {
    time.current += 0.1;
    flameRef.current.scale.set(1, Math.abs(Math.sin(time.current)) * 3, 1);
    flameRef.current.material.color.setHSL(
      (time.current % (2 * Math.PI)) / (2 * Math.PI),
      1,
      0.5
    );
  });

  return (
    <mesh ref={flameRef} position={[0, 0, -5]}>
      <coneGeometry args={[0.5, 2, 32]} />
      <meshStandardMaterial emissive="orange" transparent opacity={0.8} />
    </mesh>
  );
};

const FireLines = () => {
  const lineRefs = useRef([...Array(5).keys()].map(() => React.createRef()));

  useFrame(() => {
    lineRefs.current.forEach((ref, index) => {
      ref.current.rotation.z += 0.02 + index * 0.01;
      ref.current.material.color.setHSL(
        (performance.now() / 1000 + index * 36) % 360,
        1,
        0.5
      );
    });
  });

  return (
    <>
      {lineRefs.current.map((ref, index) => (
        <mesh ref={ref} key={index} position={[0, index - 2, -5]}>
          <cylinderGeometry args={[0.05, 0.05, 5, 16]} />
          <meshStandardMaterial emissive="orange" transparent opacity={0.7} />
        </mesh>
      ))}
    </>
  );
};

const BurningBranches = () => {
  const branchRefs = useRef([...Array(5).keys()].map(() => React.createRef()));

  useFrame(() => {
    branchRefs.current.forEach((ref, index) => {
      ref.current.rotation.y += 0.02;
      ref.current.position.y = Math.sin(performance.now() / 1000 + index) * 0.5;
      ref.current.material.color.setHSL(
        (performance.now() / 1000 + index * 36) % 360,
        1,
        0.5
      );
    });
  });

  return (
    <>
      {branchRefs.current.map((ref, index) => (
        <mesh ref={ref} key={index} position={[index - 2, 0, -5]}>
          <cylinderGeometry args={[0.1, 0.1, 3, 16]} />
          <meshStandardMaterial emissive="orange" transparent opacity={0.7} />
        </mesh>
      ))}
    </>
  );
};

const MolecularStructures = () => {
  const moleculeRefs = useRef(
    [...Array(5).keys()].map(() => React.createRef())
  );

  useFrame(() => {
    moleculeRefs.current.forEach((ref) => {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    });
  });

  return (
    <>
      {moleculeRefs.current.map((ref, index) => (
        <mesh
          ref={ref}
          key={index}
          position={[Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, -5]}
        >
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="purple" />
        </mesh>
      ))}
    </>
  );
};

const BgGradientAnime = () => {
  return (
    <Canvas
      className="absolute inset-0 w-full h-[100vh]"
      camera={{ position: [0, 0, 10] }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
    </Canvas>
  );
};

export default BgGradientAnime;
