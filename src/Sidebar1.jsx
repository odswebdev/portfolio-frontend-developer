import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  Loader,
  Header,
  HeroSection2,
  About,
  ProjectGallery,
  Contact,
  GoToTop,
  Services,
  Footer,
  FAQ,
} from "./components";
import Sidebar from "./Sidebar";

const Sidebar1 = () => {
  return (
    <div className="flex xl:flex-row xs:flex-col justify-center items-start w-full">
      <Sidebar />
      <HeroSection2 />
    </div>
  );
};

export default Sidebar1;
