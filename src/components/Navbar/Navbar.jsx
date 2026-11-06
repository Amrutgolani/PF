import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { navLinks } from '../../data/navigation';
import { personal } from '../../data/personal';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useScrolled } from '../../hooks/useScrolled';
import { scrollToSection, scrollToTop } from '../../utils/helpers';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Button from '../Buttons/Button';
import './Navbar.css';

export default function Navbar({ theme, onToggleTheme }) {
  const ids = useMemo(() => navLinks.map((l) => l.id), []);
  const activeId = useScrollSpy(ids, 140);
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 992 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const handleNav = (e, id) => {
    e.preventDefault();
    const go = () => {
      if (id === 'home') scrollToTop();
      else scrollToSection(id);
      window.history.replaceState(null, '', id === 'home' ? ' ' : `#${id}`);
    };
    if (open) {
      // Wait for the scroll lock to be released before scrolling.
      setOpen(false);
      setTimeout(go, 60);
    } else {
      go();
    }
  };

  return (
    <>
      <motion.header
        className={`navbar-ag ${scrolled || open ? 'navbar-ag--scrolled' : ''}`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <nav className="container navbar-ag__inner" aria-label="Primary">
          <a href="#home" className="navbar-ag__logo" onClick={(e) => handleNav(e, 'home')} aria-label="Go to top">
            <span className="navbar-ag__logo-mark">
              A<span>G</span>
            </span>
            <span className="navbar-ag__logo-text d-none d-sm-inline">{personal.name}</span>
          </a>

          <ul className="navbar-ag__links d-none d-lg-flex" role="list">
            {navLinks.map((link) => {
              const active = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`navbar-ag__link ${active ? 'is-active' : ''}`}
                    onClick={(e) => handleNav(e, link.id)}
                    aria-current={active ? 'true' : undefined}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        className="navbar-ag__underline"
                        layoutId="nav-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="navbar-ag__actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <Button
              href={personal.resumeUrl}
              download="Amrut_Golani_Resume.pdf"
              variant="secondary"
              size="sm"
              icon={Download}
              className="d-none d-md-inline-flex"
            >
              Resume
            </Button>
            <button
              type="button"
              className="navbar-ag__burger d-lg-none"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
        <motion.span className="navbar-ag__progress" style={{ scaleX: progress }} aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu d-lg-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className="mobile-menu__list"
              role="list"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.id}
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                >
                  <a
                    href={`#${link.id}`}
                    className={`mobile-menu__link ${activeId === link.id ? 'is-active' : ''}`}
                    onClick={(e) => handleNav(e, link.id)}
                  >
                    <span className="mono mobile-menu__index">0{navLinks.indexOf(link) + 1}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mobile-menu__footer">
              <Button href={personal.resumeUrl} download="Amrut_Golani_Resume.pdf" variant="primary" icon={Download}>
                Download Resume
              </Button>
              <a href={`mailto:${personal.email}`} className="mobile-menu__email mono">
                {personal.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
