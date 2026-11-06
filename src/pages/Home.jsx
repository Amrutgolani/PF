import { useEffect } from 'react';
import Hero from '../sections/Hero/Hero';
import About from '../sections/About/About';
import Experience from '../sections/Experience/Experience';
import Skills from '../sections/Skills/Skills';
import Projects from '../sections/Projects/Projects';
import Education from '../sections/Education/Education';
import EngineeringApproach from '../sections/EngineeringApproach/EngineeringApproach';
import WhyMe from '../sections/WhyMe/WhyMe';
import Contact from '../sections/Contact/Contact';
import { scrollToSection } from '../utils/helpers';

export default function Home() {
  // Honour deep links like /#projects on first load (after the preloader).
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return undefined;
    const t = setTimeout(() => scrollToSection(hash, { behavior: 'auto' }), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <main id="main">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <EngineeringApproach />
      <WhyMe />
      <Contact />
    </main>
  );
}
