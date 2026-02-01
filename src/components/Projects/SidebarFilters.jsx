import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Button } from "@mui/material";
import { projects } from "../constans/data";

const blockVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const allTechnologies = [...new Set(projects.flatMap((p) => p.technologies))];

const SidebarFilters = ({ filters, setFilters, grid, setGrid }) => {
  const [openBlocks, setOpenBlocks] = useState({
    category: true,
    subcategory: true,
    technologies: true,
    grid: true,
  });

  const toggleBlock = (block) => {
    setOpenBlocks({ ...openBlocks, [block]: !openBlocks[block] });
  };

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category, subcategory: null });
  };

  const handleSubcategoryChange = (subcategory) => {
    setFilters({ ...filters, subcategory });
  };

  const handleTechToggle = (tech) => {
    const newTechs = filters.technologies.includes(tech)
      ? filters.technologies.filter((t) => t !== tech)
      : [...filters.technologies, tech];
    setFilters({ ...filters, technologies: newTechs });
  };

  const handleGridChange = (cols) => setGrid(cols);

  return (
    <Box className="w-64 flex-shrink-0 p-4 bg-gray-900 text-white rounded-lg">
      {/* Категории */}
      <Box mb={4}>
        <Button onClick={() => toggleBlock("category")}>Категории</Button>
        {openBlocks.category && (
          <motion.div
            variants={blockVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              "Коммерческие",
              "Пет-проекты",
              "Мини-проекты",
              "Доработки",
              "Наполнение контентом",
            ].map((cat) => (
              <motion.div
                key={cat}
                variants={itemVariants}
                className={`p-2 my-1 rounded cursor-pointer ${
                  filters.category === cat
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </motion.div>
            ))}
          </motion.div>
        )}
      </Box>

      {/* Подкатегории */}
      <Box mb={4}>
        <Button onClick={() => toggleBlock("subcategory")}>Подкатегории</Button>
        {openBlocks.subcategory && filters.category && (
          <motion.div
            variants={blockVariants}
            initial="hidden"
            animate="visible"
          >
            {filters.category === "Коммерческие" &&
              [
                "CMS",
                "CRM",
                "Landing",
                "Интернет-магазины",
                "Dashboard",
                "Mobile app",
                "Другие",
              ].map((sub) => (
                <motion.div
                  key={sub}
                  variants={itemVariants}
                  className={`p-2 my-1 rounded cursor-pointer ${
                    filters.subcategory === sub
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => handleSubcategoryChange(sub)}
                >
                  {sub}
                </motion.div>
              ))}
          </motion.div>
        )}
      </Box>

      {/* Технологии */}
      <Box mb={4}>
        <Button onClick={() => toggleBlock("technologies")}>Технологии</Button>
        {openBlocks.technologies && (
          <motion.div
            variants={blockVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mt-2"
          >
            {allTechnologies.map((tech) => (
              <motion.div
                key={tech}
                variants={itemVariants}
                className={`px-2 py-1 rounded-full cursor-pointer border ${
                  filters.technologies.includes(tech)
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg text-white"
                    : "border-gray-500 hover:bg-gray-700 text-gray-200"
                }`}
                onClick={() => handleTechToggle(tech)}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        )}
      </Box>

      {/* Сетка */}
      <Box>
        <Button onClick={() => toggleBlock("grid")}>Сетка</Button>
        {openBlocks.grid && (
          <motion.div
            variants={blockVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-2 mt-2"
          >
            {[2, 3, 4].map((cols) => (
              <motion.div
                key={cols}
                variants={itemVariants}
                className={`p-2 rounded cursor-pointer border ${
                  grid === cols
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg text-white"
                    : "border-gray-500 hover:bg-gray-700 text-gray-200"
                }`}
                onClick={() => handleGridChange(cols)}
                title={`${cols} колонки`}
              >
                {cols}
              </motion.div>
            ))}
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default SidebarFilters;
