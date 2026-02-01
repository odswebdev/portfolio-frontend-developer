import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiHeart, FiStar, FiExternalLink, FiGithub } from 'react-icons/fi';

const GalleryView = ({ projects, onSelect, onLike, onFavorite, onShare }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">Нет проектов для отображения</p>
      </div>
    );
  }

  const openImageModal = (project, imageIndex) => {
    setSelectedImage({ project, imageIndex });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (!selectedImage) return;
    const { project, imageIndex } = selectedImage;
    if (imageIndex < (project.images?.length || 1) - 1) {
      setSelectedImage({ ...selectedImage, imageIndex: imageIndex + 1 });
    }
  };

  const prevImage = () => {
    if (!selectedImage) return;
    const { project, imageIndex } = selectedImage;
    if (imageIndex > 0) {
      setSelectedImage({ ...selectedImage, imageIndex: imageIndex - 1 });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-gray-800/30 border border-gray-700"
          >
            {/* Основное изображение проекта */}
            <div 
              className="h-64 bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${project.image})` }}
              onClick={() => openImageModal(project, 0)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{project.shortDescription}</p>
              </div>
            </div>
            
            {/* Дополнительные миниатюры */}
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                {project.images?.slice(0, 3).map((img, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-16 bg-cover bg-center rounded-lg cursor-pointer border-2 border-transparent hover:border-cyan-500 transition-all"
                    style={{ backgroundImage: `url(${img})` }}
                    onClick={() => openImageModal(project, idx)}
                  />
                ))}
              </div>
              
              <div className="flex justify-between items-center">
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
                
                <button
                  onClick={() => onSelect(project)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:opacity-90 transition"
                >
                  Подробнее
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Модальное окно для просмотра изображений */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.project.images?.[selectedImage.imageIndex] || selectedImage.project.image}
                alt={selectedImage.project.title}
                className="w-full h-full object-contain rounded-lg"
              />
              
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
              >
                ✕
              </button>
              
              {selectedImage.project.images && selectedImage.project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    disabled={selectedImage.imageIndex === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 disabled:opacity-50"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    disabled={selectedImage.imageIndex === selectedImage.project.images.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 disabled:opacity-50"
                  >
                    <FiChevronRight size={24} />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {selectedImage.project.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage({ ...selectedImage, imageIndex: idx })}
                        className={`w-2 h-2 rounded-full ${idx === selectedImage.imageIndex ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{selectedImage.project.title}</h3>
                <p className="text-gray-300 text-sm">Изображение {selectedImage.imageIndex + 1} из {selectedImage.project.images?.length || 1}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryView;