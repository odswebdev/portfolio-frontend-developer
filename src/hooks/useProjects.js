// src/hooks/useProjects.js
import { useState, useMemo, useCallback } from 'react';
import { projects } from '../components/constans/data';

export const useProjects = () => {
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    technology: '',
    sortBy: 'date',
    sortDirection: 'desc',
    search: ''
  });

  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState({});

  // Фильтрация и сортировка проектов
  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        if (filters.category && project.category !== filters.category) return false;
        if (filters.subcategory && project.subcategory !== filters.subcategory) return false;
        if (filters.technology && !project.technologies.includes(filters.technology)) return false;
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          return (
            project.title.toLowerCase().includes(searchLower) ||
            project.shortDescription.toLowerCase().includes(searchLower) ||
            project.description.toLowerCase().includes(searchLower) ||
            project.technologies.some(t => t.toLowerCase().includes(searchLower))
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'date') {
          return filters.sortDirection === 'desc' 
            ? new Date(b.updatedAt) - new Date(a.updatedAt)
            : new Date(a.updatedAt) - new Date(b.updatedAt);
        } else if (filters.sortBy === 'popularity') {
          return filters.sortDirection === 'desc'
            ? b.likes - a.likes
            : a.likes - b.likes;
        } else if (filters.sortBy === 'title') {
          return filters.sortDirection === 'desc'
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [filters]);

  // Обработчики фильтров
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      category: '',
      subcategory: '',
      technology: '',
      sortBy: 'date',
      sortDirection: 'desc',
      search: ''
    });
  }, []);

  // Управление избранным
  const toggleFavorite = useCallback((projectId) => {
    setFavorites(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  }, []);

  // Управление лайками
  const toggleLike = useCallback((projectId) => {
    setLikes(prev => ({
      ...prev,
      [projectId]: prev[projectId] ? prev[projectId] + 1 : 1
    }));
  }, []);

  // Подсчет статистики
  const stats = useMemo(() => ({
    total: filteredProjects.length,
    featured: filteredProjects.filter(p => p.featured).length,
    categories: [...new Set(filteredProjects.map(p => p.category))].length
  }), [filteredProjects]);

  return {
    filteredProjects,
    filters,
    viewMode,
    favorites,
    likes,
    stats,
    updateFilter,
    resetFilters,
    setViewMode,
    toggleFavorite,
    toggleLike
  };
};