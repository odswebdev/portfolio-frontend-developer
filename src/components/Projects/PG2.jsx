import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

// Моковые данные для тестирования
const mockProjects = [
  { id: 1, name: "Project 1", category: "Разработка", tech: ["Html", "Css"] },
  { id: 2, name: "Project 2", category: "Разработка", tech: ["Js"] },
  { id: 3, name: "Project 3", category: "Разработка", tech: ["React"] },
  { id: 4, name: "Project 4", category: "Разработка", tech: ["Html"] },
  { id: 5, name: "Project 5", category: "Разработка", tech: ["Css"] },
  { id: 6, name: "Project 6", category: "Разработка", tech: ["Js"] },
];

const PGallery2 = () => {
  const [visibleCount, setVisibleCount] = useState(3); // Начинаем с 3 проектов
  const projects = mockProjects; // Используем моковые данные для теста

  const filteredProjects = projects; // Упрощаем, без фильтров пока
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Добавляем по 3 проекта
  };

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Проекты</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleProjects.map((project) => (
            <div key={project.id} className="p-4 border rounded shadow">
              <h3>{project.name}</h3>
              <p>Технологии: {project.tech.join(", ")}</p>
            </div>
          ))}
        </div>

        {hasMoreProjects && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Показать еще
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default PGallery2;
