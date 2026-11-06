import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { personal } from '../../data/personal';
import Button from '../../components/Buttons/Button';
import HeroVisual from '../../components/HeroVisual/HeroVisual';
import TechIcon from '../../components/TechIcon/TechIcon';
import { scrollToSection } from '../../utils/helpers';
import { EASE } from '../../utils/motion';
import './Hero.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 992px)').matches : true,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)');
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const parallax = !reduce && isDesktop;
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, parallax ? 60 : 0]);
  const yVisual = useTransform(scrollY, [0, 600], [0, parallax ? -40 : 0]);
  const opacity = useTransform(scrollY, [0, 500], [1, parallax ? 0.35 : 1]);

  const { availability } = personal;
  const availabilityLabel = availability.configured ? availability.label : availability.fallbackLabel;

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid bg-grid" />
        <div className="hero__bg-glow hero__bg-glow--1" />
        <div className="hero__bg-glow hero__bg-glow--2" />
      </div>

      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-12 col-lg-6">
            <motion.div
              className="hero__content"
              style={{ y: yText, opacity }}
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="hero__status" variants={item}>
                <span className={`hero__status-dot ${availability.configured ? 'is-live' : ''}`} />
                <span>{availabilityLabel}</span>
              </motion.div>

              <motion.p className="hero__kicker mono" variants={item}>
                <span className="hero__kicker-line" />
                .NET FULL STACK DEVELOPER
              </motion.p>

              <motion.h1 className="hero__name" variants={item}>
                AMRUT
                <br />
                <span className="hero__name-accent">GOLANI</span>
              </motion.h1>

              <motion.p className="hero__title" variants={item}>
                Building Scalable Applications.
                <br />
                <span className="hero__title-muted">Engineering Reliable Solutions.</span>
              </motion.p>

              <motion.p className="hero__intro" variants={item}>
                {personal.intro}
              </motion.p>

              <motion.div className="hero__actions" variants={item}>
                <Button variant="primary" iconRight={ArrowRight} onClick={() => scrollToSection('projects')}>
                  View My Projects
                </Button>
                <Button
                  variant="secondary"
                  icon={Download}
                  href={personal.resumeUrl}
                  download="Amrut_Golani_Resume.pdf"
                >
                  Download Resume
                </Button>
                <Button variant="ghost" icon={Mail} onClick={() => scrollToSection('contact')}>
                  Contact Me
                </Button>
              </motion.div>

              <motion.div className="hero__meta" variants={item}>
                <span className="hero__location">
                  <MapPin size={14} aria-hidden="true" />
                  {personal.location}
                </span>
                <span className="hero__meta-sep" aria-hidden="true" />
                <span className="hero__exp">{personal.experienceLabel}</span>
              </motion.div>

              <motion.ul className="hero__stack" role="list" variants={item} aria-label="Core technologies">
                {personal.heroStack.map((t, i) => (
                  <motion.li
                    key={t}
                    className="hero__stack-item"
                    animate={reduce ? {} : { y: [0, -4, 0] }}
                    transition={reduce ? {} : { duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
                  >
                    <TechIcon name={t} size="sm" />
                    <span>{t}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          <div className="col-12 col-lg-6">
            <motion.div style={{ y: yVisual }}>
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="hero__scroll"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('about');
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        aria-label="Scroll to About section"
      >
        <span className="hero__scroll-line">
          <span />
        </span>
        <span className="mono">Scroll</span>
      </motion.a>
    </section>
  );
}
