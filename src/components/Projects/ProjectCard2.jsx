import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard2({ project, onOpen, hoverTech }) {
  const isHighlighted = hoverTech && project.technologies.includes(hoverTech);

  return (
    <motion.div
      whileHover={{ rotateX: 5, rotateY: 5, scale: 1.05 }}
      className={`group perspective-1000 rounded-2xl border overflow-hidden shadow-md transition-shadow duration-300
        ${isHighlighted ? "shadow-lg border-purple-500" : "border-gray-200"} `}
      onClick={() => onOpen(project)}
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <img
          src={project.images.desktop}
          alt={project.title}
          className="w-full h-full object-cover transition duration-500 group-hover:opacity-90"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold group-hover:text-purple-600 transition">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white transition-transform duration-300 group-hover:scale-110"
            >
              #{tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              className="p-2 rounded-full bg-white shadow hover:scale-110 transition"
            >
              <FaGithub />
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              className="p-2 rounded-full bg-white shadow hover:scale-110 transition"
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
