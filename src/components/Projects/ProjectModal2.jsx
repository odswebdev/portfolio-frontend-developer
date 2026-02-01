import { motion } from "framer-motion";
import ProjectSlider from "./ProjectSlider";
import TabsAccordion from "./TabsAccordion";
import { FaTimes } from "react-icons/fa";
import { LiveProvider, LiveEditor, LivePreview } from "react-live";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white w-full max-w-6xl h-[90vh] p-6 overflow-y-auto rounded-2xl flex flex-col md:flex-row gap-6"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1">
          <ProjectSlider images={project.images.gallery} />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
          <TabsAccordion project={project} />
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Live Code Preview</h3>
            <LiveProvider code={project.codeSnippet}>
              <LivePreview />
              <LiveEditor />
            </LiveProvider>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition"
        >
          <FaTimes />
        </button>
      </motion.div>
    </motion.div>
  );
}
