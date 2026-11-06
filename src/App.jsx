import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import Preloader from './components/Preloader/Preloader';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setLoading(false), reduce ? 150 : 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="ambient" aria-hidden="true">
        <span className="ambient__orb ambient__orb--1" />
        <span className="ambient__orb ambient__orb--2" />
        <span className="ambient__noise" />
      </div>
      <AnimatePresence>{loading && <Preloader key="preloader" />}</AnimatePresence>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
}
