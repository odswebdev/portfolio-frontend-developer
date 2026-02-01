import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFilter, FiX, FiChevronDown, FiChevronUp, 
  FiCalendar, FiTrendingUp, FiHeart, FiClock
} from 'react-icons/fi';

const Filter = ({ activeFilters, setActiveFilters, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    technologies: true,
    sort: true,
    date: true
  });

  const categories = [
    { id: 'all', name: 'Все категории', count: 12 },
    { id: 'web', name: 'Веб-приложения', count: 6 },
    { id: 'dashboard', name: 'Дашборды', count: 3 },
    { id: 'productivity', name: 'Продуктивность', count: 2 },
    { id: 'health', name: 'Здоровье', count: 1 },
    { id: 'finance', name: 'Финансы', count: 2 },
    { id: 'mobile', name: 'Мобильные', count: 1 },
  ];

  const subcategories = [
    { id: 'all', name: 'Все подкатегории', category: 'all' },
    { id: 'e-commerce', name: 'Электронная коммерция', category: 'web' },
    { id: 'real-estate', name: 'Недвижимость', category: 'web' },
    { id: 'analytics', name: 'Аналитика', category: 'dashboard' },
    { id: 'task-management', name: 'Управление задачами', category: 'productivity' },
    { id: 'fitness', name: 'Фитнес', category: 'health' },
    { id: 'crypto', name: 'Криптовалюта', category: 'finance' },
    { id: 'social', name: 'Социальные сети', category: 'web' },
  ];

  const technologies = [
    { id: 'react', name: 'React', count: 8 },
    { id: 'typescript', name: 'TypeScript', count: 7 },
    { id: 'tailwind', name: 'Tailwind CSS', count: 9 },
    { id: 'node', name: 'Node.js', count: 4 },
    { id: 'next', name: 'Next.js', count: 3 },
    { id: 'vite', name: 'Vite', count: 5 },
    { id: 'framer', name: 'Framer Motion', count: 6 },
    { id: 'redux', name: 'Redux', count: 3 },
    { id: 'firebase', name: 'Firebase', count: 2 },
    { id: 'mongodb', name: 'MongoDB', count: 2 },
  ];

  const sortOptions = [
    { id: 'date', name: 'По дате', icon: <FiCalendar /> },
    { id: 'popularity', name: 'По популярности', icon: <FiTrendingUp /> },
    { id: 'likes', name: 'По лайкам', icon: <FiHeart /> },
  ];

  const dateRanges = [
    { id: 'all', name: 'За все время' },
    { id: 'week', name: 'За неделю' },
    { id: 'month', name: 'За месяц' },
    { id: 'year', name: 'За год' },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTechnologyToggle = (techId) => {
    const newTechs = activeFilters.technologies.includes(techId)
      ? activeFilters.technologies.filter(id => id !== techId)
      : [...activeFilters.technologies, techId];
    
    setActiveFilters({
      ...activeFilters,
      technologies: newTechs
    });
  };

  const handleCategoryChange = (categoryId) => {
    setActiveFilters({
      ...activeFilters,
      category: categoryId,
      subcategory: 'all' // Сбрасываем подкатегорию при смене категории
    });
  };

  const resetFilters = () => {
    setActiveFilters({
      category: 'all',
      subcategory: 'all',
      technologies: [],
      sortBy: 'date',
      dateRange: 'all'
    });
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <FiFilter /> Фильтры
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Секция категорий */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-semibold">Категории</span>
          {expandedSections.category ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        <AnimatePresence>
          {expandedSections.category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`flex justify-between items-center w-full p-3 rounded-lg transition ${activeFilters.category === cat.id ? 'bg-cyan-900/30 border border-cyan-700' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Секция подкатегорий (только если выбрана категория не "all") */}
      {activeFilters.category !== 'all' && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Подкатегории</h4>
          <div className="space-y-2">
            {subcategories
              .filter(sub => sub.category === 'all' || sub.category === activeFilters.category)
              .map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveFilters({...activeFilters, subcategory: sub.id})}
                  className={`flex justify-between items-center w-full p-3 rounded-lg transition ${activeFilters.subcategory === sub.id ? 'bg-purple-900/30 border border-purple-700' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
                >
                  <span>{sub.name}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Секция технологий */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('technologies')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-semibold">Технологии</span>
          {expandedSections.technologies ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        <AnimatePresence>
          {expandedSections.technologies && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {technologies.map(tech => (
                  <button
                    key={tech.id}
                    onClick={() => handleTechnologyToggle(tech.id)}
                    className={`flex justify-between items-center w-full p-3 rounded-lg transition ${activeFilters.technologies.includes(tech.id) ? 'bg-blue-900/30 border border-blue-700' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
                  >
                    <span>{tech.name}</span>
                    <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {tech.count}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Секция сортировки */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('sort')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-semibold">Сортировка</span>
          {expandedSections.sort ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        <AnimatePresence>
          {expandedSections.sort && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {sortOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setActiveFilters({...activeFilters, sortBy: option.id})}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${activeFilters.sortBy === option.id ? 'bg-green-900/30 border border-green-700' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
                  >
                    {option.icon}
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Секция даты */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('date')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-semibold flex items-center gap-2">
            <FiClock /> Дата
          </span>
          {expandedSections.date ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        
        <AnimatePresence>
          {expandedSections.date && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {dateRanges.map(range => (
                  <button
                    key={range.id}
                    onClick={() => setActiveFilters({...activeFilters, dateRange: range.id})}
                    className={`flex justify-between items-center w-full p-3 rounded-lg transition ${activeFilters.dateRange === range.id ? 'bg-orange-900/30 border border-orange-700' : 'bg-gray-800/50 hover:bg-gray-700/50'}`}
                  >
                    <span>{range.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Активные фильтры */}
      <div className="mb-8">
        <h4 className="font-semibold mb-3">Активные фильтры</h4>
        <div className="flex flex-wrap gap-2">
          {activeFilters.category !== 'all' && (
            <div className="flex items-center gap-1 px-3 py-1 bg-cyan-800/50 rounded-full text-sm">
              {categories.find(c => c.id === activeFilters.category)?.name}
              <button
                onClick={() => setActiveFilters({...activeFilters, category: 'all'})}
                className="ml-1"
              >
                &times;
              </button>
            </div>
          )}
          
          {activeFilters.subcategory !== 'all' && (
            <div className="flex items-center gap-1 px-3 py-1 bg-purple-800/50 rounded-full text-sm">
              {subcategories.find(s => s.id === activeFilters.subcategory)?.name}
              <button
                onClick={() => setActiveFilters({...activeFilters, subcategory: 'all'})}
                className="ml-1"
              >
                &times;
              </button>
            </div>
          )}
          
          {activeFilters.technologies.map(techId => {
            const tech = technologies.find(t => t.id === techId);
            return tech ? (
              <div key={techId} className="flex items-center gap-1 px-3 py-1 bg-blue-800/50 rounded-full text-sm">
                {tech.name}
                <button
                  onClick={() => handleTechnologyToggle(techId)}
                  className="ml-1"
                >
                  &times;
                </button>
              </div>
            ) : null;
          })}
          
          {activeFilters.dateRange !== 'all' && (
            <div className="flex items-center gap-1 px-3 py-1 bg-orange-800/50 rounded-full text-sm">
              {dateRanges.find(d => d.id === activeFilters.dateRange)?.name}
              <button
                onClick={() => setActiveFilters({...activeFilters, dateRange: 'all'})}
                className="ml-1"
              >
                &times;
              </button>
            </div>
          )}
          
          {(activeFilters.category !== 'all' || 
            activeFilters.subcategory !== 'all' || 
            activeFilters.technologies.length > 0 || 
            activeFilters.dateRange !== 'all') ? (
            <button
              onClick={resetFilters}
              className="px-3 py-1 bg-gray-700 rounded-full text-sm hover:bg-gray-600"
            >
              Сбросить все
            </button>
          ) : (
            <div className="text-gray-400 text-sm">Фильтры не применены</div>
          )}
        </div>
      </div>

      {/* Кнопка сброса */}
      <button
        onClick={resetFilters}
        className="w-full py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl hover:opacity-90 transition border border-gray-600"
      >
        Сбросить все фильтры
      </button>
    </div>
  );
};

export default Filter;