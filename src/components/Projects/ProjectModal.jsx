import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, FiHeart, FiShare2, FiExternalLink, 
  FiGithub, FiCalendar, FiEye, FiStar, 
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { 
  FaReact, FaNodeJs, FaVuejs, FaAngular, 
  FaPython, FaDatabase 
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiTypescript, SiVite, 
  SiNextdotjs, SiFramer 
} from 'react-icons/si';

const ProjectModal = ({ project, onClose, onLike, onFavorite, onShare }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Если проект не передан, не рендерим модальное окно
  if (!project) return null;

  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react')) return <FaReact className="text-cyan-400 text-xl" />;
    if (techLower.includes('node')) return <FaNodeJs className="text-green-500 text-xl" />;
    if (techLower.includes('tailwind')) return <SiTailwindcss className="text-cyan-500 text-xl" />;
    if (techLower.includes('typescript')) return <SiTypescript className="text-blue-500 text-xl" />;
    if (techLower.includes('vite')) return <SiVite className="text-purple-500 text-xl" />;
    if (techLower.includes('next')) return <SiNextdotjs className="text-white text-xl" />;
    if (techLower.includes('framer')) return <SiFramer className="text-pink-500 text-xl" />;
    if (techLower.includes('vue')) return <FaVuejs className="text-green-400 text-xl" />;
    if (techLower.includes('angular')) return <FaAngular className="text-red-500 text-xl" />;
    if (techLower.includes('python')) return <FaPython className="text-yellow-500 text-xl" />;
    if (techLower.includes('mongo') || techLower.includes('postgre') || techLower.includes('database')) 
      return <FaDatabase className="text-green-400 text-xl" />;
    return null;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleLike = () => {
    if (onLike && project.id) {
      onLike(project.id);
    }
  };

  const handleFavorite = () => {
    if (onFavorite && project.id) {
      onFavorite(project.id);
    }
  };

  const handleShare = () => {
    if (onShare && project) {
      onShare(project);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-gray-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Левая часть - изображения */}
          <div className="md:w-1/2 relative bg-black">
            <div 
              className="h-64 md:h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${project.images ? project.images[currentImageIndex] : project.image})` }}
            />
            
            {/* Навигация по изображениям */}
            {project.images && project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                >
                  <FiChevronRight size={24} />
                </button>
                
                {/* Индикатор текущего изображения */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
                
                {/* Счетчик изображений */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                  {currentImageIndex + 1} / {project.images.length}
                </div>
              </>
            )}
            
            {/* Бейджи категорий */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-cyan-800/80 text-cyan-300 rounded-full text-sm font-medium backdrop-blur-sm">
                {project.category || 'Web'}
              </span>
              <span className="px-3 py-1 bg-purple-800/80 text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm">
                {project.subcategory || 'Application'}
              </span>
            </div>
          </div>
          
          {/* Правая часть - детали проекта */}
          <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
            {/* Заголовок и кнопки закрытия */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold">{project.title || 'Проект'}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            
            {/* Описание */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-cyan-300">Описание</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.detailedDescription || project.shortDescription || 'Подробное описание проекта.'}
              </p>
            </div>
            
            {/* Технологии */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-cyan-300">Использованные технологии</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies && project.technologies.length > 0 ? (
                  project.technologies.map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 rounded-xl">
                      {getTechIcon(tech)}
                      <span className="font-medium">{tech}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Технологии не указаны</p>
                )}
              </div>
            </div>
            
            {/* Статистика */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-cyan-300">Статистика</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/30 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {project.likes || 0}
                  </div>
                  <div className="text-sm text-gray-400">Лайков</div>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {project.views || 0}
                  </div>
                  <div className="text-sm text-gray-400">Просмотров</div>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {project.date ? new Date(project.date).toLocaleDateString('ru-RU') : 'Н/Д'}
                  </div>
                  <div className="text-sm text-gray-400">Дата создания</div>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {project.technologies ? project.technologies.length : 0}
                  </div>
                  <div className="text-sm text-gray-400">Технологий</div>
                </div>
              </div>
            </div>
            
            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-colors ${
                    project.isLiked 
                      ? 'bg-red-900/30 text-red-400 border border-red-700' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <FiHeart /> {project.isLiked ? 'Лайкнуто' : 'Лайк'}
                </button>
                <button
                  onClick={handleFavorite}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-colors ${
                    project.isFavorite 
                      ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <FiStar /> {project.isFavorite ? 'В избранном' : 'В избранное'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <FiShare2 /> Поделиться
                </button>
              </div>
              
              <div className="flex gap-2">
                <a
                  href={project.githubUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors flex-1 justify-center"
                >
                  <FiGithub /> Код на GitHub
                </a>
                <a
                  href={project.demoUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:opacity-90 transition-opacity flex-1 justify-center"
                >
                  <FiExternalLink /> Живое демо
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;