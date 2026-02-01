// src/components/UI/ViewToggle.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';

const ViewToggle = ({ viewMode, setViewMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  const views = [
    { id: 'grid', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z' },
    { id: 'list', icon: 'M4 6h16M4 12h16M4 18h16' },
    { id: 'masonry', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM16 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' }
  ];

  return (
    <div 
      className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => setViewMode(view.id)}
          className={`p-2 rounded-md transition-all duration-300 ${
            viewMode === view.id
              ? 'bg-white dark:bg-gray-800 shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          title={view.id.charAt(0).toUpperCase() + view.id.slice(1)}
        >
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={isHovered && viewMode !== view.id ? { scale: 1.2 } : {}}
            animate={viewMode === view.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={view.icon} 
            />
          </motion.svg>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;