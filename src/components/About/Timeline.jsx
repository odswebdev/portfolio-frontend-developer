import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { useState, useRef } from "react";
import { experiences } from "../constans/data";

const ExperienceCard = ({ experience }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <VerticalTimelineElement
      className="experience__card group"
      contentStyle={{
        color: "#292929",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid #FFF",
      }}
      date={
        <div>
          <h3 className="experience__card-date">{experience.date}</h3>
        </div>
      }
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="experience-card__icon">
          <img
            src={experience.icon}
            alt=""
            className="experience-card__icon-image"
          />
        </div>
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="experience-card__content">
        <h3 className="experience-card__title">
          {experience.title}, {experience.city}
        </h3>
        <p className="experience-card__company" style={{ margin: 0 }}>
          {experience.company_name}
        </p>
        <p className="experience-card__description">{experience.description}</p>
      </div>
    </VerticalTimelineElement>
  );
};

const Timeline = () => {
  return (
    <>
      <div className="group1 timeline">
        <VerticalTimeline className="timeline__line">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
        <div className="timeline__cv-link">
          <a
            href="./src/assets/docs/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cv-link__button"
          >
            <span>Показать CV</span>
            <img src="../src/assets/icons/arrow_r2.svg" alt=""></img>
          </a>
        </div>
      </div>
    </>
  );
};

export default Timeline;
