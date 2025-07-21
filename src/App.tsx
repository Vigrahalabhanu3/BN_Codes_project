
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
// Lazy load all pages
const Python = lazy(() => import('./pages/Python.tsx'));
const Aptitude = lazy(() => import('./pages/Aptitude.tsx'));
const Reasoning = lazy(() => import('./pages/Reasoning.tsx'));
const Upload = lazy(() => import('./pages/Upload.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Home = lazy(() => import('./pages/Home.tsx'));
const Interview = lazy(() => import('./pages/Interview.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
import Navbar from './components/Navbar.jsx'; 
import Spinner from './components/Spinner';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/python" element={<Python />} />
        <Route path="/aptitude" element={<Aptitude />} />
        <Route path="/reasoning" element={<Reasoning />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <Suspense fallback={<Spinner />}>
            <AnimatedRoutes />
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;