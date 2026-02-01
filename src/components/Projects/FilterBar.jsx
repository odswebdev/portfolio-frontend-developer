import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiHtml5, SiCss3, SiJavascript, SiReact } from "react-icons/si";

const techIcons = {
  Html: <SiHtml5 className="text-orange-500 text-lg" />,
  Css: <SiCss3 className="text-blue-500 text-lg" />,
  Js: <SiJavascript className="text-yellow-400 text-lg" />,
  React: <SiReact className="text-cyan-400 text-lg" />,
};

export default function FilterBar({
  filters,
  setFilters,
  categories,
  subcategories,
  technologies,
}) {
  const toggleTech = (tech) => {
    setFilters((prev) => {
      const techs = prev.techs || [];
      return {
        ...prev,
        techs: techs.includes(tech)
          ? techs.filter((t) => t !== tech)
          : [...techs, tech],
      };
    });
  };

  const clearFilter = (type, value) => {
    if (type === "category")
      setFilters({ category: "Все", subcategory: "Все", techs: [] });
    if (type === "subcategory")
      setFilters((prev) => ({ ...prev, subcategory: "Все", techs: [] }));
    if (type === "tech") toggleTech(value);
  };

  const FilterChip = ({ label, active, color, onClick, icon }) => (
    <motion.button
      layout
      whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
      className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all
        ${
          active
            ? `bg-gradient-to-r from-${color}-400 to-${color}-600 text-white shadow-lg`
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {label}
      {active && (
        <span
          className="ml-1 cursor-pointer font-bold hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          ✖
        </span>
      )}
    </motion.button>
  );

  return (
    <div className="flex flex-col gap-3 p-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-xl shadow-lg">
      {/* Категории */}
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              label={cat}
              active={filters.category === cat}
              color="purple"
              onClick={() =>
                setFilters({ category: cat, subcategory: "Все", techs: [] })
              }
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Подкатегории */}
      {filters.category !== "Все" && (
        <div className="flex flex-wrap gap-2 mt-2">
          <AnimatePresence>
            {subcategories.map((sub) => (
              <FilterChip
                key={sub}
                label={sub}
                active={filters.subcategory === sub}
                color="pink"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    subcategory: sub,
                    techs: [],
                  }))
                }
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Технологии (мультивыбор) */}
      {filters.subcategory !== "Все" && (
        <div className="flex flex-wrap gap-2 mt-2">
          <AnimatePresence>
            {technologies.map((tech) => (
              <FilterChip
                key={tech}
                label={tech}
                icon={techIcons[tech]}
                active={filters.techs?.includes(tech)}
                color="cyan"
                onClick={() => toggleTech(tech)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
