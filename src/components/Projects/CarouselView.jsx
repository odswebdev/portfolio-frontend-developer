import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronLeft, FiChevronRight, FiHeart, 
  FiStar, FiExternalLink, FiGithub, FiX, FiMaximize, FiMinimize
} from 'react-icons/fi';

const CarouselView = ({ 
  projects, 
  currentIndex, 
  onNext, 
  onPrev, 
  onSelect, 
  onLike, 
  onFavorite, 
  onShare,
  isFullscreen 
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">Нет проектов для отображения</p>
      </div>
    );
  }

  const currentProject = projects[currentIndex];
  const projectCount = projects.length;

  return (
    <div className={`relative ${isFullscreen ? 'h-[calc(100vh-100px)]' : 'h-[600px]'}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full flex flex-col lg:flex-row"
        >
          {/* Левая часть - изображение */}
          <div 
            className="lg:w-2/3 h-1/2 lg:h-full bg-cover bg-center relative rounded-2xl overflow-hidden"
            style={{ backgroundImage: `url(${currentProject.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            {/* Индикатор прогресса */}
            <div className="absolute top-4 left-4 right-4 h-1 bg-gray-700/50 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentIndex + 1) / projectCount) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Бейджи */}
            <div className="absolute top-8 left-4 flex gap-2">
              <span className="px-3 py-1 bg-cyan-800/80 text-cyan-300 rounded-full text-sm font-medium backdrop-blur-sm">
                {currentProject.category}
              </span>
              <span className="px-3 py-1 bg-purple-800/80 text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm">
                {currentProject.subcategory}
              </span>
            </div>
            
            {/* Кнопки навигации */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <button
                onClick={onPrev}
                className="p-3 bg-black/50 rounded-full text-white hover:bg-black/70 backdrop-blur-sm"
              >
                <FiChevronLeft size={24} />
              </button>
              
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{currentProject.title}</h3>
                <p className="text-gray-300">{currentIndex + 1} / {projectCount}</p>
              </div>
              
              <button
                onClick={onNext}
                className="p-3 bg-black/50 rounded-full text-white hover:bg-black/70 backdrop-blur-sm"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Правая часть - информация */}
          <div className="lg:w-1/3 h-1/2 lg:h-full p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl lg:rounded-l-none overflow-y-auto">
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-4">{currentProject.title}</h3>
              
              <p className="text-gray-300 mb-6 flex-1">
                {currentProject.shortDescription}
              </p>
              
              {/* Технологии */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-cyan-300">Технологии</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies?.slice(0, 5).map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-700/50 rounded-lg text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Статистика */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-800/30 p-3 rounded-xl text-center">
                  <div className="text-xl font-bold text-cyan-400">{currentProject.likes}</div>
                  <div className="text-xs text-gray-400">Лайков</div>
                </div>
                <div className="bg-gray-800/30 p-3 rounded-xl text-center">
                  <div className="text-xl font-bold text-purple-400">{currentProject.views}</div>
                  <div className="text-xs text-gray-400">Просмотров</div>
                </div>
                <div className="bg-gray-800/30 p-3 rounded-xl text-center">
                  <div className="text-xl font-bold text-green-400">
                    {new Date(currentProject.date).getFullYear()}
                  </div>
                  <div className="text-xs text-gray-400">Год</div>
                </div>
              </div>
              
              {/* Кнопки действий */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onFavorite(currentProject.id)}
                    className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
                      currentProject.isFavorite 
                        ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <FiStar /> {currentProject.isFavorite ? 'В избранном' : 'В избранное'}
                  </button>
                  <button
                    onClick={() => onLike(currentProject.id)}
                    className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
                      currentProject.isLiked 
                        ? 'bg-red-900/30 text-red-400 border border-red-700' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <FiHeart /> {currentProject.isLiked ? 'Лайкнуто' : 'Лайк'}
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center gap-2"
                  >
                    <FiGithub /> GitHub
                  </a>
                  <a
                    href={currentProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <FiExternalLink /> Демо
                  </a>
                </div>
                
                <button
                  onClick={() => onSelect(currentProject)}
                  className="w-full py-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 flex items-center justify-center gap-2"
                >
                  Подробнее о проекте
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Миниатюры проектов (только не в полноэкранном режиме) */}
      {!isFullscreen && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-4">Все проекты ({projectCount})</h4>
          <div className="flex overflow-x-auto gap-3 pb-4">
            {projects.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => {
                  // Функция для переключения на конкретный проект
                  const event = { target: { value: idx } };
                  // Здесь нужно добавить логику переключения
                }}
                className={`flex-shrink-0 w-24 h-16 rounded-lg bg-cover bg-center border-2 transition-all ${
                  idx === currentIndex 
                    ? 'border-cyan-500 scale-110' 
                    : 'border-transparent hover:border-gray-500'
                }`}
                style={{ backgroundImage: `url(${project.image})` }}
                title={project.title}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselView;