import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Box } from "@mui/material";
import { categories } from "../constans/data"; // Подключаем категории с подкатегориями

const CategorySwitcher = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  // onFilterProjects,
}) => {
  const [activeSubcategories, setActiveSubcategories] = useState([]);

  useEffect(() => {
    // При изменении категории, обновляем подкатегории
    if (selectedCategory) {
      const categoryData = categories.find(
        (item) => item.name === selectedCategory
      );
      setActiveSubcategories(categoryData ? categoryData.subcategories : []);
    }
  }, [selectedCategory]);

  // Функция для обработки выбора категории
  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    setActiveSubcategories(
      categories.find((item) => item.name === category)?.subcategories || []
    );
    onSubcategoryChange(null); // Сбрасываем подкатегорию, если категория изменена
    onFilterProjects(category, null); // Фильтруем проекты по выбранной категории
  };

  // Функция для обработки выбора подкатегории
  const handleSubcategoryChange = (subcategory) => {
    onSubcategoryChange(subcategory);
    onFilterProjects(selectedCategory, subcategory); // Фильтруем проекты по выбранной подкатегории
  };

  return (
    <Box
      className="flex flex-col xs:flex-wrap xs:justify-center xl:justify-start items-center xs:gap-4"
      mb={4}
      ml={1}
      textAlign="left"
      width="100%"
    >
      {/* Выбор категории */}
      <Box
        className="flex flex-row xl:justify-start items-center xs:flex-wrap xs:justify-start xs:gap-4"
        mb={1}
        ml={1}
        textAlign="left"
        width="100%"
      >
        {categories.map((category, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            key={index}
          >
            <Button
              onClick={() => handleCategoryChange(category.name)}
              variant={
                selectedCategory === category.name ? "contained" : "outlined"
              }
              sx={{
                transition: "all 0.3s ease",
                background:
                  selectedCategory === category.name
                    ? "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,252,252,0.6), rgba(0,255,255,0.4))"
                    : "transparent",
                boxShadow:
                  selectedCategory === category.name
                    ? "0 4px 20px rgba(0, 252, 252, 0.4)"
                    : "0 2px 5px rgba(0, 0, 0, 0.2)",
                border: "1px solid",
                borderColor:
                  selectedCategory === category.name
                    ? "rgba(0, 252, 252, 0.8)"
                    : "transparent",
                margin: "0px",
                textTransform: "capitalize",
                color: selectedCategory === category.name ? "#fff" : "#fff",
                "&:hover": {
                  background:
                    selectedCategory === category.name
                      ? "linear-gradient(90deg, rgba(0,252,252,0.6), rgba(0,255,255,0.4))"
                      : "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(0,252,252,0.2))",
                  boxShadow: "0 4px 15px rgba(0, 252, 252, 0.5)",
                },
              }}
            >
              {category.name}
            </Button>
          </motion.div>
        ))}
      </Box>

      {/* Подкатегории для выбранной категории */}
      {selectedCategory && activeSubcategories.length > 0 && (
        <Box
          className="flex w-full justify-start xs:flex-wrap xs:justify-start items-start xs:gap-4"
          mt={1}
        >
          {activeSubcategories.map((subcategory, index) => (
            <Button
              key={index}
              onClick={() => handleSubcategoryChange(subcategory)}
              variant={
                selectedSubcategory === subcategory ? "contained" : "outlined"
              }
              sx={{
                transition: "all 0.3s ease",
                background:
                  selectedSubcategory === subcategory
                    ? "linear-gradient(90deg, rgba(0,252,252,0.8), rgba(0,252,252,0.6), rgba(0,255,255,0.4))"
                    : "transparent",
                boxShadow:
                  selectedSubcategory === subcategory
                    ? "0 4px 20px rgba(0, 252, 252, 0.4)"
                    : "0 2px 5px rgba(0, 0, 0, 0.2)",
                border: "1px solid",
                borderColor:
                  selectedSubcategory === subcategory
                    ? "rgba(0, 252, 252, 0.8)"
                    : "transparent",
                margin: "0 0px",
                textTransform: "capitalize",
                color: selectedSubcategory === subcategory ? "#fff" : "#fff",
                "&:hover": {
                  background:
                    selectedSubcategory === subcategory
                      ? "linear-gradient(90deg, rgba(0,252,252,0.6), rgba(0,255,255,0.4))"
                      : "linear-gradient(90deg, rgba(255,255,255,0.4), rgba(0,252,252,0.2))",
                  boxShadow: "0 4px 15px rgba(0, 252, 252, 0.5)",
                },
              }}
            >
              {subcategory}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CategorySwitcher;
