import { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";
import ProjectSkeleton from "./ProjectSkeleton";
import { projects } from "../constans/data";

export default function ProjectGallery2() {
  const categories = [...new Set(projects.map((p) => p.category))];

  const [filters, setFilters] = useState({
    category: "Все",
    subcategory: "Все",
    tech: null,
  });
  const [selected, setSelected] = useState(null);
  const [hoverTech, setHoverTech] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef(null);

  // ---- Подкатегории зависят от категории ----
  const subcategories = useMemo(() => {
    if (filters.category === "Все") {
      return [...new Set(projects.map((p) => p.subcategory))];
    }
    return [
      ...new Set(
        projects
          .filter((p) => p.category === filters.category)
          .map((p) => p.subcategory)
      ),
    ];
  }, [filters.category]);

  // ---- Технологии зависят от категории + подкатегории ----
  const technologies = useMemo(() => {
    let filtered = projects;
    if (filters.category !== "Все") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.subcategory !== "Все") {
      filtered = filtered.filter((p) => p.subcategory === filters.subcategory);
    }
    return [...new Set(filtered.flatMap((p) => p.technologies))];
  }, [filters.category, filters.subcategory]);

  // ---- Основной фильтр ----
  const filtered = projects.filter((p) => {
    const matchCategory =
      filters.category === "Все" || p.category === filters.category;
    const matchSub =
      filters.subcategory === "Все" || p.subcategory === filters.subcategory;
    const matchTech = !filters.tech || p.technologies.includes(filters.tech);
    return matchCategory && matchSub && matchTech;
  });

  const visibleProjects = filtered.slice(0, visibleCount);

  // ---- Infinite Scroll ----
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 3, filtered.length));
            setLoading(false);
          }, 800);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filtered.length, loading]);

  // ---- Группировка по категориям ----
  const projectsByCategory =
    filters.category === "Все"
      ? categories.map((cat) => ({
          category: cat,
          items: visibleProjects.filter((p) => p.category === cat),
        }))
      : [
          {
            category: filters.category,
            items: visibleProjects.filter(
              (p) => p.category === filters.category
            ),
          },
        ];

  return (
    <div className="container mx-auto px-4">
      <div>
        <div className="flex items-center justify-between mb-6 xs:justify-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-theme-heading text-clamp-h2 leading-[16px] font-[600] tracking-[0.15em] font-['Marck_Script'] mb-[20px] uppercase text-center"
          >
            Проекты
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-theme text-clamp-desc mt-3 mb-12 text-center"
        >
          Мои последние работы
        </motion.p>
      </div>

      {/* Фильтры */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        subcategories={subcategories}
        technologies={technologies}
        setHoverTech={setHoverTech}
      />

      {/* Секции по категориям */}
      {projectsByCategory.map((section) => (
        <div key={section.category} className="mb-12">
          <motion.div
            layout
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {section.items.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <ProjectCard
                    project={project}
                    onOpen={setSelected}
                    hoverTech={hoverTech}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProjectSkeleton />
                </motion.div>
              ))}
          </motion.div>
        </div>
      ))}

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}
