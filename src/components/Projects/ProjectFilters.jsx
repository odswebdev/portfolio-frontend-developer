// src/components/Projects/ProjectFilters.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories2, subcategories2, technologies2 } from '../constans/data';
import Button from '../UI/Button';
import Badge from '../UI/Badge';

const ProjectFilters = ({ filters, updateFilter, resetFilters }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const toggleVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <motion.div
      variants={filterVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      {/* Мобильный переключатель */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700"
        >
          <span>Filters</span>
          <motion.div
            variants={toggleVariants}
            animate={isMobileOpen ? 'open' : 'closed'}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </Button>
      </div>

      {/* Фильтры */}
      <div className={`grid gap-6 ${
        isMobileOpen ? 'block md:grid' : 'hidden md:grid'
      } md:grid-cols-2 lg:grid-cols-5`}>
        {/* Поиск */}
        <div className="md:col-span-2 lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search projects..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Категория */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => {
              updateFilter('category', e.target.value);
              if (e.target.value === '') {
                updateFilter('subcategory', '');
              }
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All categories2</option>
            {categories2.map(cat => (
              <option key={cat.id} value={cat.label}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Подкатегория */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subcategory
          </label>
          <select
            value={filters.subcategory}
            onChange={(e) => updateFilter('subcategory', e.target.value)}
            disabled={!filters.category}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
          >
            <option value="">All Subcategories2</option>
            {filters.category && subcategories2[filters.category]?.map(subcat => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>
        </div>

        {/* Технология */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Technology
          </label>
          <select
            value={filters.technology}
            onChange={(e) => updateFilter('technology', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Technologies</option>
            {technologies2.map(tech => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        {/* Сортировка */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="date">Date (Newest)</option>
            <option value="popularity">Popularity</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Активные фильтры */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.category && (
            <Badge onClose={() => updateFilter('category', '')}>
              Category: {filters.category}
            </Badge>
          )}
          {filters.subcategory && (
            <Badge onClose={() => updateFilter('subcategory', '')}>
              Subcategory: {filters.subcategory}
            </Badge>
          )}
          {filters.technology && (
            <Badge onClose={() => updateFilter('technology', '')}>
              {filters.technology}
            </Badge>
          )}
          {filters.search && (
            <Badge onClose={() => updateFilter('search', '')}>
              Search: {filters.search}
            </Badge>
          )}
        </div>

        {(filters.category || filters.subcategory || filters.technology || filters.search) && (
          <Button
            onClick={resetFilters}
            variant="outline"
            className="w-full md:w-auto"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectFilters;