import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Loader,
  Header,
  HeroSection2,
  About,
  Contact,
  GoToTop,
  Services,
  ProjectSection,
  Footer,
  FAQ,
} from "./components";
import TechSlider from "./components/Stack/TechSlider";
import HeroPage from "./pages/HeroPage";
import AboutPage from "./pages/AboutPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/hero" element={<HeroPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/stack" element={<TechSlider />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<ProjectSection />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
