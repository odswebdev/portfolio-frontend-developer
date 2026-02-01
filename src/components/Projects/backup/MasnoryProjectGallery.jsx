import React from "react";

const MasnoryProjectGallery = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="masnory__gallery">
      <div className="masnory__gallery-item masnory__gallery-item--featured">
        <div className="masnory__gallery-image__container">
          <img
            src={projects[0].image}
            alt={projects[0].name}
            className="masnory__gallery-image"
          />
          <div className="masnory__gallery-info"></div>
        </div>
      </div>

      {projects.slice(1).map((project) => (
        <div key={project.id} className="masnory__gallery-item">
          <div className="masnory__gallery-image__container">
            <img
              src={project.image}
              alt={project.name}
              className="masnory__gallery-image masnory__gallery-image--secondary"
            />
            <div className="masnory__gallery-info"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MasnoryProjectGallery;
