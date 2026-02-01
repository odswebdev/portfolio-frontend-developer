import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import {
  faHistory,
  faFaceSmile,
  faGift,
  faUser,
  faCode,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHistory);
library.add(faFaceSmile);
library.add(faGift);
library.add(faUser);
library.add(faCode);
library.add(faProjectDiagram);

const featureAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

function Counter() {
  const [counterState, setCounterState] = useState(false);
  return (
    <motion.section
      id="counter"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
    >
      <div className="counter__container">
        <div className="counter__wrapper">
          <div className="counter__container__trigger">
            <ScrollTrigger
              onEnter={() => setCounterState(true)}
              onExit={() => setCounterState(false)}
            >
              <div className="achievements">
                <motion.div
                  className="achievements__item"
                  custom={1}
                  variants={featureAnimation}
                >
                  <FontAwesomeIcon icon="history" />
                  <h2 className="achievements__item__title">
                    {counterState && (
                      <CountUp start={0} end={430} duration={2.75}></CountUp>
                    )}
                  </h2>
                  <p className="achievements__item__desc">ЧАСОВ</p>
                </motion.div>

                <motion.div
                  className="achievements__item"
                  custom={2}
                  variants={featureAnimation}
                >
                  <FontAwesomeIcon icon="gift" />
                  <h2 className="achievements__item__title">
                    {counterState && (
                      <CountUp start={0} end={15} duration={2.75}></CountUp>
                    )}
                  </h2>
                  <p className="achievements__item__desc">ПРОЕКТОВ</p>
                </motion.div>

                <motion.div
                  className="achievements__item"
                  custom={3}
                  variants={featureAnimation}
                >
                  <FontAwesomeIcon icon="face-smile" />
                  <h2 className="achievements__item__title">
                    {counterState && (
                      <CountUp start={0} end={800} duration={2.75}></CountUp>
                    )}
                  </h2>
                  <p className="achievements__item__desc">КЛИЕНТОВ</p>
                </motion.div>

                <motion.div
                  className="achievements__item"
                  custom={4}
                  variants={featureAnimation}
                >
                  <FontAwesomeIcon icon="user" />
                  <h2 className="achievements__item__title">
                    {counterState && (
                      <CountUp start={0} end={10} duration={2.75}></CountUp>
                    )}
                  </h2>
                  <p className="achievements__item__desc">ЛЕТ ОПЫТА</p>
                </motion.div>

                <motion.div
                  className="achievements__item"
                  custom={5}
                  variants={featureAnimation}
                >
                  <FontAwesomeIcon icon="code" />
                  <h2 className="achievements__item__title">
                    {counterState && (
                      <CountUp start={0} end={12000} duration={2.75}></CountUp>
                    )}
                  </h2>
                  <p className="achievements__item__desc">СТРОК КОДА</p>
                </motion.div>

                <motion.div
                  className="achievements__item"
                  custom={6}
                  variants={featureAnimation}
                >
                  <FontAwesomeIcon icon="project-diagram" />
                  <h2 className="achievements__item__title">
                    {counterState && (
                      <CountUp start={0} end={30} duration={2.75}></CountUp>
                    )}
                  </h2>
                  <p className="achievements__item__desc">ПРОЕКТОВ</p>
                </motion.div>
              </div>
            </ScrollTrigger>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Counter;
