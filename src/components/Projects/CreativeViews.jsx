import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHeart, FiStar, FiExternalLink, FiGithub, 
  FiChevronLeft, FiChevronRight, FiX, FiInfo,
  FiMaximize, FiMinimize, FiGrid, FiLayout,
  FiBox, FiActivity, FiPackage, FiLayers,
  FiGlobe, FiCpu, FiSliders
} from 'react-icons/fi';

// 1. 3D Карусель с эффектом глубины
export const Carousel3D = ({ projects, currentIndex, onSelect, onLike, onFavorite }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoRotate(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation(prev => prev + delta * 0.01);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getCardStyle = (index) => {
    const total = projects.length;
    const angle = (360 / total) * index + rotation;
    const radius = 300;
    
    return {
      transform: `
        rotateY(${angle}deg)
        translateZ(${radius}px)
        scale(${index === currentIndex ? 1.2 : 0.8})
      `,
      opacity: index === currentIndex ? 1 : 0.6,
      zIndex: index === currentIndex ? 100 : Math.abs(index - currentIndex),
    };
  };

  return (
    <div 
      className="relative h-[600px] perspective-1000"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-4 py-2 rounded-lg ${autoRotate ? 'bg-cyan-600' : 'bg-gray-700'}`}
        >
          {autoRotate ? '⏸️ Пауза' : '▶️ Автоповорот'}
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            style={getCardStyle(index)}
            className="absolute w-64 h-80 bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
            onClick={() => onSelect(project)}
          >
            <div 
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-cyan-800/80 text-cyan-300 rounded-full text-xs">
                  {project.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-bold text-lg mb-2 truncate">{project.title}</h4>
              <p className="text-gray-300 text-sm line-clamp-2">{project.shortDescription}</p>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFavorite(project.id);
                    }}
                    className={`p-1 ${project.isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
                  >
                    <FiStar />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(project.id);
                    }}
                    className={`p-1 ${project.isLiked ? 'text-red-400' : 'text-gray-400'}`}
                  >
                    <FiHeart />
                  </button>
                </div>
                <button className="text-sm text-cyan-400">Подробнее →</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-sm">Перетаскивайте для вращения • Кликните на проект для деталей</p>
      </div>
    </div>
  );
};

// 2. Гексагональная сетка (Hex Grid)
export const HexGrid = ({ projects, onSelect, onLike, onFavorite }) => {
  const [hoveredHex, setHoveredHex] = useState(null);

  const hexSize = 120;
  const hexWidth = Math.sqrt(3) * hexSize;
  const hexHeight = 2 * hexSize;

  const getHexPosition = (index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const offset = row % 2 === 0 ? 0 : hexWidth / 2;
    
    return {
      x: col * hexWidth + offset,
      y: row * hexHeight * 0.75
    };
  };

  return (
    <div className="relative h-[800px] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="100%" height="100%" className="absolute">
          <defs>
            <pattern 
              id="hexPattern" 
              width={hexWidth} 
              height={hexHeight * 0.75}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M${hexWidth/2},0 L${hexWidth},${hexSize/2} L${hexWidth},${hexSize*1.5} L${hexWidth/2},${hexHeight} L0,${hexSize*1.5} L0,${hexSize/2} Z`}
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>

        {projects.slice(0, 12).map((project, index) => {
          const position = getHexPosition(index);
          const isHovered = hoveredHex === index;
          
          return (
            <motion.div
              key={project.id}
              className="absolute cursor-pointer"
              style={{
                left: `calc(50% + ${position.x - hexWidth * 1.5}px)`,
                top: `calc(50% + ${position.y - hexHeight * 1.5}px)`,
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? [0, 5, -5, 0] : 0,
              }}
              transition={{ 
                scale: { type: "spring", stiffness: 300 },
                rotate: { duration: 0.3 }
              }}
              onMouseEnter={() => setHoveredHex(index)}
              onMouseLeave={() => setHoveredHex(null)}
              onClick={() => onSelect(project)}
            >
              <div className="relative">
                <svg width={hexWidth} height={hexHeight}>
                  <path
                    d={`M${hexWidth/2},0 L${hexWidth},${hexSize/2} L${hexWidth},${hexSize*1.5} L${hexWidth/2},${hexHeight} L0,${hexSize*1.5} L0,${hexSize/2} Z`}
                    fill={isHovered ? "url(#hexGradient)" : "rgba(30, 41, 59, 0.8)"}
                    stroke={isHovered ? "#06b6d4" : "rgba(255,255,255,0.2)"}
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="text-center">
                    <h4 className="font-bold text-sm mb-1 text-white">{project.title}</h4>
                    <div className="flex justify-center gap-1 mb-2">
                      {project.technologies.slice(0, 2).map(tech => (
                        <span key={tech} className="text-xs px-1 py-0.5 bg-cyan-900/50 rounded">
                          {tech.substring(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-sm opacity-70">Гексагональная сетка проектов • Наведите для увеличения</p>
      </div>
    </div>
  );
};

// 3. Timeline View (Временная шкала)
export const TimelineView = ({ projects, onSelect, onLike, onFavorite }) => {
  const [activeYear, setActiveYear] = useState(null);

  const projectsByYear = projects.reduce((acc, project) => {
    const year = new Date(project.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {});

  const years = Object.keys(projectsByYear).sort((a, b) => b - a);

  return (
    <div className="relative py-8">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />
      
      {years.map((year, yearIndex) => (
        <div key={year} className="relative mb-16">
          <div 
            className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 text-center ${
              yearIndex % 2 === 0 ? '-ml-40' : '-mr-40'
            }`}
          >
            <button
              onClick={() => setActiveYear(activeYear === year ? null : year)}
              className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
                activeYear === year 
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 scale-110' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {year}
            </button>
          </div>
          
          <div className={`mt-16 ${yearIndex % 2 === 0 ? 'pr-1/2 pl-8' : 'pl-1/2 pr-8'}`}>
            <AnimatePresence>
              {activeYear === year && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {projectsByYear[year].map(project => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-cyan-500 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold">{project.title}</h4>
                        <button
                          onClick={() => onFavorite(project.id)}
                          className={`p-1 ${project.isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
                        >
                          <FiStar />
                        </button>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{project.shortDescription}</p>
                      <button
                        onClick={() => onSelect(project)}
                        className="w-full py-2 bg-cyan-900/30 text-cyan-400 rounded-lg hover:bg-cyan-800/50 transition"
                      >
                        Подробнее
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
};

// 4. Particle Cloud (Облако технологий)
export const ParticleCloud = ({ projects, onSelect }) => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);

  const allTechnologies = Array.from(
    new Set(projects.flatMap(p => p.technologies))
  );

  const getProjectsByTech = (tech) => {
    return projects.filter(p => p.technologies.includes(tech));
  };

  const getPosition = (index, total) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 200;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      scale: selectedTech ? 0.5 : 1
    };
  };

  return (
    <div className="relative h-[700px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {allTechnologies.map((tech, index) => {
          const position = getPosition(index, allTechnologies.length);
          const isHovered = hoveredTech === tech;
          const isSelected = selectedTech === tech;
          const projectsCount = getProjectsByTech(tech).length;
          
          return (
            <motion.div
              key={tech}
              className="absolute cursor-pointer"
              style={{
                x: position.x,
                y: position.y,
                scale: isSelected ? 2 : position.scale
              }}
              animate={{
                x: selectedTech && !isSelected ? position.x * 0.5 : position.x,
                y: selectedTech && !isSelected ? position.y * 0.5 : position.y,
              }}
              onMouseEnter={() => !selectedTech && setHoveredTech(tech)}
              onMouseLeave={() => !selectedTech && setHoveredTech(null)}
              onClick={() => {
                if (selectedTech === tech) {
                  setSelectedTech(null);
                } else if (selectedTech) {
                  setSelectedTech(tech);
                } else {
                  setSelectedTech(tech);
                }
              }}
            >
              <div className={`px-4 py-2 rounded-full transition-all ${
                isSelected 
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 shadow-lg shadow-cyan-500/30' 
                  : isHovered
                  ? 'bg-cyan-900/70 border border-cyan-500'
                  : 'bg-gray-800/50 border border-gray-700'
              }`}>
                <span className="font-medium">{tech}</span>
                <span className="ml-2 text-xs opacity-70">({projectsCount})</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                Проекты с технологией: <span className="text-cyan-400">{selectedTech}</span>
              </h3>
              <button
                onClick={() => setSelectedTech(null)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <FiX />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getProjectsByTech(selectedTech).map(project => (
                <div
                  key={project.id}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-cyan-500 transition-colors cursor-pointer"
                  onClick={() => onSelect(project)}
                >
                  <h4 className="font-bold mb-2">{project.title}</h4>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.shortDescription}</p>
                  <button className="text-cyan-400 text-sm hover:text-cyan-300">
                    Подробнее →
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-sm opacity-70">
          {selectedTech 
            ? `Проекты с технологией: ${selectedTech} • Кликните для закрытия`
            : 'Облако технологий • Кликните на технологию для фильтрации проектов'}
        </p>
      </div>
    </div>
  );
};

// 5. Parallax Cards (Карточки с параллакс-эффектом)
export const ParallaxCards = ({ projects, onSelect, onLike, onFavorite }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
    });
  };

  return (
    <div 
      className="relative h-[600px] overflow-hidden rounded-3xl"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      <div className="relative h-full flex items-center justify-center">
        {projects.slice(0, 5).map((project, index) => {
          const layer = index + 1;
          const xOffset = mousePosition.x * 20 * layer;
          const yOffset = mousePosition.y * 20 * layer;
          const scale = 1 - (index * 0.1);
          const opacity = 1 - (index * 0.2);
          const zIndex = 100 - index;
          
          return (
            <motion.div
              key={project.id}
              className="absolute w-80 h-96 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                x: xOffset,
                y: yOffset,
                scale,
                opacity,
                zIndex,
                transformStyle: 'preserve-3d'
              }}
              whileHover={{ scale: scale + 0.1 }}
              onClick={() => onSelect(project)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${project.image})`,
                  transform: `translateZ(${layer * 10}px)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300">{project.shortDescription}</p>
                  </div>
                  <span className="px-3 py-1 bg-cyan-800/80 text-cyan-300 rounded-full text-sm">
                    Layer {layer}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLike(project.id);
                      }}
                      className={`p-2 rounded-full ${project.isLiked ? 'bg-red-900/30 text-red-400' : 'bg-black/30 text-white'}`}
                    >
                      <FiHeart />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFavorite(project.id);
                      }}
                      className={`p-2 rounded-full ${project.isFavorite ? 'bg-yellow-900/30 text-yellow-400' : 'bg-black/30 text-white'}`}
                    >
                      <FiStar />
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:opacity-90">
                    Explore
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-sm opacity-70">Двигайте курсором для параллакс-эффекта • Глубина от 1 до 5 слоев</p>
      </div>
    </div>
  );
};

// 6. Interactive Cube (Интерактивный куб)
export const InteractiveCube = ({ projects, onSelect }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeFace, setActiveFace] = useState(0);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setRotation(prev => ({
      x: prev.x + e.movementY * 0.5,
      y: prev.y + e.movementX * 0.5
    }));
  };

  const faces = [
    { color: 'from-cyan-600 to-blue-600', title: 'Frontend', projects: projects.filter(p => p.technologies.includes('React')) },
    { color: 'from-green-600 to-emerald-600', title: 'Backend', projects: projects.filter(p => p.technologies.includes('Node')) },
    { color: 'from-purple-600 to-pink-600', title: 'Fullstack', projects: projects.filter(p => p.technologies.includes('React') && p.technologies.includes('Node')) },
    { color: 'from-orange-600 to-red-600', title: 'Mobile', projects: projects.filter(p => p.technologies.includes('React Native')) },
    { color: 'from-yellow-600 to-amber-600', title: 'Design', projects: projects.filter(p => p.technologies.includes('Framer Motion')) },
    { color: 'from-gray-600 to-slate-600', title: 'All Projects', projects: projects }
  ];

  return (
    <div className="relative h-[700px]">
      <div className="absolute inset-0 flex items-center justify-center perspective-1000">
        <motion.div
          className="relative w-64 h-64"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {faces.map((face, index) => {
            const faceTransform = {
              0: 'translateZ(128px)',
              1: 'rotateY(180deg) translateZ(128px)',
              2: 'rotateY(90deg) translateZ(128px)',
              3: 'rotateY(-90deg) translateZ(128px)',
              4: 'rotateX(90deg) translateZ(128px)',
              5: 'rotateX(-90deg) translateZ(128px)'
            }[index];

            return (
              <motion.div
                key={index}
                className={`absolute w-64 h-64 rounded-xl cursor-pointer ${
                  activeFace === index ? 'ring-4 ring-white/50 scale-105' : ''
                }`}
                style={{
                  transform: faceTransform,
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  backfaceVisibility: 'hidden'
                }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveFace(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${face.color} rounded-xl flex flex-col items-center justify-center p-6`}>
                  <FiBox className="text-4xl mb-3 text-white/80" /> {/* Используем FiBox вместо FiCube */}
                  <h3 className="text-xl font-bold text-white mb-2">{face.title}</h3>
                  <p className="text-white/70 text-center">{face.projects.length} проектов</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeFace !== null && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gray-900/90 backdrop-blur-sm border-t border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                <span className={`
                  ${activeFace === 0 ? 'text-cyan-400' : ''}
                  ${activeFace === 1 ? 'text-green-400' : ''}
                  ${activeFace === 2 ? 'text-purple-400' : ''}
                  ${activeFace === 3 ? 'text-orange-400' : ''}
                  ${activeFace === 4 ? 'text-yellow-400' : ''}
                  ${activeFace === 5 ? 'text-gray-400' : ''}
                `}>
                  {faces[activeFace].title}
                </span>
                <span className="text-gray-400 ml-2">({faces[activeFace].projects.length} проектов)</span>
              </h3>
              <button
                onClick={() => setActiveFace(null)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <FiX />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faces[activeFace].projects.map(project => (
                <div
                  key={project.id}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-cyan-500 transition-colors cursor-pointer"
                  onClick={() => onSelect(project)}
                >
                  <h4 className="font-bold mb-2">{project.title}</h4>
                  <p className="text-gray-300 text-sm line-clamp-2">{project.shortDescription}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-sm opacity-70">
          Перетаскивайте куб • Кликните на грань для просмотра проектов
        </p>
      </div>
    </div>
  );
};