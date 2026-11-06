import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading, Reveal } from '../../components/AnimatedSection/AnimatedSection';
import Button from '../../components/Buttons/Button';
import { whyMe } from '../../data/approach';
import { getIcon } from '../../utils/icons';
import { fadeUp, viewportOnce } from '../../utils/motion';
import { scrollToSection } from '../../utils/helpers';
import './WhyMe.css';

export default function WhyMe() {
  return (
    <Section id="why-me" alt ariaLabel="Why work with me">
      <div className="row gy-5">
        <div className="col-12 col-lg-4">
          <SectionHeading eyebrow="Why Work With Me" index="07" title={whyMe.heading} subtitle={whyMe.subheading} />
          <Reveal delay={3}>
            <Button variant="primary" iconRight={ArrowRight} onClick={() => scrollToSection('contact')}>
              Start a Conversation
            </Button>
          </Reveal>
        </div>
        <div className="col-12 col-lg-8">
          <ul className="why-grid" role="list">
            {whyMe.points.map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <motion.li
                  key={p.title}
                  className="why-item"
                  variants={fadeUp}
                  custom={i * 0.6}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <span className="why-item__icon">
                    <Icon size={17} />
                  </span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
