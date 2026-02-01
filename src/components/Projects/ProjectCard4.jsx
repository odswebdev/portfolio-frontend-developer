import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiHeart, FiShare2, FiExternalLink, FiGithub, 
  FiCalendar, FiEye, FiStar, FiChevronRight
} from 'react-icons/fi';
import { 
  FaReact, FaNodeJs, FaVuejs, FaAngular, 
  FaPython, FaDatabase 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiTypescript, SiVite, 
  SiNextdotjs, SiFramer 
} from 'react-icons/si';

const ProjectCard4 = ({ project, viewMode, displayEffect, onSelect, onLike, onFavorite, onShare, variants }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return <FaReact className="text-cyan-400" />;
    if (techLower.includes('node')) return <FaNodeJs className="text-green-500" />;
    if (techLower.includes('tailwind')) return <SiTailwindcss className="text-cyan-500" />;
    if (techLower.includes('typescript')) return <SiTypescript className="text-blue-500" />;
    if (techLower.includes('vite')) return <SiVite className="text-purple-500" />;
    if (techLower.includes('next')) return <SiNextdotjs className="text-white" />;
    if (techLower.includes('framer')) return <SiFramer className="text-pink-500" />;
    if (techLower.includes('vue')) return <FaVuejs className="text-green-400" />;
    if (techLower.includes('angular')) return <FaAngular className="text-red-500" />;
    if (techLower.includes('python')) return <FaPython className="text-yellow-500" />;
    if (techLower.includes('mongo') || techLower.includes('postgre') || techLower.includes('database')) return <FaDatabase className="text-green-400" />;
    return null;
  };

  const getEffectProps = () => {
    switch (displayEffect) {
      case 'slide':
        return {
          whileHover: { y: -10, transition: { duration: 0.2 } }
        };
      case 'flip':
        return {
          whileHover: { rotateY: 5, rotateX: 5, transition: { duration: 0.3 } }
        };
      case 'zoom':
        return {
          whileHover: { scale: 1.03, transition: { duration: 0.2 } }
        };
      default: // fade
        return {
          whileHover: { boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }
        };
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={variants}
        {...getEffectProps()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-colors"
      >
        <div className="flex flex-col md:flex-row">
          <div 
            className="md:w-64 h-48 md:h-auto bg-cover bg-center cursor-pointer"
            style={{ backgroundImage: `url(${project.image})` }}
            onClick={() => onSelect(project)}
          >
            <div className="h-full w-full bg-gradient-to-r from-black/70 to-transparent p-6 flex flex-col justify-end">
              <div className="flex gap-2 mb-2">
                <span className="px-3 py-1 bg-cyan-800/70 text-cyan-300 rounded-full text-xs font-medium">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-purple-800/70 text-purple-300 rounded-full text-xs font-medium">
                  {project.subcategory}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.shortDescription}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onFavorite(project.id)}
                  className={`p-2 rounded-full ${project.isFavorite ? 'bg-yellow-900/30 text-yellow-400' : 'bg-gray-700 text-gray-400'}`}
                >
                  <FiStar />
                </button>
                <button
                  onClick={() => onLike(project.id)}
                  className={`p-2 rounded-full ${project.isLiked ? 'bg-red-900/30 text-red-400' : 'bg-gray-700 text-gray-400'}`}
                >
                  <FiHeart />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech, idx) => (
                <div key={idx} className="flex items-center gap-1 px-3 py-1 bg-gray-700/50 rounded-lg">
                  {getTechIcon(tech)}
                  <span className="text-sm">{tech}</span>
                </div>
              ))}
              {project.technologies.length > 4 && (
                <div className="px-3 py-1 bg-gray-700/50 rounded-lg text-sm">
                  +{project.technologies.length - 4}
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <FiCalendar />
                  {new Date(project.date).toLocaleDateString('ru-RU')}
                </div>
                <div className="flex items-center gap-1">
                  <FiEye />
                  {project.views}
                </div>
                <div className="flex items-center gap-1">
                  <FiHeart />
                  {project.likes}
                </div>
              </div>
              
              <div className="flex gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  <FiGithub />
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:opacity-90 transition"
                >
                  <FiExternalLink />
                </a>
                <button
                  onClick={() => onSelect(project)}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition flex items-center gap-1"
                >
                  Подробнее <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      variants={variants}
      {...getEffectProps()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-colors h-full flex flex-col"
    >
      {/* Верхняя часть с изображением */}
      <div 
        className="h-48 bg-cover bg-center relative overflow-hidden cursor-pointer"
        style={{ backgroundImage: `url(${project.image})` }}
        onClick={() => onSelect(project)}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Бейджи категорий */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-cyan-800/80 text-cyan-300 rounded-full text-xs font-medium backdrop-blur-sm">
            {project.category}
          </span>
          <span className="px-3 py-1 bg-purple-800/80 text-purple-300 rounded-full text-xs font-medium backdrop-blur-sm">
            {project.subcategory}
          </span>
        </div>
        
        {/* Кнопки действий на изображении */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          className="absolute top-4 right-4 flex gap-2"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(project.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm ${project.isFavorite ? 'bg-yellow-900/50 text-yellow-300' : 'bg-black/50 text-white'}`}
          >
            <FiStar />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(project.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm ${project.isLiked ? 'bg-red-900/50 text-red-300' : 'bg-black/50 text-white'}`}
          >
            <FiHeart />
          </button>
        </motion.div>
        
        {/* Заголовок на изображении */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold truncate">{project.title}</h3>
        </div>
      </div>
      
      {/* Основной контент карточки */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
          {project.shortDescription}
        </p>
        
        {/* Технологии */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-700/50 rounded-md">
              {getTechIcon(tech)}
              <span className="text-xs">{tech}</span>
            </div>
          ))}
          {project.technologies.length > 3 && (
            <div className="px-2 py-1 bg-gray-700/50 rounded-md text-xs">
              +{project.technologies.length - 3}
            </div>
          )}
        </div>
        
        {/* Статистика и кнопки */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700/50">
          <div className="flex gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <FiHeart />
              <span>{project.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye />
              <span>{project.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiCalendar />
              <span>{new Date(project.date).getFullYear()}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              title="GitHub"
            >
              <FiGithub size={16} />
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:opacity-90 transition"
              title="Демо"
            >
              <FiExternalLink size={16} />
            </a>
            <button
              onClick={() => onSelect(project)}
              className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              title="Подробнее"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard4;