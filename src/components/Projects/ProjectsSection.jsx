import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFilter, FiGrid, FiList, FiHeart, FiShare2, 
  FiExternalLink, FiGithub, FiCalendar, FiTrendingUp,
  FiX, FiChevronDown, FiChevronUp, FiStar, FiEye,
  FiArrowLeft, FiArrowRight, FiSearch, FiClock,
  FiLayout, FiImage, FiMaximize, FiMinimize, 
  FiLayers, FiGlobe, FiBox, FiActivity, FiPackage,
  FiCpu, FiSliders
} from 'react-icons/fi';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import Filter from './Filter';
import GalleryView from './GalleryView';
import CarouselView from './CarouselView';

// Импортируем креативные view
import { Carousel3D, HexGrid, TimelineView, ParticleCloud, ParallaxCards, InteractiveCube } from './CreativeViews';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Режимы отображения
  const [viewMode, setViewMode] = useState('carousel');
  const [showFilters, setShowFilters] = useState(true);
  const [gridColumns, setGridColumns] = useState(3);
  const [displayEffects, setDisplayEffects] = useState('fade');
  
  // Состояние фильтров
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    subcategory: 'all',
    technologies: [],
    sortBy: 'date',
    dateRange: 'all'
  });

  // Состояние галереи/карусели
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Загружаем проекты
  useEffect(() => {
    const loadProjects = () => {
      const sampleProjects = [
        {
          id: 1,
          title: "E-Commerce Platform",
          shortDescription: "Полнофункциональная платформа электронной коммерции с панелью администратора",
          detailedDescription: "Современный интернет-магазин с функционалом корзины, оплатой, системой отзывов и рейтингов, а также панелью администратора для управления товарами и заказами. Реализована система рекомендаций на основе машинного обучения.",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1556742048-ede6c2b9e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          category: "web",
          subcategory: "e-commerce",
          technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Tailwind", "Redux"],
          likes: 42,
          isLiked: false,
          views: 156,
          isFavorite: false,
          demoUrl: "https://ecommerce-demo.vercel.app",
          githubUrl: "https://github.com/username/ecommerce-platform",
          date: "2024-03-15"
        },
        {
          id: 2,
          title: "Social Media Dashboard",
          shortDescription: "Аналитическая панель для социальных сетей с графиками и статистикой",
          detailedDescription: "Интерактивный дашборд для анализа активности в социальных сетях. Включает графики, таблицы, фильтры по времени и платформам, систему уведомлений и возможность экспорта данных. Реализована в реальном времени с использованием WebSockets.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          category: "dashboard",
          subcategory: "analytics",
          technologies: ["React", "TypeScript", "Chart.js", "Socket.io", "Tailwind", "Express"],
          likes: 28,
          isLiked: false,
          views: 89,
          isFavorite: true,
          demoUrl: "https://social-dashboard.vercel.app",
          githubUrl: "https://github.com/username/social-dashboard",
          date: "2024-02-28"
        },
        {
          id: 3,
          title: "Task Management App",
          shortDescription: "Приложение для управления задачами с командной работой и дедлайнами",
          detailedDescription: "Kanban-доска для управления проектами с возможностью создания задач, назначения исполнителей, установки сроков, прикрепления файлов и комментирования. Реализованы уведомления, поиск и фильтрация.",
          image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          category: "productivity",
          subcategory: "task-management",
          technologies: ["React", "TypeScript", "Vite", "Tailwind", "Framer Motion", "Firebase"],
          likes: 35,
          isLiked: true,
          views: 112,
          isFavorite: false,
          demoUrl: "https://taskmanager-demo.vercel.app",
          githubUrl: "https://github.com/username/task-manager",
          date: "2024-03-10"
        },
        {
          id: 4,
          title: "Fitness Tracking App",
          shortDescription: "Приложение для отслеживания тренировок и питания с персонализированными планами",
          detailedDescription: "Мобильное веб-приложение для фитнес-трекинга с календарем тренировок, трекером питания, графиками прогресса и библиотекой упражнений. Интеграция с внешними API для получения данных о питании.",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          category: "health",
          subcategory: "fitness",
          technologies: ["React Native", "TypeScript", "Redux", "Firebase", "Chart.js"],
          likes: 19,
          isLiked: false,
          views: 67,
          isFavorite: false,
          demoUrl: "https://fitness-tracker.vercel.app",
          githubUrl: "https://github.com/username/fitness-app",
          date: "2024-01-22"
        },
        {
          id: 5,
          title: "Real Estate Platform",
          shortDescription: "Платформа для поиска недвижимости с картами, фильтрами и виртуальными турами",
          detailedDescription: "Современный маркетплейс недвижимости с продвинутым поиском по параметрам, интеграцией карт, системой сохранения избранных объектов, чатом с агентами и функцией виртуальных туров. Адаптивный дизайн для всех устройств.",
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          category: "web",
          subcategory: "real-estate",
          technologies: ["Next.js", "TypeScript", "Mapbox", "Tailwind", "Prisma", "PostgreSQL"],
          likes: 31,
          isLiked: false,
          views: 98,
          isFavorite: true,
          demoUrl: "https://real-estate-platform.vercel.app",
          githubUrl: "https://github.com/username/real-estate",
          date: "2024-02-05"
        },
        {
          id: 6,
          title: "Cryptocurrency Tracker",
          shortDescription: "Отслеживание криптовалют в реальном времени с графиками и портфелем",
          detailedDescription: "Приложение для мониторинга криптовалютных рынков с обновлением цен в реальном времени, интерактивными графиками, созданием виртуального портфеля и настраиваемыми уведомлениями о ценах. Использует WebSocket для live данных.",
          image: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          images: [
            "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          ],
          category: "finance",
          subcategory: "crypto",
          technologies: ["React", "TypeScript", "Recharts", "WebSocket", "Tailwind", "Vite"],
          likes: 47,
          isLiked: true,
          views: 134,
          isFavorite: false,
          demoUrl: "https://crypto-tracker-demo.vercel.app",
          githubUrl: "https://github.com/username/crypto-tracker",
          date: "2024-03-01"
        }
      ];
      
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setLoading(false);
    };

    setTimeout(loadProjects, 800);
  }, []);

  // Применяем фильтры
  useEffect(() => {
    if (projects.length === 0) return;

    let result = [...projects];
    
    if (activeFilters.category !== 'all') {
      result = result.filter(project => project.category === activeFilters.category);
    }
    
    if (activeFilters.subcategory !== 'all') {
      result = result.filter(project => project.subcategory === activeFilters.subcategory);
    }
    
    if (activeFilters.technologies.length > 0) {
      result = result.filter(project => 
        activeFilters.technologies.every(tech => 
          project.technologies.map(t => t.toLowerCase()).includes(tech.toLowerCase())
        )
      );
    }
    
    if (activeFilters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch(activeFilters.dateRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      result = result.filter(project => {
        try {
          return new Date(project.date) >= cutoffDate;
        } catch (error) {
          return true;
        }
      });
    }
    
    switch(activeFilters.sortBy) {
      case 'date':
        result.sort((a, b) => {
          try {
            return new Date(b.date) - new Date(a.date);
          } catch (error) {
            return 0;
          }
        });
        break;
      case 'popularity':
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'likes':
        result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        break;
    }
    
    setFilteredProjects(result);
  }, [activeFilters, projects]);

  // Обработчики
  const handleLike = (projectId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            likes: project.likes + (project.isLiked ? -1 : 1), 
            isLiked: !project.isLiked 
          }
        : project
    ));
  };

  const handleFavorite = (projectId) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, isFavorite: !project.isFavorite }
        : project
    ));
  };

  const handleShare = (project) => {
    if (!project) return;
    
    if (navigator.share && navigator.canShare && navigator.canShare({ url: project.demoUrl })) {
      navigator.share({
        title: project.title || 'Проект',
        text: project.shortDescription || 'Посмотрите этот проект',
        url: project.demoUrl || window.location.href,
      }).catch((error) => {
        console.log('Ошибка при использовании Web Share API:', error);
        copyToClipboard(project.demoUrl || window.location.href);
      });
    } else {
      copyToClipboard(project.demoUrl || window.location.href);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Ссылка скопирована в буфер обмена!');
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Ссылка скопирована в буфер обмена!');
    });
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      const newProject = {
        id: projects.length + 1,
        title: `Новый проект ${projects.length + 1}`,
        shortDescription: "Описание нового проекта, добавленного по кнопке 'Загрузить еще'",
        detailedDescription: "Детальное описание нового проекта, которое появилось после нажатия кнопки загрузки дополнительных проектов.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        images: [
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        category: "web",
        subcategory: "other",
        technologies: ["React", "TypeScript", "Tailwind"],
        likes: 0,
        isLiked: false,
        views: 0,
        isFavorite: false,
        demoUrl: "#",
        githubUrl: "#",
        date: new Date().toISOString().split('T')[0]
      };
      
      setProjects(prev => [...prev, newProject]);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      const filtered = applyFilters(projects, activeFilters);
      setFilteredProjects(filtered);
      return;
    }
    
    const searchResults = projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.shortDescription.toLowerCase().includes(searchTerm) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
      project.category.toLowerCase().includes(searchTerm) ||
      project.subcategory.toLowerCase().includes(searchTerm)
    );
    
    const filtered = applyFilters(searchResults, activeFilters);
    setFilteredProjects(filtered);
  };

  const applyFilters = (projectsList, filters) => {
    let result = [...projectsList];
    
    if (filters.category !== 'all') {
      result = result.filter(project => project.category === filters.category);
    }
    
    if (filters.subcategory !== 'all') {
      result = result.filter(project => project.subcategory === filters.subcategory);
    }
    
    if (filters.technologies.length > 0) {
      result = result.filter(project => 
        filters.technologies.every(tech => 
          project.technologies.map(t => t.toLowerCase()).includes(tech.toLowerCase())
        )
      );
    }
    
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch(filters.dateRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      result = result.filter(project => {
        try {
          return new Date(project.date) >= cutoffDate;
        } catch (error) {
          return true;
        }
      });
    }
    
    switch(filters.sortBy) {
      case 'date':
        result.sort((a, b) => {
          try {
            return new Date(b.date) - new Date(a.date);
          } catch (error) {
            return 0;
          }
        });
        break;
      case 'popularity':
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'likes':
        result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        break;
    }
    
    return result;
  };

  // Функция для открытия модального окна с проектом
  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  // Функции для навигации в галерее/карусели
  const nextProject = () => {
    setGalleryIndex(prev => 
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const prevProject = () => {
    setGalleryIndex(prev => 
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  // Простой слайдер
  const SimpleSlider = ({ projects }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
      setCurrentSlide(prev => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
      setCurrentSlide(prev => (prev - 1 + projects.length) % projects.length);
    };

    if (!projects.length) return null;

    return (
      <div className="relative h-[500px] rounded-3xl overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${projects[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-2xl"
                >
                  <h3 className="text-4xl font-bold mb-4">{projects[currentSlide].title}</h3>
                  <p className="text-lg mb-6">{projects[currentSlide].shortDescription}</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => openProjectModal(projects[currentSlide])}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:opacity-90 transition"
                    >
                      Подробнее
                    </button>
                    <a
                      href={projects[currentSlide].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition"
                    >
                      Посмотреть демо
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 backdrop-blur-sm"
        >
          <FiArrowLeft size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 backdrop-blur-sm"
        >
          <FiArrowRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>

        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
            {currentSlide + 1} / {projects.length}
          </span>
        </div>
      </div>
    );
  };

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Рендер контента в зависимости от режима отображения
  const renderContent = () => {
    switch(viewMode) {
      case 'gallery':
        return (
          <GalleryView
            projects={filteredProjects}
            onSelect={openProjectModal}
            onLike={handleLike}
            onFavorite={handleFavorite}
            onShare={handleShare}
          />
        );

      case 'carousel':
        return (
          <CarouselView
            projects={filteredProjects}
            currentIndex={galleryIndex}
            onNext={nextProject}
            onPrev={prevProject}
            onSelect={openProjectModal}
            onLike={handleLike}
            onFavorite={handleFavorite}
            onShare={handleShare}
            isFullscreen={isFullscreen}
          />
        );

      case '3d-carousel':
        return (
          <Carousel3D
            projects={filteredProjects}
            currentIndex={galleryIndex}
            onSelect={openProjectModal}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
        );

      case 'hex-grid':
        return (
          <HexGrid
            projects={filteredProjects}
            onSelect={openProjectModal}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
        );

      case 'timeline':
        return (
          <TimelineView
            projects={filteredProjects}
            onSelect={openProjectModal}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
        );

      case 'particle-cloud':
        return (
          <ParticleCloud
            projects={filteredProjects}
            onSelect={openProjectModal}
          />
        );

      case 'parallax':
        return (
          <ParallaxCards
            projects={filteredProjects}
            onSelect={openProjectModal}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
        );

      case 'cube':
        return (
          <InteractiveCube
            projects={filteredProjects}
            onSelect={openProjectModal}
          />
        );

      case 'simple-slider':
        return (
          <SimpleSlider projects={filteredProjects} />
        );

      default: // grid и list
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`
              ${viewMode === 'grid' 
                ? `grid gap-6 ${gridColumns === 2 ? 'grid-cols-1 md:grid-cols-2' : gridColumns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`
                : 'flex flex-col gap-6'
              }
            `}
          >
            <AnimatePresence>
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  viewMode={viewMode}
                  displayEffect={displayEffects}
                  onSelect={openProjectModal}
                  onLike={handleLike}
                  onFavorite={handleFavorite}
                  onShare={handleShare}
                  variants={itemVariants}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        );
    }
  };

  // Функция для получения иконки режима
  const getViewModeIcon = (mode) => {
    switch(mode) {
      case 'grid': return <FiGrid size={18} />;
      case 'list': return <FiList size={18} />;
      case 'gallery': return <FiImage size={18} />;
      case 'carousel': return <FiLayout size={18} />;
      case '3d-carousel': return <FiBox size={18} />; // Используем FiBox вместо FiCube
      case 'hex-grid': return <FiPackage size={18} />; // Используем FiPackage вместо FiHexagon
      case 'timeline': return <FiActivity size={18} />; // Используем FiActivity вместо FiZap
      case 'simple-slider': return <FiGlobe size={18} />;
      case 'particle-cloud': return <FiCpu size={18} />;
      case 'parallax': return <FiLayers size={18} />;
      case 'cube': return <FiBox size={18} />;
      default: return <FiGrid size={18} />;
    }
  };

  // Функция для получения названия режима
  const getViewModeName = (mode) => {
    const names = {
      'carousel': 'Карусель',
      'grid': 'Сетка',
      'list': 'Список',
      'gallery': 'Галерея',
      '3d-carousel': '3D Карусель',
      'hex-grid': 'Гексагоны',
      'timeline': 'Таймлайн',
      'simple-slider': 'Слайдер',
      'particle-cloud': 'Облако',
      'parallax': 'Параллакс',
      'cube': '3D Куб'
    };
    return names[mode] || mode;
  };

  return (
    <section id="projects" className={`py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-900 to-black p-[50px_0] text-white ${isFullscreen ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
    
      <div className={`max-w-7xl mx-auto ${isFullscreen ? 'h-full' : ''}`}>
        {/* Заголовок секции - скрываем в полноэкранном режиме */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Мои проекты
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Коллекция моих лучших работ, реализованных с использованием современных технологий и лучших практик разработки
            </p>
          </motion.div>
        )}

        {/* Панель управления */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex flex-col md:flex-row justify-between items-center mb-10 p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 ${isFullscreen ? 'mb-6' : ''}`}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-0">
            {/* Кнопка фильтров */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:opacity-90 transition"
            >
              {showFilters ? <FiMinimize /> : <FiFilter />}
              {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
            </button>
            
            {/* Основные режимы отображения */}
            <div className="flex items-center gap-1 bg-gray-800/50 p-1 rounded-lg">
              {['grid', 'list', 'gallery', 'carousel', 'simple-slider'].map(mode => (
                <button
                  key={mode}
                  onClick={() => {
                    setViewMode(mode);
                    if (mode === 'carousel') setIsFullscreen(false);
                  }}
                  className={`p-2 rounded-md transition-all ${viewMode === mode ? 'bg-cyan-800 text-white' : 'bg-transparent text-gray-400 hover:text-white'}`}
                  title={getViewModeName(mode)}
                >
                  {getViewModeIcon(mode)}
                </button>
              ))}
            </div>

            {/* Расширенные режимы отображения */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition">
                <FiLayers /> Креативные...
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {['3d-carousel', 'hex-grid', 'timeline', 'particle-cloud', 'parallax', 'cube'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-b-0 flex items-center gap-3"
                  >
                    <span className="text-lg">{getViewModeIcon(mode)}</span>
                    <span>{getViewModeName(mode)}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Настройки сетки (только для grid режима) */}
            {viewMode === 'grid' && (
              <div className="flex items-center gap-2">
                <span className="text-gray-300 text-sm hidden sm:block">Сетка:</span>
                {[2, 3, 4].map(cols => (
                  <button
                    key={cols}
                    onClick={() => setGridColumns(cols)}
                    className={`px-3 py-1 rounded-md transition-all ${gridColumns === cols ? 'bg-cyan-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    {cols}
                  </button>
                ))}
              </div>
            )}
            
            {/* Эффекты анимации */}
            <div className="relative">
              <select
                value={displayEffects}
                onChange={(e) => setDisplayEffects(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
              >
                <option value="fade">Эффект: Fade</option>
                <option value="slide">Эффект: Slide</option>
                <option value="flip">Эффект: Flip</option>
                <option value="zoom">Эффект: Zoom</option>
              </select>
              <FiChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Поиск и статистика */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск проектов..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full md:w-64"
                onChange={handleSearch}
              />
            </div>
            <div className="text-sm text-gray-300 hidden md:block">
              <span className="text-cyan-400 font-bold">{filteredProjects.length}</span> из <span className="text-purple-400">{projects.length}</span>
            </div>
          </div>
        </motion.div>

        {/* Текущий режим просмотра */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-400">Режим:</span>
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-lg border border-cyan-700/30">
                {getViewModeName(viewMode)}
              </span>
            </div>
          </motion.div>
        )}

        {/* Основной контент с фильтрами и проектами */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Боковая панель фильтров */}
          <AnimatePresence>
            {showFilters && viewMode !== 'carousel' && !isFullscreen && (
              <>
                {/* Для мобильных */}
                <div className="lg:hidden">
                  {showFilters && (
                    <>
                      <div className="fixed inset-0 bg-black/70 z-40" onClick={() => setShowFilters(false)} />
                      <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="fixed left-0 top-0 h-full w-80 bg-gray-900 z-50 overflow-y-auto p-6 shadow-2xl"
                      >
                        <Filter 
                          activeFilters={activeFilters}
                          setActiveFilters={setActiveFilters}
                          onClose={() => setShowFilters(false)}
                        />
                      </motion.div>
                    </>
                  )}
                </div>
                
                {/* Для десктопа */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '20rem', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="hidden lg:block w-80 flex-shrink-0"
                >
                  <div className="sticky top-6">
                    <Filter
                      activeFilters={activeFilters}
                      setActiveFilters={setActiveFilters}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Сетка проектов */}
          <div className={`${showFilters && viewMode !== 'carousel' && !isFullscreen ? 'lg:flex-1' : 'w-full'}`}>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                <span className="ml-4 text-gray-300">Загрузка проектов...</span>
              </div>
            ) : (
              <>
                <div className={`${['gallery', 'carousel', '3d-carousel', 'hex-grid', 'timeline', 'particle-cloud', 'parallax', 'cube', 'simple-slider'].includes(viewMode) ? 'mb-8' : ''}`}>
                  {renderContent()}
                </div>

                {filteredProjects.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <div className="text-6xl mb-4">😔</div>
                    <h3 className="text-2xl font-bold mb-2">Проекты не найдены</h3>
                    <p className="text-gray-400 mb-6">Попробуйте изменить параметры фильтрации или поисковый запрос</p>
                    <button
                      onClick={() => {
                        setActiveFilters({
                          category: 'all',
                          subcategory: 'all',
                          technologies: [],
                          sortBy: 'date',
                          dateRange: 'all'
                        });
                        const searchInput = document.querySelector('input[type="text"]');
                        if (searchInput) searchInput.value = '';
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:opacity-90 transition"
                    >
                      Сбросить фильтры и поиск
                    </button>
                  </motion.div>
                )}

                {/* Кнопка загрузки еще (скрываем в специальных режимах) */}
                {filteredProjects.length > 0 && 
                 !['gallery', 'carousel', '3d-carousel', 'hex-grid', 'timeline', 'particle-cloud', 'parallax', 'cube', 'simple-slider'].includes(viewMode) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                  >
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-cyan-700 to-blue-700 rounded-xl hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2 mx-auto"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                          Загрузка...
                        </>
                      ) : (
                        'Загрузить еще проекты'
                      )}
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно с деталями проекта */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onLike={handleLike}
        onFavorite={handleFavorite}
        onShare={handleShare}
      />
    </section>
  );
};

export default ProjectsSection;