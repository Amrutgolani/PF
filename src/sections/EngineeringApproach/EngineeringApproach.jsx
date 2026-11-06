import { motion } from 'framer-motion';
import { Section, SectionHeading } from '../../components/AnimatedSection/AnimatedSection';
import { approach } from '../../data/approach';
import { getIcon } from '../../utils/icons';
import { fadeUp, viewportOnce } from '../../utils/motion';
import './EngineeringApproach.css';

export default function EngineeringApproach() {
  return (
    <Section id="approach" ariaLabel="Engineering approach">
      <SectionHeading eyebrow="Engineering Approach" index="06" title={approach.heading} subtitle={approach.subheading} align="center" />

      <div className="approach">
        <motion.span
          className="approach__track"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
        <ol className="approach__grid" role="list">
          {approach.steps.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <motion.li
                key={s.step}
                className="approach__step card-base"
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                whileHover={{ y: -4 }}
              >
                <div className="approach__step-head">
                  <span className="approach__icon">
                    <Icon size={18} />
                  </span>
                  <span className="approach__num mono">{s.step}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
