import { useState } from "react";
import { motion } from "framer-motion";

export default function TabsAccordion({ project }) {
  const [active, setActive] = useState("Описание");
  const tabs = ["Описание", "Технологии", "Процесс"];

  return (
    <div>
      <div className="flex gap-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full ${
              active === tab ? "bg-purple-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-gray-700"
      >
        {active === "Описание" && <p>{project.description}</p>}
        {active === "Технологии" && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {active === "Процесс" && (
          <p>Здесь можно описать процесс разработки проекта...</p>
        )}
      </motion.div>
    </div>
  );
}
